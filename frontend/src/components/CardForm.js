import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { inputCards } from '../actions'

const CardForm = props => {
  const {
    handleSubmit,
    label,
    dispatch,
    location,
    cards,
    placeholder,
    highlight,
  } = props
  return (
    <div className="cardform">
      <form
        onSubmit={handleSubmit(data => {
          dispatch(inputCards(data[location], location))
        })}
        autoComplete="off"
      >
        <label className="info-copy">{label}</label>
        <div>
          <Field
            name={location}
            component="input"
            type="text"
            placeholder={placeholder}
            className={'card-input text-highlight-' + highlight}
          />
          <div className={'cardbox cardbox-' + location + ' card-display'}>
            {prettyCards(cards)}
          </div>
        </div>
      </form>
    </div>
  )
}

const suitSymbols = {
  d: '♦',
  c: '♣',
  h: '♥',
  s: '♠',
}

const prettyCards = cards => {
  if (cards === undefined) {
    return null
  }
  let res = []
  for (let card of cards) {
    res.push(card[0].toUpperCase() + suitSymbols[card[1].toLowerCase()])
  }
  return res.map(card => (
    <span key={card} className={'cardbox-card suit-' + card[1]}>
      {card}
    </span>
  ))
}

const CardReduxForm = reduxForm({
  form: 'card', // a unique identifier for this form
})(CardForm)

const mapStateToProps = (state, ownProps) => ({
  cards: state.ranges.knownCards[ownProps.location],
  highlight: state.keyboard.editor[ownProps.location],
})

export default connect(mapStateToProps)(CardReduxForm)
