export function getAppointmentsForDay(state, day) {

  const sday = state.days.find(d => d.name === day)
    if(sday === undefined){
      return []
    }
    const appointmentsForDay = sday.appointments.map(id => {
      return state.appointments[id]
    });
  return appointmentsForDay;
}

 