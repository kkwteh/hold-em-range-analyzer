import sortedHoleCards from "./sortedHoleCards";

const fullDeck = new Set([
  "As",
  "Ah",
  "Ad",
  "Ac",
  "Ks",
  "Kh",
  "Kd",
  "Kc",
  "Qs",
  "Qh",
  "Qd",
  "Qc",
  "Js",
  "Jh",
  "Jd",
  "Jc",
  "Ts",
  "Th",
  "Td",
  "Tc",
  "9s",
  "9h",
  "9d",
  "9c",
  "8s",
  "8h",
  "8d",
  "8c",
  "7s",
  "7h",
  "7d",
  "7c",
  "6s",
  "6h",
  "6d",
  "6c",
  "5s",
  "5h",
  "5d",
  "5c",
  "4s",
  "4h",
  "4d",
  "4c",
  "3s",
  "3h",
  "3d",
  "3c",
  "2s",
  "2h",
  "2d",
  "2c"
]);

const handTypes = [
  "AA",
  "AKs",
  "AQs",
  "AJs",
  "ATs",
  "A9s",
  "A8s",
  "A7s",
  "A6s",
  "A5s",
  "A4s",
  "A3s",
  "A2s",
  "AKo",
  "KK",
  "KQs",
  "KJs",
  "KTs",
  "K9s",
  "K8s",
  "K7s",
  "K6s",
  "K5s",
  "K4s",
  "K3s",
  "K2s",
  "AQo",
  "KQo",
  "QQ",
  "QJs",
  "QTs",
  "Q9s",
  "Q8s",
  "Q7s",
  "Q6s",
  "Q5s",
  "Q4s",
  "Q3s",
  "Q2s",
  "AJo",
  "KJo",
  "QJo",
  "JJ",
  "JTs",
  "J9s",
  "J8s",
  "J7s",
  "J6s",
  "J5s",
  "J4s",
  "J3s",
  "J2s",
  "ATo",
  "KTo",
  "QTo",
  "JTo",
  "TT",
  "T9s",
  "T8s",
  "T7s",
  "T6s",
  "T5s",
  "T4s",
  "T3s",
  "T2s",
  "A9o",
  "K9o",
  "Q9o",
  "J9o",
  "T9o",
  "99",
  "98s",
  "97s",
  "96s",
  "95s",
  "94s",
  "93s",
  "92s",
  "A8o",
  "K8o",
  "Q8o",
  "J8o",
  "T8o",
  "98o",
  "88",
  "87s",
  "86s",
  "85s",
  "84s",
  "83s",
  "82s",
  "A7o",
  "K7o",
  "Q7o",
  "J7o",
  "T7o",
  "97o",
  "87o",
  "77",
  "76s",
  "75s",
  "74s",
  "73s",
  "72s",
  "A6o",
  "K6o",
  "Q6o",
  "J6o",
  "T6o",
  "96o",
  "86o",
  "76o",
  "66",
  "65s",
  "64s",
  "63s",
  "62s",
  "A5o",
  "K5o",
  "Q5o",
  "J5o",
  "T5o",
  "95o",
  "85o",
  "75o",
  "65o",
  "55",
  "54s",
  "53s",
  "52s",
  "A4o",
  "K4o",
  "Q4o",
  "J4o",
  "T4o",
  "94o",
  "84o",
  "74o",
  "64o",
  "54o",
  "44",
  "43s",
  "42s",
  "A3o",
  "K3o",
  "Q3o",
  "J3o",
  "T3o",
  "93o",
  "83o",
  "73o",
  "63o",
  "53o",
  "43o",
  "33",
  "32s",
  "A2o",
  "K2o",
  "Q2o",
  "J2o",
  "T2o",
  "92o",
  "82o",
  "72o",
  "62o",
  "52o",
  "42o",
  "32o",
  "22"
];

const rankToValue = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

const ranks = new Set([
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2"
]);
const suits = new Set(["c", "d", "h", "s"]);

