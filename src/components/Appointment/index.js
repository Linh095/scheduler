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

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointmentsUpdate = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // Axios put request to add interivew and reduce number of available spots by 1 for a given day
      const daysToLoop = lodash.cloneDeep(state.days);
      const dayOfAppointment = state.day;
      const currentInterview = state.appointments[id].interview;

      for (const day in daysToLoop) {
        if (daysToLoop[day].name === dayOfAppointment && !currentInterview) {
          daysToLoop[day].spots -= 1;
        }
      }

      // Set new state after booking appointment
      setState({
        ...state,
        appointments: appointmentsUpdate,
        days: daysToLoop
      });
    });
  }

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

  //set empty for now
  const interviewers=[]
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          onDelete={deleteInterview}
        />
      )}
    </article>
  );
}