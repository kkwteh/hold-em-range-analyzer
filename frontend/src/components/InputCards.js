import React from 'react'
import { connect } from 'react-redux'
import { inputCards } from '../actions'

const buttonCopy = {
  hero: 'Input hero hole cards',
  board: 'Input board cards',
}

const InputCards = ({ dispatch, location }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(inputCards(input.value, location))
          input.value = ''
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">{buttonCopy[location]}</button>
      </form>
    </div>
  )
}

export default connect()(InputCards)
