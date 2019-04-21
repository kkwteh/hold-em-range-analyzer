package evaluator

/*
   Number of Distinct Hand Values:

   Straight Flush   10
   Four of a Kind   156      [(13 choose 2) * (2 choose 1)]
   Full Houses      156      [(13 choose 2) * (2 choose 1)]
   Flush            1277     [(13 choose 5) - 10 straight flushes]
   Straight         10
   Three of a Kind  858      [(13 choose 3) * (3 choose 1)]
   Two Pair         858      [(13 choose 3) * (3 choose 2)]
   One Pair         2860     [(13 choose 4) * (4 choose 1)]
   High Card      + 1277     [(13 choose 5) - 10 straights]
   -------------------------
   TOTAL            7462

   Lookup table which maps:
       5 card hand's unique prime product => rank in range [1, 7462]

   Examples:
   = Royal flush        = 1
   = 7-5-4-3-2 unsuited = 7462
*/

import (
	"fmt"
	"os"
)

var FIVE_CHOOSE_FIVE = [][5]uint8{
	{0, 1, 2, 3, 4},
}

var SIX_CHOOSE_FIVE = [][5]uint8{
	{0, 1, 2, 3, 4},
	{0, 1, 2, 3, 5},
	{0, 1, 2, 4, 5},
	{0, 1, 3, 4, 5},
	{0, 2, 3, 4, 5},
	{1, 2, 3, 4, 5},
}

var SEVEN_CHOOSE_FIVE = [][5]uint8{
	{0, 1, 2, 3, 4}, {0, 1, 2, 3, 5}, {0, 1, 2, 3, 6},
	{0, 1, 2, 4, 5}, {0, 1, 2, 4, 6}, {0, 1, 2, 5, 6},
	{0, 1, 3, 4, 5}, {0, 1, 3, 4, 6}, {0, 1, 3, 5, 6},
	{0, 1, 4, 5, 6}, {0, 2, 3, 4, 5}, {0, 2, 3, 4, 6},
	{0, 2, 3, 5, 6}, {0, 2, 4, 5, 6}, {0, 3, 4, 5, 6},
	{1, 2, 3, 4, 5}, {1, 2, 3, 4, 6}, {1, 2, 3, 5, 6},
	{1, 2, 4, 5, 6}, {1, 3, 4, 5, 6}, {2, 3, 4, 5, 6},
}

// maps string value => prime number
var STRING_INT_TO_PRIME = map[uint8]uint32{
	65: 41, // A
	75: 37, // K
	81: 31, // Q
	74: 29, // J
	84: 23, // T
	57: 19, // 9
	56: 17, // 8
	55: 13, // 7
	54: 11, // 6
	53: 7,  // 5
	52: 5,  // 4
	51: 3,  // 3
	50: 2,  // 2
}

var PRIMES = [...]uint32{
	2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
}

var STRING_INT_TO_RANK = map[uint8]uint32{
	65: 12, // A
	75: 11, // K
	81: 10, // Q
	74: 9,  // J
	84: 8,  // T
	57: 7,  // 9
	56: 6,  // 8
	55: 5,  // 7
	54: 4,  // 6
	53: 3,  // 5
	52: 2,  // 4
	51: 1,  // 3
	50: 0,  // 2
}

var STRING_INT_TO_SUIT = map[uint8]uint32{
	115: 1, // s
	104: 2, // h
	100: 4, // d
	99:  8, // c
}

var HANDSIZE_TO_PERMUTATION_MAP = map[int][][5]uint8{
	5: FIVE_CHOOSE_FIVE,
	6: SIX_CHOOSE_FIVE,
	7: SEVEN_CHOOSE_FIVE,
}

func HandScore(cardStrings []string) uint32 {
	cards := make([]uint32, 0, len(cardStrings))
	for _, cardString := range cardStrings {
		cards = append(cards, make_card(cardString))
	}

	// get the permutations and the evaluation function
	possible_hands := hand_permutations(cards, HANDSIZE_TO_PERMUTATION_MAP[len(cards)])

	best_score := uint32(7462)
	for _, hand := range possible_hands {
		handscore := five(hand)
		if handscore < best_score {
			best_score = handscore
		}
	}

	return best_score
}

func main() {
	cards := make([]uint32, len(os.Args)-1)
	for i := 1; i < len(os.Args); i++ {
		cards[i-1] = make_card(os.Args[i])
	}

	// get the permutations and the evaluation function
	possible_hands := hand_permutations(cards, HANDSIZE_TO_PERMUTATION_MAP[len(cards)])

	best_score := uint32(7462)
	for _, hand := range possible_hands {
		handscore := five(hand)
		if handscore < best_score {
			best_score = handscore
		}
	}

	fmt.Print(best_score)
}

