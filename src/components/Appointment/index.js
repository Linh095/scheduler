import React from "react";
import classnames from "classnames";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
  const show = (props.interview ? <Show {...props.interview}/> : <Empty /> )

   return (
    <article className="appointment">
      <Header time={props.time} />
      {show}
    </article>
   );
 }