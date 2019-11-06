import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  
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

    }, []);

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

      return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment).then(response => {
        setSpots(id, +1)

        setState({
          ...state,
          appointments
        })
      })
      .catch(error => console.log("DB Write Error on Cancel Interview: ", error));
  };

  const setSpots = (id, direction) => {
    //set value to 0 to 5 to set day
    const dayId = Math.floor( (id - 1) / 5);

    return state.days[dayId].spots = state.days[dayId].spots + direction;

  };

  return {state, setDay, bookInterview, cancelInterview }
}