import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { scrollToWhen } from "react-redux-scroll";
import { requestRangeSort, toggleHand, updateSlider } from "../actions";
import FormTooltipRange from "./FormTooltipRange";
import PolarizedCheckbox from "./PolarizedCheckbox";
import Grid from "./Tile";
import { ActiveListener } from "react-event-injector";

const isFirefox = typeof InstallTrigger !== "undefined";
const DISPLAY_SIZE_THRESHOLD = 260;

const scrollable = scrollToWhen(
  (action, props) =>
    action.type === "SCROLL_TO_RANGE_FORM" && props.id === action.id,
  null,
  {
    yMargin: 120,
    duration: 150
  },
  ["id"]
);

const ScrollableDiv = scrollable("div");

class RangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    const {
      dispatch,
      title,
      player,
      street,
      thresholds,
      handleClick,
      handleWheel,
      handleSubmit,
      submitting,
      isCurrent,
      isPolarized,
      description,
      boardCards,
      topHands,
      medianIndex,
      rangeCount,
      heroPercentile,
      averageHeroEquity
    } = this.props;

    let polarizedCheckbox;
    if (street !== "preflop") {
      polarizedCheckbox = <PolarizedCheckbox player={player} street={street} />;
    }

    let heroPercentileDisplay;
    if (heroPercentile !== undefined) {
      heroPercentileDisplay = (
        <div className="range-form-div info-copy">
          Hero is ahead of {heroPercentile}% of {player}
          's range.
        </div>
      );
    }

    let heroEquityDisplay;
    if (averageHeroEquity !== undefined) {
      heroEquityDisplay = (
        <div className="range-form-div info-copy">
          Hero equity: {averageHeroEquity}%
        </div>
      );
    }

    let sortRangeButton;
    if (street !== "preflop") {
      sortRangeButton = (
        <div>
          <button
            className="sort-range-button"
            type="submit"
            disabled={submitting}
          >
            Calculate {player} {street} range
          </button>
        </div>
      );
    }

    let cardDisplay;
    cardDisplay = (
      <div className="hand-list">
        {(topHands || []).map(([hand, handState], index) => (
          <span
            key={hand}
            className={
              "hand-state hand-state-" +
              (index === medianIndex ? "median" : handState)
            }
            onClick={() => handleClick(player, street, hand)}
          >
            <span key={hand + hand[0]} className={"suit-" + hand[0][1]}>
              {subSuits(hand[0].toString())}
            </span>
            <span key={hand + hand[1]} className={"suit-" + hand[1][1]}>
              {subSuits(hand[1].toString())}
            </span>
          </span>
        ))}
      </div>
    );

    let rangeDisplay;
    if (street !== "preflop") {
      rangeDisplay = (
        <div className={"isCurrent-" + isCurrent}>
          {rangeCount}
          {heroEquityDisplay}
          {cardDisplay}
        </div>
      );
    }

    let handGrid;
    if (street === "preflop") {
      handGrid = <Grid player={player} />;
    }

    let descriptionDisplay;
    if (street === "preflop") {
      descriptionDisplay = (
        <span className={"info-copy preflop-description-display"}>
          {description}
        </span>
      );
    }

    let boardDisplay;
    if (street !== "preflop") {
      boardDisplay = (
        <div className={"cardbox cardbox-board card-display"}>
          {boardCards.length >= numBoardCards[street]
            ? prettyCards(boardCards.slice(0, numBoardCards[street]))
            : "--"}
        </div>
      );
    }

    return (
      <ActiveListener onWheel={e => handleWheel(e, player, street, thresholds)}>
        <div className={"range-form " + player}>
          <ScrollableDiv id={player + street} />
          <form
            onSubmit={handleSubmit(data => {
              dispatch(requestRangeSort(player, street));
            })}
          >
            <div className="range-form-div">
              <span className="info-copy">{title}</span>
              {boardDisplay}
              {descriptionDisplay}
            </div>
            {sortRangeButton}
            <div
              className={
                "range-form-div value-slider-field polarized-" + isPolarized
              }
            >
              <FormTooltipRange
                player={player}
                street={street}
                defaultValue={sliderDefaultValues[street]}
              />
            </div>
          </form>
          {rangeDisplay}
          {handGrid}
        </div>
      </ActiveListener>
    );
  }
}

