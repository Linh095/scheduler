import React, { useState, useEffect } from "react";
import "components/Application.scss";
import "components/DayListItem.scss";
import "components/InterviewerListItem.scss";
import "components/InterviewerList.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"

import axios from "axios"

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Ugh Hatethis",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Oh Lovethis",
      interviewer: {
        id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "New Neutral",
      interviewer: {
        id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" 
      }
    }
  },
];

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


export default function Application(props) {
  const [day, setDay] = useState("Monday"); 

  const [days, setDays] = useState([]);

//make api request once to get days of the week *will not change* replaces hardcoded variable above
//ATTEMPT 1
  // axios
  // .get("/api/days")
  // .then((response) => {
  //   console.log("response", response);
  //   useEffect(() => {
  //     setDays(response);
  //   }, []);
  // })
  // .catch((error) => {
  //   console.log(error.response.status);
  //   console.log(error.response.headers);
  //   console.log(error.response.data);
  // });

useEffect (() => {
  axios.get('/api/days')
  .get("/api/days")
  .then((response) => {
    console.log("response", response)
    setDays(response.data);
  })
  .catch((error) => {
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.response.data);
  });

}, []);

  const appointmentsList = appointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
