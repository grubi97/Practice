import React, { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Navbar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const location = useLocation();
//Switch radi da su rute ekskluzivne, samo se jedna moze aktivirati a ne istovremeno, nopr za error bi se inace svugde pojavilo
  return (
    <Fragment>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"} //svaka ruta koja je jednako / + nesta matcha tu rutu
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/edit/:id"]}
                  component={ActivityForm}
                />
                <Route path='/servererror' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
