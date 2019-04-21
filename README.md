# hold-em-range-analyzer

Tool to analyze hand ranges in Texas Hold'em Poker by Kevin Teh.

# Quick start

Use the tool to analyze a hand using the following steps:

- Input your (the hero's) hole cards
- Adjust the preflop sliders to inicate the preflop range of the hero and the opponent based on their table image and the strength of their preflop betting.
- Input the flop cards
- Click on "Calculate hero flop range" and "Calculate opponent flop range" to sort the preflop range according to strength on the flop.
- Adjust the flop sliders to indicate flop range of hero and opponent based on their table image and strength of their flop betting.
- Repeat for turn and river.

# Details

- The application currently only supports analysis of one hero and one opponent.
- The hand ranking algorithm works by simulating 300 random runouts to the river. On each runout, all hands in the range not excluded by the runout cards and ranked by their final river strength. The final aggregated rank is the 70th percentile of the individual runout ranks.
- The hand sorting algorithm was designed to try to represent the strength of strong draws that can make a strong hand and beat many other hands in the opponent's range.

# Local development

## Frontend

First make sure you have `yarn` and `npm` installed.

To start the frontend, open a terminal and run

```bash
cd frontend
yarn install
npm run-script start-dev
```

## Backend

The backend is written in Go and is reponsible for sorting ranges for the front end.

First, make sure you have Go 1.11+ installed.

To start the backend, open another terminal window and run

```bash
cd backend
go build
./handrank
```
