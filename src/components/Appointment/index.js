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
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
        .bookInterview(props.id, interview).then(() =>{
          transition(SHOW)
        })
  }
  
  function deleteAppointment(id){
    transition(CONFIRM);
  }

  function confirmDeleteAppointment(id){
    transition(DELETING);
    props
      .cancelInterview(props.id).then(() => {
        transition(EMPTY)
      })

  }

  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form  
          interviewers={props.interviewers} 
          onCancel = {back} 
          onSave = {save}
        />
      )}  
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete= {deleteAppointment}
       />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={confirmDeleteAppointment}
          onCancel={back}
        />
      )}
      {/* {props.interview && <Show
       student={props.interview && props.interview.student}
       interviewer={props.interview && props.interview.interviewer}
      
      /> || <Empty/>} */}
    
    </article>

  );
}