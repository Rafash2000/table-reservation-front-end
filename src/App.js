import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import Reservation from './Reservation';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path='/restaurant/:id' element={<Reservation/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;


