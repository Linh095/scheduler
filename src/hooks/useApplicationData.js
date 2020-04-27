import { useState, useEffect } from "react";
import axios from "axios";
import lodash from "lodash";

//Functions to manage changes in state of the application
export default function useApplicationData() {

  //default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Select day to be current day (view schedule for the day)
  const setDay = day => setState({ ...state, day });

  // Book a new appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointmentsToEdit = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // Axios put request to add interivew and reduce number of available spots by 1 for a given day
      const daysToLoop = lodash.cloneDeep(state.days);

      const dayOfAppointment = state.day;
      const currentInterview = state.appointments[id].interview;

      /* eslint-disable */
      for (const day in daysToLoop) {
        if (daysToLoop[day].name === dayOfAppointment && !currentInterview) {
          daysToLoop[day].spots -= 1;
        }
      }
      /* eslint-enable */

      // Set new state after booking appointment
      setState({
        ...state,
        appointments: appointmentsToEdit,
        days: daysToLoop
      });
    });
  }

  // Delete previously booked interview
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointmentsToEdit = {
      ...state.appointments,
      [id]: appointment
    };

    // Delete request and increase number of available spots for a given day
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const daysToLoop = lodash.cloneDeep(state.days);
      const dayOfAppointment = state.day;

      for (const day in daysToLoop) {
        if (daysToLoop[day].name === dayOfAppointment) {
          daysToLoop[day].spots += 1;
        }
      }
      setState({
        ...state,
        appointments: appointmentsToEdit,
        days: daysToLoop
      });
    });
  }

  // Make axios calls to server to grab most recent data upon initial page reload
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);
  return { state, setDay, bookInterview, deleteInterview };
}