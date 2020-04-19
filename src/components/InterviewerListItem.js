import React from "react";
import classnames from "classnames"

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classnames
  ("interviewers__item", {"interviewers__item--selected": props.selected
  });
  
  const interviewerImageClass = classnames
  ("interviewers__item-image", {"interviewers__item-image--selected": props.selected
  });
  const _name = selected? name : "";

  return (
    <li className={interviewerClass} key={id} selected={selected} setInterviewer={setInterviewer}  >
      <img
        className={interviewerImageClass}
        src={avatar}
        alt={name}
      />
      {_name}
    </li>
  )
}