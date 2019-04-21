import React from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import {
  updateSlider,
  keyboardShortcut,
  resetHand,
  requestRangeSort,
  scrollToRangeForm,
  turnOffBoardEditor,
  turnOnBoardEditor,
  turnOffHeroEditor,
  turnOnHeroEditor,
} from '../actions'

class KeyboardShortcutRegion extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    console.log(this.ref.current.focus())
  }

  render() {
    return (
      <div
        ref={this.ref}
        onKeyDown={this.props.handleKeyDown(
          this.props.isActive,
          this.props.heroField,
          this.props.boardField
        )}
        onKeyUp={this.props.handleKeyUp}
        tabIndex={0}
      >
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleKeyDown: (isActive, heroField, boardField) => event => {
      if (event.ctrlKey && isActive) {
        dispatch(turnOnHeroEditor())
        console.log('Hero field mode ON')
        let ctrlChar = String.fromCharCode(event.keyCode).toLowerCase()
        if (ctrlChar.toLowerCase().match(/^[a-z0-9]+$/i) !== null) {
          dispatch(change('card', 'hero', heroField + ctrlChar))
        }
        if (event.keyCode === 8) {
          // backspace
          dispatch(
            change('card', 'hero', heroField.slice(0, heroField.length - 1))
          )
        }
      } else if (event.shiftKey && isActive) {
        dispatch(turnOnBoardEditor())
        console.log('Board field mode ON')
        let shiftChar = String.fromCharCode(event.keyCode).toLowerCase()
        if (shiftChar.toLowerCase().match(/^[a-z0-9]+$/i) !== null) {
          dispatch(change('card', 'board', boardField + shiftChar))
        }
        if (event.keyCode === 8) {
          // backspace
          dispatch(
            change('card', 'board', boardField.slice(0, boardField.length - 1))
          )
        }
      } else if (isActive) {
        issueKeyboardShortcut(dispatch, event.keyCode)
      }
    },
    handleKeyUp: event => {
      if (event.keyCode === 17) {
        // Ctrl hero
        dispatch(turnOffHeroEditor())
      } else if (event.keyCode === 16) {
        // Shift board
        dispatch(turnOffBoardEditor())
      }
      console.log(event.keyCode)
    },
  }
}

const mapStateToProps = (state, ownProps) => ({
  isActive: state.keyboard.available,
  heroField: ((state.form.card || {}).values || {}).hero || '',
  boardField: ((state.form.card || {}).values || {}).board || '',
})

const preflopRangeActions = {
  49: { range: [0, 80], desc: 'Big blind unraised', player: 'hero' }, //1
  81: { range: [0, 80], desc: 'Big blind unraised', player: 'opponent' }, //Q
  50: { range: [30, 100], desc: 'Very wide uncapped', player: 'hero' }, //2
  87: { range: [30, 100], desc: 'Very wide uncapped', player: 'opponent' }, //W
  51: { range: [40, 85], desc: 'Very wide capped', player: 'hero' }, //3
  69: { range: [40, 85], desc: 'Very wide capped', player: 'opponent' }, //E
  52: { range: [58, 100], desc: 'Wide uncapped', player: 'hero' }, //4
  82: { range: [58, 100], desc: 'Wide uncapped', player: 'opponent' }, //R
  53: { range: [60, 90], desc: 'Wide capped', player: 'hero' }, //5
  84: { range: [60, 90], desc: 'Wide capped', player: 'opponent' }, //T
  54: { range: [80, 100], desc: 'Moderate uncapped', player: 'hero' }, //6
  89: { range: [80, 100], desc: 'Moderate uncapped', player: 'opponent' }, //Y
  55: { range: [82, 95], desc: 'Moderate capped', player: 'hero' }, //7
  85: { range: [82, 95], desc: 'Moderate capped', player: 'opponent' }, //U
  56: { range: [90, 100], desc: 'Tight uncapped', player: 'hero' }, //8
  73: { range: [90, 100], desc: 'Tight uncapped', player: 'opponent' }, //I
  57: { range: [91.5, 97], desc: 'Tight capped', player: 'hero' }, //9
  79: { range: [91.5, 97], desc: 'Tight capped', player: 'opponent' }, //O
  48: { range: [97, 100], desc: 'Very tight uncapped', player: 'hero' }, //0
  80: { range: [97, 100], desc: 'Very tight uncapped', player: 'opponent' }, //P
}

const issueKeyboardShortcut = (dispatch, keyCode) => {
  var actionParams
  if (new Set(Object.keys(preflopRangeActions)).has(keyCode.toString())) {
    actionParams = preflopRangeActions[keyCode]
    dispatch(updateSlider(actionParams.player, 'preflop', actionParams.range))
    dispatch(keyboardShortcut(actionParams.desc, actionParams.player))
    dispatch(scrollToRangeForm('heropreflop'))
    return
  }

  switch (keyCode) {
    case 27: //Esc
      dispatch(resetHand())
      dispatch(change('card', 'hero', ''))
      dispatch(change('card', 'board', ''))
      dispatch(updateSlider('hero', 'preflop', [0, 100]))
      dispatch(updateSlider('opponent', 'preflop', [0, 100]))
      dispatch(scrollToRangeForm('heropreflop'))
      return
    case 90: //Z
      dispatch(requestRangeSort('hero', 'flop'))
      dispatch(requestRangeSort('opponent', 'flop'))
      dispatch(scrollToRangeForm('heroflop'))
      return
    case 88: //X
      dispatch(requestRangeSort('hero', 'turn'))
      dispatch(requestRangeSort('opponent', 'turn'))
      dispatch(scrollToRangeForm('heroturn'))
      return
    case 67: //C
      dispatch(requestRangeSort('hero', 'river'))
      dispatch(requestRangeSort('opponent', 'river'))
      dispatch(scrollToRangeForm('heroriver'))
      return
    default:
      return
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardShortcutRegion)
