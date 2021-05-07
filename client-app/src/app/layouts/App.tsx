import React, { Fragment, useEffect, useState } from 'react';
import {Container} from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './NavBar';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const {activityStore}=useStore()
  useEffect(()=>{
    activityStore.loadActivities();
  },[activityStore])


  if (activityStore.loadingInitial) return <LoadingComponent content='App loading'/>

  return (
   
    <Fragment >
      <Navbar/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );
}

export default observer(App);