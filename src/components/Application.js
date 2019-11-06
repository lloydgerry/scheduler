import React from "react";


import "components/Application.scss";
import "components/Appointment"
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import getAppointmentsForDay, { getInterviewer, getInterviewersForDay } from "Helpers/selectors";


// //Master Component

export default function Application(props) {

  //import functions from useApplication data and destructure
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    setSpots
  } = useApplicationData();

  // Set Constants for Lists

  const appointments =  getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

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
      cancelInterview={cancelInterview}
      />
      );
  });
  // End Schedule

  //React/JSX Start
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
      {/* Appointments List produced in schedule element */}
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

