import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');


export default function InterviewerListItem(props) {
  console.log("here", props)


  const dayClass = classNames("interviewers__item", {
    'interviewers__item--selected': props.selected === true,
  });

  return (
  <li className= {dayClass} onClick={() => props.setInterviewer(props.name)}>
    <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
    />
    Sylvia Palmer
  </li>
  )
}