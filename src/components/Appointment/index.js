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
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {transition(CREATE)}
  const onEdit = () => {transition(EDIT)}
  const onCancel = () => {back()}
  const save = (name, interviewer) => {
      const interview = {
        "student": name,
        "interviewer": interviewer
      };

      transition("SAVING");
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(error => console.log("error in promise of save: ", error))
    }


  const onDelete = () => {
    transition(SAVING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => 
          console.log("error in promise of onDelete: ", error),
          transition(ERROR_SAVE)
          )
  }
  return (
      <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
  
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
          
        />
        )}
        {mode === CREATE && (
          <Form 
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          name={props.interview.student}
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
