
import React from 'react';
import './App.css';
import WelcomeScreen from "./WelcomeScreen";
import Hunt from "./Hunt/Hunt";
import {Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import Popper from 'popper.js';
// eslint-disable-next-line
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class App extends React.Component {
  render() {
    return (
      <div>
        <Container fluid>
        <Switch>
          <Route exact path="/" component={WelcomeScreen} />
          <Route path="/hunt" component={Hunt} />
        </Switch>
        </Container>
      </div>
    );
  }
}

export default App;