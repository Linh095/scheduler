import React from "react";
import classnames from "classnames"

export default function InterviewerListItem(props) {

  const interviewerClass = classnames
  ("interviewers__item", {"interviewers__item--selected": props.selected
  });
  
  const interviewerImageClass = classnames
  ("interviewers__item-image", {"interviewers__item-image--selected": props.selected
  });
  

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.value}
      />
      {props.selected && props.value}
    </li>
  );
}