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
  const setDay = day => setState({ ...state, day });

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
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(response => {
      setSpots(id, -1)

      setState({
        ...state,
        appointments
      })
    })
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
      return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment).then(response => {
        setSpots(id, +1)

        setState({
          ...state,
          appointments
        })
      })
      .catch(error => console.log("DB Write Error on Cancel Interview: ", error))
  }

  const setSpots = (id, direction) => {
    //set value to 0 to 5 to set day
    const dayId = Math.floor( (id -1) / 5)

    return state.days[dayId].spots = state.days[dayId].spots + direction;

  //  if (id >= 1 && id <=5 )      {return state.days[0].spots = state.days[0].spots + direction;} 
  //  if (id >= 6 && id <= 10 )    {return state.days[1].spots = state.days[1].spots + direction;} 
  //  if (id >= 11  && id <= 15)   {return state.days[2].spots = state.days[2].spots + direction;} 
  //  if (id >= 16  && id <= 20 )  {return state.days[3].spots = state.days[3].spots + direction;} 
  //  if (id >= 21  && id <= 25 )  {return state.days[4].spots = state.days[4].spots + direction;} 
  //   console.log("state days: ", state.days)
    
  }

  return {state, setDay, bookInterview, cancelInterview }
}