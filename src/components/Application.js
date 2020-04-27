import React from "react";
import useApplicationData from "../hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

import "components/Application.scss";
import "components/DayListItem.scss";
import "components/InterviewerListItem.scss";
import "components/InterviewerList.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"

import axios from "axios"
axios.defaults.baseURL = "http://localhost:8001";

export default function Application(props) {

  // State changes manage in useApplicationData.js
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();


  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(
    state,
    state.day
  ).map(appointment => (
    <Appointment
      key={appointment.id}
      {...appointment}
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
    />
  ));


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
