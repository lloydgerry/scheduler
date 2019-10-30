import React, {Fragment} from "react";

import "./styles.scss";

import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";


export default function Appointment(props) {


  console.log("props", props)
  return (
      <article className="appointment">
      <Header time={props.time} />
  
        {props.interview ? (
        <Show
         student={props.interview.student} 
         interviewer={props.interview.interviewer}
         />) : 
         (<Empty 
          
         />) }
      </article>
  )
}
