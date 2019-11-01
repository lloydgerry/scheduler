import React from "react";

import "./styles.scss";

import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {transition("CREATE")}
  const onCancel = () => {back()}
  const save = (name, interviewer) => {
    console.log("form save outputs:", name, interviewer)
      const interview = {
        "student": name,
        "interviewer": interviewer 
      };
      transition("SAVING");
      props.bookInterview(props.id, interview).then(() => transition("SHOW"))
    }

  console.log("appointment index props: ", props)

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
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
          />
        )}
        {mode === SAVING && (
          <Status />
        )}
      
      </article>
  )
}
