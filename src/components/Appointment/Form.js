import React, { useState } from 'react'
import Button from "../Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setInterviewer(null);
    setName("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const submit = () => {
    props.onSave(name, interviewer)
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}/>
        {/* <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={evt => props.setInterviewer(interviewer.id)}/> */}
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger
          //onClick ={props.onCancel} 
          onClick = {cancel}
          >Cancel</Button>
          <Button confirm
          onClick= {submit} 
          >Save</Button>
        </section>
      </section>
    </main>
  );
}