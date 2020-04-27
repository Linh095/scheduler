function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}

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

function getInterviewersForDay(state, day) {
  
  const interviewers = []
  let interviewerKeys = []
  state.days.forEach(_day => {
    if (_day.name === day) {
      interviewerKeys = _day.interviewers
    }
  })
  interviewerKeys.forEach(key => {
    interviewers.push(state.interviewers[key])
  })
  return interviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }