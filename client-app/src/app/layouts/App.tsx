import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {

  const location = useLocation();


  return (

    <Fragment >
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}//svaka ruta koja je jednako / + nesta matcha tu rutu
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: '7em' }}>

              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/edit/:id']} component={ActivityForm} />
            </Container>


          </>
        )}
      />

    </Fragment>
  );
}

export default observer(App);
