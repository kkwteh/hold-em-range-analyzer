package evaluator_test

import (
	"testing"

	"github.com/kkwteh/handrank/internal/app/evaluator"
)

func TestRoyalFlushHandScore(t *testing.T) {
	res := evaluator.HandScore([]string{"Ac", "Kc", "Qc", "Jc", "Tc", "2d", "3h"})
	if res != 1 {
		t.Errorf("Got %v", res)
	}
	if evaluator.HandRank(uint32(res)) != "Straight Flush" {
		t.Errorf("Got %v", evaluator.HandRank(res))
	}
}

func TestWorstHandScore(t *testing.T) {
	res := evaluator.HandScore([]string{"7c", "5d", "4c", "3h", "2c"})
	if res != 7462 {
		t.Errorf("Got %v", res)
	}
	if evaluator.HandRank(uint32(res)) != "High Card" {
		t.Errorf("Got %v", evaluator.HandRank(res))
	}
}

func TestHandRank(t *testing.T) {
	res := evaluator.HandRank(1)
	if res != "Straight Flush" {
		t.Errorf("Got %v", res)
	}
}
