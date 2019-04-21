package sorter_test

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"testing"

	"github.com/kkwteh/handrank/internal/app/sorter"
)

func TestSortRange(t *testing.T) {
	suitedConnectors := sorter.HoleCards{"5h", "6h"}
	bigSlick := sorter.HoleCards{"Ac", "Kc"}
	handRange := []sorter.HoleCards{suitedConnectors, bigSlick}
	bigSlickBoard := []string{"7c", "Ad", "Kd"}
	suitedConnectorsBoard := []string{"5s", "6s", "7c"}
	res, _, _ := sorter.SortRange(handRange, bigSlickBoard, sorter.HoleCards{})
	if res[1] != bigSlick {
		t.Errorf("Got %v for res", res)
	}

	res2, _, _ := sorter.SortRange(handRange, suitedConnectorsBoard, sorter.HoleCards{})
	if res2[1] != suitedConnectors {
		t.Errorf("Got %v for res2", res2)
	}
}

type SortRequest struct {
	BoardCards []string           `json:"board_cards"`
	AllHands   []sorter.HoleCards `json:"all_hands"`
}

type SortResponse struct {
	AllHands    []sorter.HoleCards `json:"all_hands"`
	HandClasses []string           `json:"hand_classes"`
}

func TestSortRangeRedux(t *testing.T) {
	requestJson := strings.NewReader(`{"board_cards":["Jc","Qd","3h"],"all_hands":[["5s", "5c"], ["3s", "3c"], ["As", "Ac"], ["4s", "4c"]]}`)
	sortRequest := SortRequest{}
	json.NewDecoder(requestJson).Decode(&sortRequest)
	sortResponse := SortResponse{}
	sortResponse.AllHands, _, _ = sorter.SortRange(sortRequest.AllHands, sortRequest.BoardCards, sorter.HoleCards{})
	sortResponse.HandClasses = sorter.ClassifyHands(sortResponse.AllHands, sortRequest.BoardCards)
	if fmt.Sprintf("%v", sortResponse.AllHands) != "[[4s 4c] [5s 5c] [As Ac] [3s 3c]]" {
		t.Errorf("Got %v", sortResponse.AllHands)
	}
}

// func TestSortRangeTrifecta(t *testing.T) {
// 	requestJson := strings.NewReader(`{ "board_cards": ["3d", "4d", "Th"], "all_hands": [ ["Ad", "As"], ["Ah", "As"], ["Ah", "Ad"], ["Ac", "As"], ["Ac", "Ad"], ["Ac", "Ah"] ] }`)
// 	sortRequest := SortRequest{}
// 	json.NewDecoder(requestJson).Decode(&sortRequest)
// 	sortResponse := SortResponse{}
// 	sortResponse.AllHands = sorter.SortRange(sortRequest.AllHands, sortRequest.BoardCards)
// 	sortResponse.HandClasses = sorter.ClassifyHands(sortResponse.AllHands, sortRequest.BoardCards)
// 	t.Errorf("Got %v", sortResponse.AllHands)
// }

func TestSortFullDeck(t *testing.T) {
	allHoleCards := make([]sorter.HoleCards, 0, len(sorter.FullDeck())*len(sorter.FullDeck()))
	FullDeckList := []string{
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
	}

	boardCards := make(map[string]bool)
	boardCards["As"] = true
	boardCards["Ks"] = true
	boardCards["Qs"] = true

	for i, cardi := range FullDeckList {
		for j, cardj := range FullDeckList {
			if i < j && boardCards[cardi] == false && boardCards[cardj] == false {
				allHoleCards = append(allHoleCards, sorter.HoleCards{cardi, cardj})
			}
		}
	}
	res, _, _ := sorter.SortRange(allHoleCards, []string{"As", "Ks", "Qs"}, sorter.HoleCards{})
	if len(res) != 1176 {
		t.Errorf("Got %v", len(res))
	}
}

func TestFullDeck(t *testing.T) {
	res := sorter.FullDeck()
	if len(res) != 52 {
		t.Errorf("full deck does not have 52 cards")
	}
}

func TestRandomRunout(t *testing.T) {
	res := sorter.RandomRunout([]string{"Ac", "Ad"})
	if len(res) != 3 {
		t.Errorf("runout was wrong length. Expected 3, got %v", len(res))
	}
}

// func TestManyRunouts(t *testing.T) {
// 	res := make([]string, 0, 50)
// 	for i := 0; i < 100; i++ {
// 		runout := sorter.RandomRunout([]string{"Ac", "Ad", "Ah"})
// 		for card, _ := range runout {
// 			res = append(res, card)
// 		}
// 	}
// 	t.Errorf("got %v", res)
// }

func TestScoreHoleCards(t *testing.T) {
	suitedConnectors := sorter.HoleCards{"5h", "6h"}
	unexcludedRange := []sorter.HoleCards{suitedConnectors}
	boardCards := []string{"5c", "6c", "Ac"}
	runout := map[string]bool{"Qd": true, "6d": true}
	res := sorter.ScoreHoleCards(unexcludedRange, boardCards, runout)

	if res[0].Score != 271 {
		t.Errorf("Got %v", res)
	}

	if res[0].Cards != [2]string{"5h", "6h"} {
		t.Errorf("Got %v", res)
	}
}

func TestSortScoredHoleCards(t *testing.T) {
	handA := sorter.ScoredHoleCards{
		Cards: sorter.HoleCards{"5h", "6h"},
		Score: 162,
	}
	handB := sorter.ScoredHoleCards{
		Cards: sorter.HoleCards{"7h", "2s"},
		Score: 5000,
	}
	handC := sorter.ScoredHoleCards{
		Cards: sorter.HoleCards{"Ac", "Kc"},
		Score: 1,
	}
	handRange := sorter.ScoredRange{handA, handB, handC}
	sort.Sort(handRange)
	if handRange[0].Score != 5000 && handRange[1].Score != 162 && handRange[2].Score != 1 {
		t.Errorf("Got%v", handRange)
	}
}

func TestUnexcludedRange(t *testing.T) {
	suitedConnectors := sorter.HoleCards{"5h", "6h"}
	bigSlick := sorter.HoleCards{"Ac", "Kc"}
	handRange := []sorter.HoleCards{suitedConnectors, bigSlick}
	runout := map[string]bool{"Kc": true}
	res := sorter.UnexcludedRange(handRange, runout)
	if len(res) != 1 && res[0] != suitedConnectors {
		t.Errorf("Got %v", res)
	}
}

func TestClassifyHands(t *testing.T) {
	allHands := []sorter.HoleCards{{"Ac", "Ah"}}
	boardCards := []string{"Ad", "3c", "Qd", "7h", "6s"}
	res := sorter.ClassifyHands(allHands, boardCards)
	if len(res) != 1 {
		t.Errorf("Got %v", len(res))
	}

	if res[0] != "Three of a Kind" {
		t.Errorf("Got %v", res)
	}
}

func TestHoleCardsValid(t *testing.T) {
	holeCards := sorter.HoleCards{"Ac", "Ah"}
	if !holeCards.AreValid() {
		t.Errorf("Got %v", holeCards.AreValid())
	}

	var zeroHoleCards sorter.HoleCards
	if zeroHoleCards.AreValid() {
		t.Errorf("Got %v", zeroHoleCards.AreValid())
	}
}
