const defaultState = {
  available: true,
  editor: { hero: false, board: false }
};

const keyboard = (state = defaultState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "@@redux-form/FOCUS":
      newState.available = false;
      return newState;
    case "@@redux-form/BLUR":
      newState.available = true;
      return newState;
    case "TURN_ON_HERO_EDITOR":
      newState.editor.hero = true;
      return newState;
    case "TURN_OFF_HERO_EDITOR":
      newState.editor.hero = false;
      return newState;
    case "TURN_ON_BOARD_EDITOR":
      newState.editor.board = true;
      return newState;
    case "TURN_OFF_BOARD_EDITOR":
      newState.editor.board = false;
      return newState;
    default:
      return state;
  }
};

export default keyboard;
