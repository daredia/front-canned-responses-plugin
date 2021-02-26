import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Info from './Info';

const Application = () => {
  return <div className="app">
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/">
          <Info />
        </Route>
      </Switch>
    </Router>
  </div>;
};

export default Application;
