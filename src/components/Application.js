//import React from "react";
import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";
//import { response } from "express";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Miller-Lite",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Buddy Lite",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 6,
//     time: "5pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
 
  const setDay = day => setState({ ...state, day });
  
  //const setDays = (days) => setState(prev => ({ ...prev, days }));
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
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
      console.log(all[1].data) 
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
        {dailyAppointments.map(appointment => {
          return <Appointment key={appointment.id} {...appointment} />
        })}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
