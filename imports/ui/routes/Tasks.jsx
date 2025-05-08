import React, { useContext } from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from "meteor/react-meteor-data";

export const Tasks = () => {

  const user = useTracker(() => Meteor.user());

  return (
    <div className='tasks-container'>
      <h1>Pagina tasks {user?.username} </h1>
    </div>
  )
}
