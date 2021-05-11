import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {
  //let { interviewers } = props;
  const interviewers = props.interviewers.map(interviewer => {
  return (
    <InterviewerListItem 
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer} 
    />
   );
  });

  console.log("Here_list", props)
  console.log(interviewers)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
    
};
