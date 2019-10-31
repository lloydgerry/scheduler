import React from "react";

import "./styles.scss";

import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {transition("CREATE")}
  const onCancel = () => {back()}
  const onSave = () => {}

  return (
      <article className="appointment">
      <Header time={props.time} />
  
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        )}
        {mode === CREATE && (
          <Form 
          interviewers={[]}
          onCancel={onCancel}
          onSave={onSave}
          />
        )}
      
      </article>
  )
}
