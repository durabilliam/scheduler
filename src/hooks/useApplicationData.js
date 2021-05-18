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
    const appointment = { ...state.appointments[id], interview: { ...interview }};
    const appointments = { ...state.appointments, [id]: appointment };
    
    // Find the number of free spots
    //day we are going to update
    const newDay = state.day
    //finding the day in State
    const dayToUpdate = state.days.find(day => day.name === newDay)
    //finding the Array index of day we are updating
    const dayToUpdateIndex = state.days.findIndex(day => day.name === newDay)
    //get appointment list from updating day
    const listOfAppointmentIds = dayToUpdate.appointments
    // finding available spots based on null. (Lenth of the null array)
    const spots = listOfAppointmentIds.filter(apptId => state.appointments[apptId].interview === null).length
    //Removing Spot
    dayToUpdate.spots = dayToUpdate.spots - 1
    //updating the new spots in the day to update
    const updatedDay = { ...dayToUpdate}
    //creating a new state for the updated days
    const updatedDays = [...state.days]
    //adding in the new spots for just the updated day for the new state
    updatedDays[dayToUpdateIndex] = updatedDay
    let days = [...updatedDays]
  
    return axios.put(`/api/appointments/${id}`, appointment)
      .then (response => {
        setState({...state, appointments, days})
      })
  }  


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const newDay = state.day
    //finding the day in State
    const dayToUpdate = state.days.find(day => day.name === newDay)
    //finding the Array index of day we are updating
    const dayToUpdateIndex = state.days.findIndex(day => day.name === newDay)
    //Adding spot back    
    dayToUpdate.spots = dayToUpdate.spots + 1
    //updating the new spots in the day to update
    const updatedDay = { ...dayToUpdate}
    //creating a new state for the updated days
    const updatedDays = [...state.days]
    //adding in the new spots for just the updated day for the new state
    updatedDays[dayToUpdateIndex] = updatedDay
    let days = [...updatedDays]

    return axios.delete(`/api/appointments/${id}`)
      .then (response => {
        setState({...state, appointments, days})
       })
  }




  return {
    state,
    setDay,
    bookInterview,
    cancelInterview  
  }
}