const sliderDefaultValues = {
  preflop: [0, 100],
  flop: [0, 100],
  turn: [0, 100],
  river: [0, 100]
};

const suitSymbols = {
  d: "♦",
  c: "♣",
  h: "♥",
  s: "♠"
};

const prettyCards = cards => {
  if (cards === undefined) {
    return null;
  }
  let res = [];
  for (let card of cards) {
    res.push(card[0].toUpperCase() + suitSymbols[card[1].toLowerCase()]);
  }
  return res.map(card => (
    <span key={card} className={"cardbox-card suit-" + card[1]}>
      {card}
    </span>
  ));
};

const numBoardCards = {
  preflop: 0,
  flop: 3,
  turn: 4,
  river: 5
};

const subSuits = text => {
  return text
    .replace(/d/g, "♦")
    .replace(/c/g, "♣")
    .replace(/h/g, "♥")
    .replace(/s/g, "♠");
};

const RangeReduxForm = reduxForm({
  form: "range"
})(RangeForm);

const mapDispatchToProps = dispatch => {
  return {
    initPreflopRange: () => {},
    handleClick: (player, street, hand) => {
      dispatch(toggleHand(player, street, hand));
    },
    // handleWheel: (player, street, values) => {
    handleWheel: (e, player, street, thresholds) => {
      // if (!isFirefox) {
      //   return;
      // }

      if (e.ctrlKey) {
        e.preventDefault();
        let delta;
        if (e.deltaY > 0) {
          delta = 5;
        } else {
          delta = -5;
        }
        let newMin = thresholds[0] + delta;
        newMin = Math.max(newMin, 0);
        newMin = Math.min(newMin, thresholds[1]);

        dispatch(updateSlider(player, street, [newMin, thresholds[1]]));
        return;
      }

      if (e.shiftKey) {
        e.preventDefault();
        let delta;
        if (e.deltaX > 0) {
          delta = 5;
        } else {
          delta = -5;
        }
        console.log("deltaX", e.deltaX);
        let newMax = thresholds[1] + delta;
        newMax = Math.min(newMax, 100);
        newMax = Math.max(newMax, thresholds[0]);

        dispatch(updateSlider(player, street, [thresholds[0], newMax]));
        return;
      }
    }
  };
};

const getTopHands = (sortedHands, handStates) => {
  if (sortedHands === undefined) {
    return [];
  }

  let res = [];
  for (let hand of sortedHands.slice(-DISPLAY_SIZE_THRESHOLD)) {
    res.push([hand, handStates[hand]]);
  }
  return res;
};

const getMedianIndex = sortedHands => {
  if (sortedHands === undefined) {
    return undefined;
  }

  let medianIndex = Math.round(sortedHands.length / 2);
  if (sortedHands.length > DISPLAY_SIZE_THRESHOLD) {
    medianIndex = medianIndex - (sortedHands.length - DISPLAY_SIZE_THRESHOLD);
  }
  return medianIndex;
};

const getRangeCount = handStates => {
  if (handStates === undefined) {
    return;
  }
  let count = 0;
  for (let [hand, state] of Object.entries(handStates)) {
    if (state === "on") {
      count += 1;
    }
  }
  return <div className="info-copy">Range: {count} hands</div>;
};

