import React, { useState } from "react";
import classnames from "classnames";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {

  const [name, setName] = useState(props.name || "")

  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const reset = () => {
    return setName(""), setInterviewer(null);
  }

  const cancel = () => {
    return reset(), props.onCancel();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>

        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(event) => cancel()}>
            Cancel</Button>
          <Button confirm name={name} interviewer={interviewer} onClick={props.onSave}>
            Save</Button>
        </section>
      </section>
    </main>
  );
}