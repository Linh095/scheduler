function getAppointmentsForDay(state, day) {
  const appointments = []
  let appointmentKeys = []
  state.days.forEach(_day => {
    if (_day.name === day) {
      appointmentKeys = _day.appointments
    }
  })
  appointmentKeys.forEach(key => {
    appointments.push(state.appointments[key])
  })
  return appointments;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}


export { getAppointmentsForDay, getInterview }