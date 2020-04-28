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
      // Put request to add interview
      const dayOfAppointment = state.day;
      const currentInterview = state.appointments[id].interview;

      //decrease the number of remaining spots
      const daysTotalInfo = lodash.cloneDeep(state.days);
      for (const day in daysTotalInfo) {
        if (daysTotalInfo[day].name === dayOfAppointment && !currentInterview) {
          daysTotalInfo[day].spots -= 1;
        }
      }
      // Set new state after booking appointment
      setState({
        ...state,
        appointments: appointmentsToEdit,
        days: daysTotalInfo
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
      const daysTotalInfo = lodash.cloneDeep(state.days);
      const dayOfAppointment = state.day;

      for (const day in daysTotalInfo) {
        if (daysTotalInfo[day].name === dayOfAppointment) {
          daysTotalInfo[day].spots += 1;
        }
      }
      setState({
        ...state,
        appointments: appointmentsToEdit,
        days: daysTotalInfo
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