package sorter

import (
	"math"
	"math/rand"
	"sort"
	"time"

	"github.com/kkwteh/handrank/internal/app/evaluator"
)

type HoleCards [2]string

type ScoredHoleCards struct {
	Cards HoleCards
	Score uint32
}

type ScoredRange []ScoredHoleCards

// sign flip because lower scores correspond to stronger hands.
func (sr ScoredRange) Less(i, j int) bool { return sr[i].Score < sr[j].Score }
func (sr ScoredRange) Len() int           { return len(sr) }
func (sr ScoredRange) Swap(i, j int)      { sr[i], sr[j] = sr[j], sr[i] }

const numRunsToSort = 300
const riverPercentileSortValue = 0.7

//SortRange returns slice of hole cards sorted in ascending order by strength and equities
func SortRange(handRange []HoleCards, boardCards []string, heroCards HoleCards) ([]HoleCards, []float64, int, int) {
	if len(handRange) == 0 {
		return []HoleCards{}, []float64{}, 0, 0
	}

	// handRanks contains the rankings of the hands for the random runouts that are played out belows
	handRanks := make(map[HoleCards][]float64)
	equityMap := make(map[HoleCards]float64)
	for i := 0; i < len(handRange); i++ {
		handRanks[handRange[i]] = make([]float64, 0, numRunsToSort)
		equityMap[handRange[i]] = 0
	}

	var heroQ25, heroQ75 int
	for i := 0; i < numRunsToSort; i++ {
		runout := RandomRunout(boardCards)
		unexcludedRange := UnexcludedRange(handRange, runout)
		scoredRange := ScoreHoleCards(unexcludedRange, boardCards, runout)
		sort.Sort(sort.Reverse(scoredRange))
		// Normalize ranks by length of hand range
		for j, shc := range scoredRange {

			// If heroCard found in range, update equity map
			if shc.Cards == heroCards {
				heroScore := shc.Score
				for _, scoredHoleCards := range scoredRange {
					if scoredHoleCards.Score > heroScore {
						equityMap[scoredHoleCards.Cards] += 1.0
					}

					if scoredHoleCards.Score == heroScore {
						equityMap[scoredHoleCards.Cards] += 0.5
					}
				}
			}

			handRanks[shc.Cards] = append(handRanks[shc.Cards], float64(j*len(handRange))/float64(len(scoredRange)))
		}
	}

	for _, ranks := range handRanks {
		sort.Float64s(ranks)
	}

	// Normalize q25, q75 to account for blocked hands
	if ranks, ok := handRanks[heroCards]; ok {
		heroQ25 = int(ranks[int(0.25*float64(len(ranks)))])
		heroQ75 = int(ranks[int(0.75*float64(len(ranks)))])
	}

	finalScoredRange := make(ScoredRange, 0, len(handRange))
	for _, hand := range handRange {
		numRanks := float64(len(handRanks[hand]))

		// Normalize hand equities by number of ranks
		equityMap[hand] = equityMap[hand] / numRanks

		score := handRanks[hand][int(math.Floor(riverPercentileSortValue*numRanks))]
		finalScoredRange = append(finalScoredRange, ScoredHoleCards{Cards: hand, Score: uint32(score)})
	}
	sort.Sort(finalScoredRange)

	sortedHands := make([]HoleCards, 0, len(handRange))
	equitiesArray := make([]float64, len(handRange))
	for i, scoredHand := range finalScoredRange {
		sortedHands = append(sortedHands, scoredHand.Cards)
		equitiesArray[i] = equityMap[scoredHand.Cards]
	}

	return sortedHands, equitiesArray, heroQ25, heroQ75
}

// ScoreHoleCards scores hole cards. Lower scores are better.
func ScoreHoleCards(unexcludedRange []HoleCards, boardCards []string, runout map[string]bool) ScoredRange {
	res := make([]ScoredHoleCards, 0, len(unexcludedRange))
	for _, holeCards := range unexcludedRange {
		fullHandCards := make([]string, len(boardCards))
		copy(fullHandCards, boardCards)
		fullHandCards = append(fullHandCards, holeCards[:]...)
		for card := range runout {
			fullHandCards = append(fullHandCards, card)
		}
		res = append(res, ScoredHoleCards{Cards: holeCards, Score: evaluator.HandScore(fullHandCards)})
	}
	return res
}

//UnexcludedRange returns hole cards in handRange that are not contained in runout
func UnexcludedRange(handRange []HoleCards, runout map[string]bool) []HoleCards {
	res := make([]HoleCards, 0, len(handRange))
	for _, hand := range handRange {
		if !runout[hand[0]] && !runout[hand[1]] {
			res = append(res, hand)
		}
	}
	return res
}

func FullDeck() map[string]bool {
	res := make(map[string]bool)
	for _, card := range []string{
		"As", "Ah", "Ad", "Ac",
		"Ks", "Kh", "Kd", "Kc",
		"Qs", "Qh", "Qd", "Qc",
		"Js", "Jh", "Jd", "Jc",
		"Ts", "Th", "Td", "Tc",
		"9s", "9h", "9d", "9c",
		"8s", "8h", "8d", "8c",
		"7s", "7h", "7d", "7c",
		"6s", "6h", "6d", "6c",
		"5s", "5h", "5d", "5c",
		"4s", "4h", "4d", "4c",
		"3s", "3h", "3d", "3c",
		"2s", "2h", "2d", "2c",
	} {
		res[card] = true
	}
	return res
}

// AreValid returns true if hole cards are valid and false otherwise.
func (hc HoleCards) AreValid() bool {
	fullDeck := FullDeck()
	return fullDeck[hc[0]] && fullDeck[hc[1]]
}

// RandomRunout returns a random runout
func RandomRunout(boardCards []string) map[string]bool {
	r := rand.New(rand.NewSource(time.Now().UTC().UnixNano()))
	fullDeck := FullDeck()
	for _, card := range boardCards {
		fullDeck[card] = false
	}

	remainingCards := make([]string, 0, len(fullDeck)-len(boardCards))
	for card := range fullDeck {
		if fullDeck[card] == true {
			remainingCards = append(remainingCards, card)
		}
	}
	cardsToDeal := 5 - len(boardCards)
	res := make(map[string]bool)
	perm := r.Perm(len(remainingCards))
	for i := 0; i < cardsToDeal; i++ {
		res[remainingCards[perm[i]]] = true
	}
	return res
}

//ClassifyHands returns a list of hand rankings corresponding to the list of allhands
func ClassifyHands(allHands []HoleCards, boardCards []string) []string {
	res := make([]string, 0, len(allHands))
	for _, hand := range allHands {
		fullHand := append(boardCards, (hand[:])...)
		res = append(res, evaluator.HandRank(evaluator.HandScore(fullHand)))
	}
	return res
}