const isCardInputValid = (text, location) => {
  if (text === undefined) {
    return false;
  }

  let tokens = text.replace(/[,\s]/g, "").match(/.{1,2}/g);

  if (tokens === null) {
    return false;
  }

  if (location === "hero" && tokens.length !== 2) {
    return false;
  }
  if (location === "board" && (tokens.length > 5 || tokens.length < 3)) {
    return false;
  }

  for (let token of tokens) {
    if (token.length !== 2) {
      return false;
    }
    if (!ranks.has(token[0].toUpperCase())) {
      return false;
    }
    if (!suits.has(token[1].toLowerCase())) {
      return false;
    }
    if (!fullDeck.has(token[0].toUpperCase() + token[1].toLowerCase())) {
      return false;
    }
  }

  return true;
};

const extractCards = (text, location) => {
  if (!isCardInputValid(text, location)) {
    return null;
  }
  let cards = text
    .replace(/[,\s]/g, "")
    .match(/.{1,2}/g)
    .map(s => s[0].toUpperCase() + s[1].toLowerCase());
  if (location === "hero") {
    let cardSet = new Set(cards);
    for (let hand of sortedHoleCards) {
      if (cardSet.has(hand[0]) && cardSet.has(hand[1])) {
        cards = hand;
      }
    }
  }
  return cards;
};

let defaultTileState = {};
for (let handType of handTypes) {
  defaultTileState[handType] = true;
}

let defaultPlayerStreetState = {
  handClasses: {},
  handStates: {},
  needsSort: true,
  thresholds: [0, 100], //range sliders take their position from this value
  sortedHands: [],
  isPolarized: false //checkbox take their position from this value
};

const defaultState = {
  knownCards: { hero: [], board: [] },
  hero: {
    preflop: {
      handClasses: new Array(sortedHoleCards.length),
      handStates: {},
      needsSort: false,
      tiles: defaultTileState,
      thresholds: [0, 100], //range sliders take their position from this value
      sortedHands: sortedHoleCards
    },
    flop: { ...defaultPlayerStreetState },
    turn: { ...defaultPlayerStreetState },
    river: { ...defaultPlayerStreetState }
  },
  opponent: {
    preflop: {
      handClasses: new Array(sortedHoleCards.length),
      handStates: {},
      needsSort: false,
      tiles: defaultTileState,
      thresholds: [0, 100],
      sortedHands: sortedHoleCards
    },
    flop: { ...defaultPlayerStreetState },
    turn: { ...defaultPlayerStreetState },
    river: { ...defaultPlayerStreetState }
  }
};

const PREVIOUS_STREET = {
  preflop: null,
  flop: "preflop",
  turn: "flop",
  river: "turn"
};

const handClass = holeCards => {
  let sortedRanks = [holeCards[0][0], holeCards[1][0]]
    .sort((a, b) => rankToValue[b] - rankToValue[a])
    .join("");

  if (holeCards[0][0] === holeCards[1][0]) {
    // pair
    return sortedRanks;
  } else if (holeCards[0][1] === holeCards[1][1]) {
    // suited
    return sortedRanks + "s";
  } else {
    // offsuit
    return sortedRanks + "o";
  }
};

const tileState = range => {
  let res = {};
  for (let handType of handTypes) {
    res[handType] = false;
  }
  for (let holeCards of range) {
    res[handClass(holeCards)] = true;
  }
  return res;
};

const categorizeHands = (
  handStates,
  sortedHands,
  heroBlockers,
  heroCards,
  board
) => {
  //handStates is dictionary from hands to strings
  //heroBlockers is array of 2 length-2 strings
  //board is an array of length-2 strings

  let heroBlockerSet = new Set(heroBlockers);
  let boardSet = new Set(board);
  for (let hand of sortedHands) {
    if (!boardSet.has(hand[0]) && !boardSet.has(hand[1])) {
      if (heroBlockerSet.has(hand[0]) || heroBlockerSet.has(hand[1])) {
        handStates[hand] = "blocked";
      }
      if (heroCards[0] === hand[0] && heroCards[1] === hand[1]) {
        handStates[hand] = "hero";
      }
    } else {
      handStates[hand] = "boardExcluded";
    }
  }
};

