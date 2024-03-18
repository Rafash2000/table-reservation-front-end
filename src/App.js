import React, { Component } from 'react';
import { BrowserRouter as Router,  Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import Reservation from './components/Reservation';
import Employee from './components/Employee';
import RegisterForm from './components/RegisterForm'; 
import AdminPanel from './components/AdminPanel';



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