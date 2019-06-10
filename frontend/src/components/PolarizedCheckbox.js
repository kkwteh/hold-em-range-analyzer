import React from "react";
import { clickPolarized } from "../actions";
import { connect } from "react-redux";

const PolarizedCheckbox = props => (
  <div className="info-copy range-form-div">
    <input
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange(props.player, props.street)}
    />
    Polarized
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    onChange: (player, street) => event => {
      dispatch(clickPolarized(player, street, event.target.checked));
    }
  };
};

const mapStateToProps = (state, ownProps) => ({
  checked: state.ranges[ownProps.player][ownProps.street].isPolarized
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PolarizedCheckbox);
