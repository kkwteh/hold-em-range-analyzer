import React from 'react'
import { createSliderWithTooltip, Range } from 'rc-slider'
import lifecycle from 'react-pure-lifecycle'
import { updateSlider } from '../actions'
import { connect } from 'react-redux'
import 'rc-slider/assets/index.css'

const TooltipRange = createSliderWithTooltip(Range)
const defaultThresholds = [75, 100]

const FormTooltipRange = props => {
  return (
    <TooltipRange
      onChange={props.onChange(props.player, props.street)}
      allowCross={false}
      count={1}
      step={0.5}
      marks={props.marks || {}}
      value={props.value}
      included={true}
      defaultValue={props.defaultValue || defaultThresholds}
      className="hand-range-slider"
      tipFormatter={val => val + '%'}
      tipProps={{ placement: 'left' }}
    />
  )
}

const componentDidMount = props => {
  props.initRange(props.player, props.street, props.defaultValue)()
}

const methods = {
  componentDidMount,
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (player, street) => values => {
      dispatch(updateSlider(player, street, values))
    },
    initRange: (player, street, values) => () => {
      dispatch(updateSlider(player, street, values))
    },
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.ranges[ownProps.player] === undefined) {
    return {}
  }

  let heroPct =
    (100 * state.ranges[ownProps.player][ownProps.street].heroIndex) /
    state.ranges[ownProps.player][ownProps.street].sortedHands.length
  // let heroQ25 = (100 * state.ranges[ownProps.player][ownProps.street].heroQ25 /
  //   state.ranges[ownProps.player][ownProps.street].sortedHands.length)
  // let heroQ75 = (100 * state.ranges[ownProps.player][ownProps.street].heroQ75 /
  //   state.ranges[ownProps.player][ownProps.street].sortedHands.length)

  let marks = {}
  // TODO Evaluate these marks and see if they're useful
  // if (!isNaN(heroQ25)) {
  //   marks[heroQ25] = {
  //     style: {color: 'blue'},
  //     label: <strong>{'['}</strong>,
  //   }
  // }
  // if (!isNaN(heroQ75)) {
  //   marks[heroQ75] = {
  //     style: {color: 'blue'},
  //     label: <strong>{']'}</strong>,
  //     className: "slider-pctile"
  //   }
  // }
  if (!isNaN(heroPct)) {
    marks[heroPct] = {
      style: {
        color: 'goldenrod',
        fontFamily: '"Lucida Console", Monaco, monospace',
      },
      label: <strong>{'hero'}</strong>,
    }
  }
  return {
    marks: marks,
    value: state.ranges[ownProps.player][ownProps.street].thresholds,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(lifecycle(methods)(FormTooltipRange))
