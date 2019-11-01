
export default function getAppointmentsForDay(state, day) {
  let filteredDay = [];
  state.days.filter(mapDay => {
    if (mapDay.name === day) {
      filteredDay = mapDay.appointments
      filteredDay = filteredDay.map(appointment => state.appointments[appointment])
    }
  });
  return filteredDay
}

export function getInterviewersForDay(state, day) {
  let filteredInterviewers = [];
  state.days.filter(mapDay => {
    if (mapDay.name === day) {
      filteredInterviewers = mapDay.interviewers
      filteredInterviewers = filteredInterviewers.map(interviewer => state.interviewers[interviewer])
    }
  });
  return filteredInterviewers;
}

export function getInterviewer(state, interview) {
  const interviewers = state.interviewers

  if (interview === null) {
    return null
  } else {
    let foundInterviewer = interviewers[interview.interviewer];

    let newObj = {
      "student": interview.student,
      "interviewer": foundInterviewer
      }
    return newObj;
  };
  
}
 