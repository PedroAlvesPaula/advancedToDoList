import React from 'react';
import { useParams } from 'react-router-dom';
import { DetailsTask } from '../components/tasks/DetailsTask'

export const ViewTask = () => {

    const { id } = useParams();

  return (
    <DetailsTask id={id}/>
  )
}
