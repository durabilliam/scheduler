import React, { useState, useEffect, setState } from "react";
import axios from 'axios';

export default function useApplicationData(){

  const setDay = day => setState({ ...state, day });

  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  

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
    return axios.delete(`/api/appointments/${id}`)
      .then (response => { })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview  
  }
}