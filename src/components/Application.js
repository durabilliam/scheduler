//import React from "react";
import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
 
  const setDay = day => setState({ ...state, day });
  
  //const setDays = (days) => setState(prev => ({ ...prev, days }));
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then (response => {
        setState({...state, appointments})
      })
  }

  function cancelInterview(id) {
    
    console.log("xxx", id)
    return axios.delete(`/api/appointments/${id}`)
      .then (response => { 
        // const appointment = {
        //   ...state.appointments[id],
        //   interview: null
        // };
        // const appointments = {
        //   ...state.appointments,
        //   [id]: appointment
        // };
        // for (const appointment in appointments)
        //   if (appointments[appointment] === id){
        //   appointments[appointment].interview = null;
        //   }
        //setState({...state, appointments})   
      })
        
        
     
        //console.log("HHHHJ", appointments[id])})
  }
  

  

const appointments = getAppointmentsForDay(state, state.day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, state.day)

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});


  //const dailyAppointments = getAppointmentsForDay(state, state.day)

  //const dailyInterviewers = getInterviewersForDay(state, state.day)
  
  // const schedule = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //     />
  //   );
  // });

  useEffect(() => {
    const daysUrl = `/api/days`;
    const appointmentsUrl =  `/api/appointments`;
    const interviewersUrl =  `/api/interviewers`;
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)

    ]).then((all) => {
      setState(prev =>({
            ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
      })) 
    })
  }, [])

  // useEffect(() => {
  //   const testURL = `/api/days`;
  //     axios.get(testURL)
  //     .then(response => {
  //       setDays([...response.data])
  //     });
  // }, [])
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
        days={state.days}
        day={state.day}
        setDay={day => setDay(day)}
        />
        </nav>
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {/* {dailyAppointments.map(appointment => {
          //const dailyInterviewers = getInterviewersForDay(state, state.day)
          return <Appointment key={appointment.id} {...appointment} />
        })} */}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
