import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import "./styles.scss";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_DELETE = "ERROR_DELETE";
const EDITING = "EDITING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //send data to server and call show mode
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  // Delete an interview
  function deleteInterview() {
    transition(DELETING, true);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDITING)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          onDelete={deleteInterview}
        />
      )}
      {mode === EDITING && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          onDelete={deleteInterview}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Delete this interview?"
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}
    </article>
  );
}