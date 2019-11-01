import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment"
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useVisualMode from "hooks/useVisualMode"
import getAppointmentsForDay, { getInterviewer, getInterviewersForDay } from "Helpers/selectors"



//Master Component

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Collect API Info
useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ]).then((all) => {

    setState(prev => ({
      ...prev, 
      days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data
    }))

    }).catch(error => console.log("API Error: ", error))

  }, [])

  // Set Constants using API Info and other App Functions

const setDay = day => setState({ ...state, day });
const appointments =  getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

//Interview Handlers ==========
//Book Interview
const bookInterview = (id, interview) => {
  const appointment = {
  ...state.appointments[id],
  interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  
  console.log("book interview: ", id, interview);
  return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(response => 
  setState({
    ...state,
    appointments
  })
  ).catch(error => console.log("DB Write Error: ", error))
}
//Cancel Interview

// Schedule
const appointmentsList = appointments.map(appointment => {
  const interview = getInterviewer(state, appointment.interview)

  return (
    <Appointment
    {...appointment}
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={interviewers}
    bookInterview={bookInterview}
    />
    );
});
// End Schedule





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
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
    {appointmentsList}
    <Appointment
      key={"last"}
      time={"5pm"} 
      />
      </section>
    </main>
  );
}

