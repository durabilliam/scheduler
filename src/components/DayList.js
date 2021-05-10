import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props) {
  console.log("test2", props)
  let { days } = props;
  return days.map(day => 
  <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay} />
    
  );
}

// import PlantListItem from './PlantListItem'

// export default function PlantList(props) {
// const { listOfPlants } = props

//   const parsedPlants = listOfPlants && listOfPlants.map(plant => <PlantListItem key={plant.id} {...plant} />)
//   return (
//     <section>
//       <h1>List of PlantListItem components</h1>
//       {parsedPlants}
//       {!listOfPlants && <p>No plant data!</p>}
//     </section>
//   )
// }