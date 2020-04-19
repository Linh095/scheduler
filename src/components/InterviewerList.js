import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props
  const interviewerList = interviewers.map(
    _interviewer => <InterviewerListItem
      id={_interviewer.id}
      name={_interviewer.name}
      avatar={_interviewer.avatar}
      selected= {_interviewer.id === interviewer}
      setInterviewer={setInterviewer}
      />
    )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {interviewerList}
      </ul>
    </section>
  );
}