const numBoardCards = {
  preflop: 0,
  flop: 3,
  turn: 4,
  river: 5
};

const updateHandStates = (
  sortedHands,
  handStates,
  bottomRange,
  topRange,
  isPolarized
) => {
  let bottomIndex = bottomRange * 0.01 * sortedHands.length;
  let topIndex = topRange * 0.01 * sortedHands.length;

  for (let i = 0; i < sortedHands.length; i++) {
    if (["blocked", "hero"].indexOf(handStates[sortedHands[i]]) === -1) {
      if (isPolarized && (i < bottomIndex || i >= topIndex)) {
        handStates[sortedHands[i]] = "on";
      } else if (!isPolarized && i >= bottomIndex && i < topIndex) {
        handStates[sortedHands[i]] = "on";
      } else {
        handStates[sortedHands[i]] = "off";
      }
    }
  }
};

const indicesInRange = (arrayLength, bottomRange, topRange, isPolarized) => {
  let bottomIndex = bottomRange * 0.01 * arrayLength;
  let topIndex = topRange * 0.01 * arrayLength;

  let res = [];
  for (let i = 0; i < arrayLength; i++) {
    if (isPolarized && (i < bottomIndex || i >= topIndex)) {
      res.push(i);
    } else if (!isPolarized && i >= bottomIndex && i < topIndex) {
      res.push(i);
    }
  }
  return res;
};

const newHeroPercentile = (
  numCards,
  heroIndex,
  bottomRange,
  topRange,
  isPolarized
) => {
  let bottomIndex = bottomRange * 0.01 * numCards;
  let topIndex = topRange * 0.01 * (numCards - 1);
  if (!isPolarized) {
    if (heroIndex < bottomIndex) {
      return 0;
    } else if (heroIndex > topIndex) {
      return 100;
    } else {
      return Math.round(
        (100 * (heroIndex - bottomIndex)) / (topIndex - bottomIndex)
      );
    }
  } else {
    if (heroIndex < bottomIndex) {
      return Math.round(
        (100 * heroIndex) / (numCards - topIndex + bottomIndex)
      );
    } else if (heroIndex > topIndex) {
      return Math.round(
        (100 * (heroIndex - topIndex + bottomIndex)) /
          (numCards - topIndex + bottomIndex)
      );
    } else {
      return Math.round(
        (100 * bottomIndex) / (numCards - topIndex + bottomIndex)
      );
    }
  }
};

const handMatch = hand => otherHand =>
  ((hand[0] === otherHand[0] && hand[1] === otherHand[1]) ||
    (hand[1] === otherHand[0] && hand[0] === otherHand[1])) &&
  hand.length === 2 &&
  otherHand.length === 2;

const streetHands = (state, street, player) => {
  // Returns hands that are in initial range for the street
  // includes blocked hands in range of previous street
  // excludes hands excluded by board of given street
  if (street === "preflop") {
    return sortedHoleCards;
  }
  let handStates = state[player][PREVIOUS_STREET[street]].handStates;
  let sortedHands = state[player][PREVIOUS_STREET[street]].sortedHands;
  let boardSet = new Set(
    state.knownCards.board.slice(0, numBoardCards[street])
  );

  let res = [];

  for (let hand of sortedHands) {
    if (handStates[hand] === "on" || handStates[hand] === "hero") {
      if (!boardSet.has(hand[0]) && !boardSet.has(hand[1])) {
        res.push(hand);
      }
    }
  }

  let indices = indicesInRange(
    state[player][PREVIOUS_STREET[street]].sortedHands.length,
    state[player][PREVIOUS_STREET[street]].thresholds[0],
    state[player][PREVIOUS_STREET[street]].thresholds[1],
    state[player][PREVIOUS_STREET[street]].isPolarized
  );

  for (let i of indices) {
    if (handStates[sortedHands[i]] === "blocked") {
      if (
        !boardSet.has(sortedHands[i][0]) &&
        !boardSet.has(sortedHands[i][1])
      ) {
        res.push(sortedHands[i]);
      }
    }
  }
  return res;
};

