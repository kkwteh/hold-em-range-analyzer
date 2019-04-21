package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/kkwteh/handrank/internal/app/sorter"
)

type SortRequest struct {
	BoardCards []string           `json:"board_cards"`
	AllHands   []sorter.HoleCards `json:"all_hands"`
	HeroCards  sorter.HoleCards   `json:"hero_cards"`
}

type SortResponse struct {
	AllHands    []sorter.HoleCards `json:"all_hands"`
	HandClasses []string           `json:"hand_classes"`
	HeroQ25     int                `json:"hero_q25"`
	HeroQ75     int                `json:"hero_q75"`
}

func main() {
	var router = mux.NewRouter()
	router.HandleFunc("/healthcheck", healthCheck).Methods("GET")
	router.HandleFunc("/sortcards", sortHandler).Methods("POST", "OPTIONS")

	headersOk := handlers.AllowedHeaders([]string{"Authorization", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"})

	fmt.Println("Running server!")
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8001"
	}
	fmt.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Still alive!")
}

func sortHandler(w http.ResponseWriter, r *http.Request) {
	sortRequest := SortRequest{}
	err := json.NewDecoder(r.Body).Decode(&sortRequest)
	if err != nil {
		panic(err)
	}
	resp := SortResponse{}

	resp.AllHands, resp.HeroQ25, resp.HeroQ75 = sorter.SortRange(sortRequest.AllHands, sortRequest.BoardCards, sortRequest.HeroCards)

	resp.HandClasses = sorter.ClassifyHands(resp.AllHands, sortRequest.BoardCards)

	responseJSON, err := json.Marshal(resp)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
}