const getBestBlockerCards = (player, sortedHands, heroCards) => {
  // Lists blockers that block at least 10% of the best 20% of hands.
  if (sortedHands === undefined) {
    return;
  }

  if (player === "hero") {
    return;
  }

  let q80Counts = new Map();
  let counts = new Map();
  let q80 = Math.round(sortedHands.length * 0.8);
  let q20 = Math.round(sortedHands.length * 0.2);

  for (let [index, hand] of sortedHands.entries()) {
    for (let card of hand) {
      counts[card] = counts[card] + 1 || 1;
      if (index >= q80) {
        q80Counts[card] = q80Counts[card] + 1 || 1;
      }
    }
  }
  let tfidf = new Map();
  for (let card of Object.keys(q80Counts)) {
    tfidf[card] = ((5 * q80Counts[card]) / counts[card]).toFixed(1);
  }
  let sortedTfidf = Object.entries(tfidf).sort((a, b) => b[1] - a[1]);
  let highTfidf = [];

  // Compute blocker ratio for hero hand
  let heroQ80BlockerCount = 0;
  let heroBlockerCount = 0;
  for (let [index, hand] of sortedHands.entries()) {
    let blockerIncr = 0;
    for (let card of hand) {
      if (heroCards.indexOf(card) > -1) {
        blockerIncr = 1;
      }
    }
    heroBlockerCount = heroBlockerCount + blockerIncr;
    if (index >= q80) {
      heroQ80BlockerCount = heroQ80BlockerCount + blockerIncr;
    }
  }
  highTfidf.push([
    " H",
    ((5 * heroQ80BlockerCount) / heroBlockerCount).toFixed(1)
  ]);

  // Aggregate high TFIDF blockers and hero TFIDF
  for (let [card, ratio] of sortedTfidf) {
    if (ratio >= 1.2 && q80Counts[card] >= 0.1 * q20) {
      highTfidf.push([card, ratio]);
    }
  }

  return (
    <span className="info-copy">
      Blockers (of top {q20} hands):
      {highTfidf.map(([card, ratio]) => (
        <span key={card} className={"blocker-count suit-" + card[1]}>
          {subSuits(card) + "(" + ratio + ")"}
        </span>
      ))}
    </span>
  );
};

const mapStateToProps = (state, ownProps) => ({
  topHands: getTopHands(
    state.ranges[ownProps.player][ownProps.street].sortedHands,
    state.ranges[ownProps.player][ownProps.street].handStates
  ),
  medianIndex: getMedianIndex(
    state.ranges[ownProps.player][ownProps.street].sortedHands
  ),
  rangeCount: getRangeCount(
    state.ranges[ownProps.player][ownProps.street].handStates
  ),
  handStates: state.ranges[ownProps.player][ownProps.street].handStates,
  isCurrent: !state.ranges[ownProps.player][ownProps.street].needsSort,
  isPolarized:
    state.ranges[ownProps.player][ownProps.street].isPolarized || false,
  boardCards: state.ranges.knownCards.board,
  heroPercentile: state.ranges[ownProps.player][ownProps.street].heroPercentile,
  description: state.ranges[ownProps.player][ownProps.street].description,
  thresholds: state.ranges[ownProps.player][ownProps.street].thresholds,
  averageHeroEquity: computeAverageHeroEquity(
    ownProps.player,
    state.ranges[ownProps.player][ownProps.street].sortedHands,
    state.ranges[ownProps.player][ownProps.street].heroEquities,
    state.ranges[ownProps.player][ownProps.street].handStates
  )
});

const computeAverageHeroEquity = (
  player,
  sortedHands,
  heroEquities,
  handStates
) => {
  if (
    sortedHands === undefined ||
    heroEquities === undefined ||
    handStates === undefined ||
    player === "hero"
  ) {
    return undefined;
  }

  let count = 0;
  let totalEquity = 0;
  for (let [index, hand] of sortedHands.entries()) {
    if (handStates[hand] === "on") {
      count += 1;
      totalEquity += heroEquities[index];
    }
  }
  console.log("avg equity", totalEquity / count);
  return Math.round((totalEquity / count) * 1000) / 10;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeReduxForm);
