import React from "react";

import "components/DayListItem.scss";
const classnames = require('classnames');


export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": (props.selected === true),
    "day-list__item--full": (props.spots === 0),
  });
  const formatSpots = (spots) => {
    let output = "";
    if (spots > 1) {output =`${spots} spots remaining`}
    if (spots === 1) {output =`${spots} spot remaining`}
    if (spots < 1) {output =`no spots remaining`}

    return output;
  }
  
  return (
    <div className={dayClass}>
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
      {props.children}
    </li>
    </div>
  );
}