func five(cards []uint32) uint32 {
	if cards[0]&cards[1]&cards[2]&cards[3]&cards[4]&0xF000 != 0 {
		// if flush
		handOR := (cards[0] | cards[1] | cards[2] | cards[3] | cards[4]) >> 16
		prime := prime_product_from_rankbits(handOR)
		return FLUSH_LOOKUP[prime]
	} else {
		// non-flush
		prime := prime_product_from_hand(cards)
		return UNSUITED_LOOKUP[prime]
	}
}

func make_card(cardstring string) uint32 {
	/*
	   Cards are 32-bit integers, so there is no object instantiation -
	   they are just ints. Most of the bits are used, and have a specific meaning.
	   See below:
	                                   Card:

	                         bitrank     suit rank   prime
	                   +--------+--------+--------+--------+
	                   |xxxbbbbb|bbbbbbbb|cdhsrrrr|xxpppppp|
	                   +--------+--------+--------+--------+

	       1) p = prime number of rank (deuce=2,trey=3,four=5,...,ace=41)
	       2) r = rank of card (deuce=0,trey=1,four=2,five=3,...,ace=12)
	       3) cdhs = suit of card (bit turned on based on suit of card)
	       4) b = bit turned on depending on rank of card
	       5) x = unused

	   This representation will allow us to do very important things like:
	   - Make a unique prime prodcut for each hand
	   - Detect flushes
	   - Detect straights

	   and is also quite performant.
	*/

	rank := STRING_INT_TO_RANK[cardstring[0]]
	rankprime := STRING_INT_TO_PRIME[cardstring[0]]
	bitrank := uint32(1) << rank << 16
	suit := STRING_INT_TO_SUIT[cardstring[1]] << 12
	return bitrank | suit | (rank << 8) | rankprime
}

func prime_product_from_hand(cards []uint32) uint32 {
	product := uint32(1)
	for _, card := range cards {
		product *= (card & 0xFF)
	}
	return product
}

func hand_permutations(cards []uint32, permutation_indices [][5]uint8) [][]uint32 {
	permutations := make([][]uint32, len(permutation_indices))
	for i, card_indices := range permutation_indices {
		permutations[i] = make([]uint32, 5)
		for j, card_index := range card_indices {
			permutations[i][j] = cards[card_index]
		}
	}
	return permutations
}

func prime_product_from_rankbits(rankbits uint32) uint32 {
	product := uint32(1)
	for i := uint32(0); i < uint32(len(STRING_INT_TO_RANK)); i++ {
		// if the ith bit is set
		if rankbits&(uint32(1)<<i) != 0 {
			product *= PRIMES[i]
		}
	}
	return product
}

const maxStraightFlush = 10
const maxFourOfAKind = 166
const maxFullHouse = 322
const maxFlush = 1599
const maxStraight = 1609
const maxThreeOfAKind = 2467
const maxTwoPair = 3325
const maxPair = 6185
const maxHighCard = 7462

// HandRank gives the hand class of the given hand
func HandRank(score uint32) string {
	if score >= 0 && score <= maxStraightFlush {
		return "Straight Flush"
	} else if score <= maxFourOfAKind {
		return "Four of a Kind"
	} else if score <= maxFullHouse {
		return "Full House"
	} else if score <= maxFlush {
		return "Flush"
	} else if score <= maxStraight {
		return "Straight"
	} else if score <= maxThreeOfAKind {
		return "Three of a Kind"
	} else if score <= maxTwoPair {
		return "Two Pair"
	} else if score <= maxPair {
		return "Pair"
	} else if score <= maxHighCard {
		return "High Card"
	} else {
		panic(fmt.Sprintf("Unknown hand score %v", score))
	}
}

// def get_rank_class(self, hr):
//         """
//         Returns the class of hand given the hand hand_rank
//         returned from evaluate.
//         """
//         if hr >= 0 and hr <= LookupTable.MAX_STRAIGHT_FLUSH:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_STRAIGHT_FLUSH]
//         elif hr <= LookupTable.MAX_FOUR_OF_A_KIND:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_FOUR_OF_A_KIND]
//         elif hr <= LookupTable.MAX_FULL_HOUSE:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_FULL_HOUSE]
//         elif hr <= LookupTable.MAX_FLUSH:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_FLUSH]
//         elif hr <= LookupTable.MAX_STRAIGHT:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_STRAIGHT]
//         elif hr <= LookupTable.MAX_THREE_OF_A_KIND:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_THREE_OF_A_KIND]
//         elif hr <= LookupTable.MAX_TWO_PAIR:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_TWO_PAIR]
//         elif hr <= LookupTable.MAX_PAIR:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_PAIR]
//         elif hr <= LookupTable.MAX_HIGH_CARD:
//             return LookupTable.MAX_TO_RANK_CLASS[LookupTable.MAX_HIGH_CARD]
//         else:
//             raise Exception("Inavlid hand rank, cannot return rank class")
