import React from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import { requestRangeSort } from "../actions";

const DebugButton = ({ onClick }) => (
  <button onClick={onClick}>Debug Button</button>
);

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(change("range", "valueSliderheropreflop", [50, 60]));
    dispatch(change("range", "isPolarizedheropreflop", true));
    dispatch(
      requestRangeSort("hero", "preflop", {
        bottomRange: 50,
        topRange: 60,
        isPolarized: "mid"
      })
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugButton);
