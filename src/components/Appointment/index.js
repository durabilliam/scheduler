import React from "react";
import "./styles.scss";

//const classNames = require('classnames');

import Header from "./Header";
import Form from "./Form";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";



export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time} />
    
      {props.interview && <Show
       student={props.interview && props.interview.student}
       interviewer={props.interview && props.interview.interviewer}
      
      /> || <Empty/>}
    
    </article>

  );
}