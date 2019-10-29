import React from "react";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  console.log("props: ", props)
  const interviewers = props.interviewers.map(interviewer => 
      <InterviewerListItem
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      selected={interviewer.id === props.id}
      setInterviewer={props.setInterviewer}  
      /> 
      )
    return <div>{interviewers}</div>;
}

{/* <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"></ul>
</section> */}

// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id