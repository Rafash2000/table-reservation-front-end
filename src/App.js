import React, { Component } from 'react';
import { BrowserRouter as Router,  Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Home';
import Reservation from './Reservation';
import Employee from './Employee';
import RegisterForm from './RegisterForm'; 
import AdminPanel from './AdminPanel';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/restaurant/:id' element={<Reservation/>}/>
          <Route path='/employee' element={<Employee />}/>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;