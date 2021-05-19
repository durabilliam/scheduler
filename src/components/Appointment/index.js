import React from "react";
import "./styles.scss";
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
  const EDIT = "EDIT";
  const DELETE_ERROR = "DELETE_ERROR"
  const DELETE_SAVE = "DELETE_SAVE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(err => { transition(DELETE_SAVE, true) })
  }

  function deleteAppointment(id) {
    transition(CONFIRM);
  }

  function confirmDeleteAppointment(id) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(err => { transition(DELETE_ERROR, true) })
  }

  function editAppointment(name, interviewer) {
    transition(EDIT)
    const interview = {
      student: name,
      interviewer
    };
  }


  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment}
          onEdit={editAppointment}
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
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === DELETE_ERROR && (
        <Error
          message="Could not delete appointment"
          onClose={back}
        />
      )}
      {mode === DELETE_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={back}
        />
      )}
    </article>
  );
}