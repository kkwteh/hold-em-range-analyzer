export const inputCards = (text, location) => ({
  type: "INPUT_CARDS",
  text,
  location
});

export const receiveSortedHands = (player, street, body) => ({
  type: "RECEIVE_SORTED_HANDS",
  player,
  street,
  body
});

export const updateSlider = (player, street, values) => ({
  type: "UPDATE_SLIDER",
  player,
  street,
  values
});

export const toggleHand = (player, street, hand) => ({
  type: "TOGGLE_HAND",
  player,
  street,
  hand
});

export const resetHand = () => ({
  type: "RESET_HAND"
});

export const turnOnHeroEditor = () => ({
  type: "TURN_ON_HERO_EDITOR"
});

export const turnOffHeroEditor = () => ({
  type: "TURN_OFF_HERO_EDITOR"
});

export const turnOnBoardEditor = () => ({
  type: "TURN_ON_BOARD_EDITOR"
});

export const turnOffBoardEditor = () => ({
  type: "TURN_OFF_BOARD_EDITOR"
});

export const clickPolarized = (player, street, isPolarized) => ({
  type: "CLICK_POLARIZED",
  player,
  street,
  isPolarized
});

export const keyboardShortcut = (description, player) => ({
  type: "KEYBOARD_SHORTCUT",
  description: description,
  player: player
});

export const scrollToRangeForm = id => ({
  type: "SCROLL_TO_RANGE_FORM",
  id: id
});

const numBoardCards = {
  preflop: 0,
  flop: 3,
  turn: 4,
  river: 5
};

export const sortReqBody = (getState, player, street) => {
  let state = getState();
  let heroCards = state.ranges.knownCards.hero;
  let allHandsWithHero =
    state.ranges[player][street].sortedHands.findIndex(
      hand => hand[0] === heroCards[0] && hand[1] === heroCards[1]
    ) === -1 && heroCards.length === 2
      ? state.ranges[player][street].sortedHands.concat([heroCards])
      : state.ranges[player][street].sortedHands;
  return {
    board_cards: state.ranges.knownCards.board.slice(0, numBoardCards[street]),
    all_hands: allHandsWithHero,
    hero_cards: heroCards.length === 2 ? heroCards : null
  };
};

export const requestRangeSort = (player, street) => (dispatch, getState) => {
  dispatch({
    type: "REQUEST_RANGE_SORT",
    player,
    street
  });
  if (
    street !== "preflop" &&
    numBoardCards[street] <= getState().ranges.knownCards.board.length
  ) {
    return fetch(
      process.env.NODE_ENV === "production"
        ? "https://thawing-everglades-88893.herokuapp.com/sortcards"
        : "http://127.0.0.1:8001/sortcards",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sortReqBody(getState, player, street))
      }
    )
      .then(response => response.json())
      .then(json => dispatch(receiveSortedHands(player, street, json)));
  }
};
