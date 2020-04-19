import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props
  const daysListItems = days.map( (_day, index) => <DayListItem 
    key={index}
    name={_day.name} 
    spots={_day.spots} 
    selected={_day.name === day}
    setDay={setDay}  />
    )

  return (
    <ul>
      {daysListItems}
    </ul>
  ); 
}