import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage';
import Agentlog from './AgentLog/AgentLog';
import CallLog from './CallLog/CallLog';

function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>{Homepage}</Route>
            <Route path="/agent/:id">{Agentlog}</Route>
            <Route path="/call/:number">{CallLog}</Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
