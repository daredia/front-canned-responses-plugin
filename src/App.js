import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Templates from './Templates';

const Application = () => {
  return <div className="app">
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/">
          {/* TODO(shez): consider gating this to conversation view only, depending on
          	the behavior of the 'insert draft' button */}
          <Templates />
        </Route>
      </Switch>
    </Router>
  </div>;
};

export default Application;
