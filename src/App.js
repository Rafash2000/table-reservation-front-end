import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import Reservation from './Reservation';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={RestaurantList} />
        <Route path="/restauracja/:id" component={Reservation} />
      </Switch>
    </Router>
  );
}

export default App;

