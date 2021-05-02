import React, { Fragment, useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid'
import { Container} from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {Activity} from '../models/activity'
import Navbar from './NavBar';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';


function App() {
  const [activities,setActivities]=useState<Activity[]>([])
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);
  const [loading,setLoading]=useState(true)
  const [submiting,setSubmiting]=useState(false)

  useEffect(()=>{
   agent.Activities.list().then(response=>{
      let activities:Activity[]=[]
      response.forEach(activity=>{
        activity.date=activity.date.split('T')[0]//sam datum dobijes bro
        activities.push(activity)
      })
      setActivities(activities);
      setLoading(false)
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
    setSubmiting(true)
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id !==activity.id),activity])
        setSelectedActivity(activity);
        setEditMode(false)
        setSubmiting(false)
      })
    }else{
      activity.id=uuid()
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity])
        setSelectedActivity(activity);
        setEditMode(false)
        setSubmiting(false)

      })
    }
  }

  function handleDeleteActivity(id:string){
    setSubmiting(true)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id!==id)])
      setSubmiting(false)

    })
    
  }

  if (loading) return <LoadingComponent content='App loading'/>

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
       submitting={submiting}

        />
      </Container>
    </Fragment>
  );
}

export default App;
