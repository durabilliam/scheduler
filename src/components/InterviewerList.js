import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from "prop-types";


InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {



  //let { interviewers } = props;
  const interviewers = props.interviewers.map(interviewer => {
  
    // const handleChange = (event) => {
    //   //evt.preventDefault();
    //   props.addItem(input);
    //   handleInput("");
    //   setInterviewer({ ...interviewer, [event.target.name]: event.target.value })
    // }
  


    return ( 
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={event => props.onChange(interviewer.id)}
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
