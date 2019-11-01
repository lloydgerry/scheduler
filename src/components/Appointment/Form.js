import React, { useState } from "react";

import InterviewerList from "components/InterviewersList";
import Button from "components/Button";


export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  function reset() {
    setName("") 
    setInterviewer(null)
  };

  function cancel() {
    reset() 
  }

  console.log("current Interviewer: ", interviewer)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange= {e => setName(e.target.value)}
        
          />
        </form>
        <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => props.onCancel()}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )};