const areKnownCardsDistinct = (hero, board) => {
  let cardSet = new Set((hero || []).concat(board || []));
  return cardSet.size === (hero || []).length + (board || []).length;
};

const stateToggles = {
  blocked: "blocked",
  hero: "hero",
  on: "off",
  off: "on"
};

const ranges = (state = defaultState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "@@redux-form/CHANGE": {
      // handle key press in hole card or board form
      if (action.meta.form === "card") {
        if (action.payload === null || action.payload === "") {
          newState.knownCards[action.meta.field] = [];
          return newState;
        }

        let cardList = extractCards(action.payload, action.meta.field);
        if (cardList === null) {
          return newState;
        }

        let knownHeroCards =
          action.meta.field === "hero" ? cardList : state.knownCards.hero;
        let knownBoardCards =
          action.meta.field === "board" ? cardList : state.knownCards.board;

        if (areKnownCardsDistinct(knownHeroCards, knownBoardCards)) {
          newState.knownCards[action.meta.field] =
            cardList || newState.knownCards[action.meta.field];

          if (action.meta.field === "hero") {
            let heroIndex = sortedHoleCards.findIndex(handMatch(cardList));
            let heroPercentile = Math.round(
              (100 * heroIndex) / (sortedHoleCards.length - 1)
            );
            newState["hero"]["preflop"].heroPercentile = heroPercentile;
            newState["hero"]["preflop"].heroIndex = heroIndex;
            newState["opponent"]["preflop"].heroPercentile = heroPercentile;
            newState["opponent"]["preflop"].heroIndex = heroIndex;
          }
        }
        return newState;
      }
      return newState;
    }
    case "CLICK_POLARIZED": {
      newState[action.player][action.street].isPolarized = action.isPolarized;
      let bottomRange = newState[action.player][action.street].thresholds[0];
      let topRange = newState[action.player][action.street].thresholds[1];

      // update heroPercentile to reflect new state
      updateHandStates(
        newState[action.player][action.street].sortedHands,
        newState[action.player][action.street].handStates,
        bottomRange,
        topRange,
        action.isPolarized
      );

      newState[action.player][action.street].heroPercentile = newHeroPercentile(
        state[action.player][action.street].sortedHands.length,
        state[action.player][action.street].heroIndex,
        bottomRange,
        topRange,
        action.isPolarized
      );

      // invalidate downstream sorts
      let streetNumCards = numBoardCards[action.street];
      for (let [street, numCards] of Object.entries(numBoardCards)) {
        if (numCards > streetNumCards) {
          newState[action.player][street].needsSort = true;
        }
      }

      return newState;
    }
    case "UPDATE_SLIDER": {
      newState[action.player][action.street].thresholds = action.values;
      var isPolarized = newState[action.player][action.street].isPolarized;
      newState[action.player][action.street].thresholds = action.values;

      if (action.street === "preflop") {
        let bottomIndex = action.values[0] * 0.01 * sortedHoleCards.length;
        let topIndex = action.values[1] * 0.01 * sortedHoleCards.length;
        newState[action.player][action.street].tiles = tileState(
          isPolarized
            ? sortedHoleCards
                .slice(0, bottomIndex)
                .concat(sortedHoleCards.slice(topIndex, sortedHoleCards.length))
            : sortedHoleCards.slice(bottomIndex, topIndex)
        );
      }

      updateHandStates(
        newState[action.player][action.street].sortedHands,
        newState[action.player][action.street].handStates,
        action.values[0],
        action.values[1],
        isPolarized
      );

      newState[action.player][action.street].heroPercentile = newHeroPercentile(
        state[action.player][action.street].sortedHands.length,
        state[action.player][action.street].heroIndex,
        action.values[0],
        action.values[1],
        isPolarized
      );

      // invalidate downstream sorts
      let streetNumCards = numBoardCards[action.street];
      for (let [street, numCards] of Object.entries(numBoardCards)) {
        if (numCards > streetNumCards) {
          newState[action.player][street].needsSort = true;
        }
      }
      return newState;
    }
    case "TOGGLE_HAND": {
      newState[action.player][action.street].handStates[action.hand] =
        stateToggles[
          newState[action.player][action.street].handStates[action.hand]
        ];
      return newState;
    }
    case "REQUEST_RANGE_SORT": {
      // this code is only reachable for street !== 'preflop', since the preflop form doesn't have a submit range button

      let sortedHands = streetHands(state, action.street, action.player);

      // these values will next be used to construct request to hand sorter backend
      newState[action.player][action.street].sortedHands = sortedHands;
      newState[action.player][action.street].needsSort = true;
      return newState;
    }
    case "RECEIVE_SORTED_HANDS": {
      let heroCards = state.knownCards.hero;

      let heroIndex = action.body.all_hands.findIndex(handMatch(heroCards));

      let sortedHands = action.body.all_hands.slice();
      let handClasses = {};
      let handStates = {};
      for (let i = 0; i < sortedHands.length; i++) {
        handClasses[sortedHands[i]] = action.body.hand_classes[i];
        handStates[sortedHands[i]] = "off";
      }

      newState[action.player][action.street].sortedHands = sortedHands;
      newState[action.player][action.street].handClasses = handClasses;

      categorizeHands(
        handStates,
        sortedHands,
        action.player === "opponent" ? state.knownCards.hero : [], // hero isn't blocked by own cards
        state.knownCards.hero,
        state.knownCards.board.slice(0, numBoardCards[action.street])
      );

      updateHandStates(
        sortedHands,
        handStates,
        newState[action.player][action.street].thresholds[0],
        newState[action.player][action.street].thresholds[1],
        newState[action.player][action.street].isPolarized
      );

      let heroPercentile = newHeroPercentile(
        sortedHands.length,
        heroIndex,
        newState[action.player][action.street].thresholds[0],
        newState[action.player][action.street].thresholds[1],
        newState[action.player][action.street].isPolarized
      );

      newState[action.player][action.street].handStates = handStates;
      newState[action.player][action.street].handClasses = handClasses;
      newState[action.player][action.street].heroPercentile = heroPercentile;
      newState[action.player][action.street].heroIndex = heroIndex;
      newState[action.player][action.street].heroQ25 = action.body.hero_q25;
      newState[action.player][action.street].heroQ75 = action.body.hero_q75;
      newState[action.player][action.street].needsSort = false;
      return newState;
    }
    case "KEYBOARD_SHORTCUT":
      newState[action.player]["preflop"].description = action.description;
      return newState;
    case "RESET_HAND":
      return {
        knownCards: { hero: [], board: [] },
        hero: {
          preflop: {
            handStates: {},
            needsSort: false,
            tiles: defaultTileState,
            thresholds: [0, 100],
            sortedHands: sortedHoleCards
          },
          flop: { ...defaultPlayerStreetState },
          turn: { ...defaultPlayerStreetState },
          river: { ...defaultPlayerStreetState }
        },
        opponent: {
          preflop: {
            handStates: {},
            needsSort: false,
            tiles: defaultTileState,
            thresholds: [0, 100],
            sortedHands: sortedHoleCards
          },
          flop: { ...defaultPlayerStreetState },
          turn: { ...defaultPlayerStreetState },
          river: { ...defaultPlayerStreetState }
        }
      };
    default:
      return state;
  }
};

export default ranges;
export { tileState, handClass, categorizeHands, isCardInputValid };
