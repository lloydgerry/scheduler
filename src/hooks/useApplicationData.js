import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {

  // const reducerLookup = {
  //   setDay: (state, action) => {
  //     const newState = {...state, waiting: true }    
  //     console.log("NEW STATE WHO DIS", action.type,  newState);
  //   },
  //   api: (state, action) => {
  //     const newState = {...state, waiting: true }    
  //     console.log("NEW STATE WHO DIS", action.type,  newState);
  //   },
  //   bookInterview: (state, action) => {
  //     const newState = {...state, waiting: true }    
  //     console.log("NEW STATE WHO DIS", action.type,  newState);
  //   },
  //   cancelInterview: (state, action) => {
  //     const newState = {...state, waiting: true }    
  //     console.log("NEW STATE WHO DIS", action.type,  newState);
  //   },
   
  // };
  
  // const reducer = (state, action) => {
  //   return reducerLookup[action.type](state, action);
  
  //State and API Info
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //SetDay
  const setDay = day => setDay({ ...state, day });

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
    }))
    .catch(error => console.log("DB Write Error on Book Interview: ", error))
  }
  //Cancel Interview

  const cancelInterview =(id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      console.log("CancelInterview hit, id is: ", id)
      return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment).then(response => 
        setState({
          ...state,
          appointments
      }))
      .catch(error => console.log("DB Write Error on Cancel Interview: ", error))
  }
  return {state, setDay, bookInterview, cancelInterview }
}