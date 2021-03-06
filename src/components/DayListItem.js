import React from "react";
import classnames from "classnames"


export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {"day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  })
  const spotsRemaning = () =>
  {
    if (props.spots === 1) {
      return "1 spot remaining"
    } else if (props.spots) {
      return props.spots + " spots remaining"
    } else {
      return "no spots remaining"
    }
  }
  return (
    <li className={dayClass} 
    onClick={() => props.setDay(props.name)}
    data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaning()}</h3>
    </li>
  ); 
}