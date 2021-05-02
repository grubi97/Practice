import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid'
import { Container} from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {Activity} from '../models/activity'
import Navbar from './NavBar';


function App() {
  const [activities,setActivities]=useState<Activity[]>([])
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response=>{
      setActivities(response.data);
    });

    
  },[])

  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?:string){
    id ? handleSelectActivity(id):handleCancelSelectActivity();//ak je otvoreno vec gleda
    setEditMode(true)
  }

  function handleFormClose(){
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity:Activity){
    activity.id ? setActivities([...activities.filter(x=>x.id !==activity.id),activity])://micemo stari activity i stavljamo novi a ko updejtamo
    setActivities([...activities,{...activity,id:uuid()}])
    setEditMode(false)
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id!==id)])
  }

  return (
   
    <Fragment >
      <Navbar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handleCancelSelectActivity}
       editMode={editMode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       createOrEdit={handleCreateOrEditActivity}
       deleteActivity={handleDeleteActivity}

        />
      </Container>
    </Fragment>
  );
}

export default App;
