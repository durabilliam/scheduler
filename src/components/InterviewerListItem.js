import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');


export default function InterviewerListItem(props) {
  console.log("here_ListItem", props)


  const interviewerClass = classNames("interviewers__item", {
    'interviewers__item--selected': props.selected === true,
  });

  return (
  <li className= {interviewerClass} onClick={() => props.setInterviewer(props.id)}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  )
}