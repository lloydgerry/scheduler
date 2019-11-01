import React from "react";

import "components/InterviewerListItem.scss";
const classnames = require('classnames');



export default function InterviewerListItem(props) {
  const interviewerListClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li  className={interviewerListClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
    {props.selected && props.name}
  </li>
  
  );
}


// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection
