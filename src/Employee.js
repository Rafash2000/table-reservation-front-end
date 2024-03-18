import React, { useState } from 'react';
import axios from 'axios';
import './style/employee.css';

function Employee() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantId, setRestaurantId] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [reservations, setReservations] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [tableNumber, setTableNumber] = useState('');
  const [tableCapacity, setTableCapacity] = useState('');
  const [tableDate, setTableDate] = useState('');
  const [tableTime, setTableTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/employees/login', { email, password });
      setRestaurantId(response.data);
      fetchReservations(response.data, 'today');
    } catch (error) {
      console.error('Błąd logowania', error);
    }
  };

  const fetchReservations = async (id, type) => {
    try {
      const response = await axios.get(`http://localhost:8081/reservations/${type}/${id}`);
      setReservations(response.data);
      setActiveTab(type);
    } catch (error) {
      console.error(`Błąd pobierania rezerwacji (${type})`, error);
    }
  };

  const handleChangeDateStart = (reservation) => {
    setEditingReservationId(reservation.id);
    setNewDate(reservation.date);
    setNewTime(reservation.time);
  };

  const handleUpdateReservationDate = async () => {
    if (!newDate || !newTime) {
      alert('Proszę wprowadzić nową datę i czas.');
      return;
    }

    try {
      await axios.put(`http://localhost:8081/reservations/update/${editingReservationId}`, {
        date: newDate,
        time: newTime
      });
      alert('Data rezerwacji została zmieniona.');
      fetchReservations(restaurantId, 'future');
      setEditingReservationId(null);
    } catch (error) {
      console.error('Błąd podczas aktualizacji rezerwacji:', error);
      alert('Nie można zmienić daty rezerwacji.');
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await axios.put(`http://localhost:8081/reservations/cancel/${reservationId}`);
      fetchReservations(restaurantId, 'future');
    } catch (error) {
      console.error('Błąd podczas anulowania rezerwacji:', error);
    }
  };

  const handleCreateTable = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8081/tables/create', {
        number: parseInt(tableNumber),
        capacity: parseInt(tableCapacity),
        date: tableDate,
        time: tableTime,
        availability: 'available',
        restaurantId
      });
      alert('Stolik dodany pomyślnie');
      setTableNumber('');
      setTableCapacity('');
      setTableDate('');
      setTableTime('');
    } catch (error) {
      console.error('Błąd podczas dodawania stolika:', error);
      alert('Nie udało się dodać stolika.');
    }
  };

  return (
    <div className="login-form-container">
      {!restaurantId && (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Hasło:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <button className="form-button" type="submit">Zaloguj</button>
          </div>
        </form>
      )}

      {restaurantId && (
        <>
          <div className="reservation-buttons">
            <button onClick={() => fetchReservations(restaurantId, 'today')}>Dzisiejsze</button>
            <button onClick={() => fetchReservations(restaurantId, 'future')}>Przyszłe</button>
            <button onClick={() => fetchReservations(restaurantId, 'past')}>Archiwalne</button>
            <button onClick={() => setActiveTab('addTable')}>Dodaj stolik</button>
          </div>

          {reservations.length > 0 && activeTab !== 'addTable' && (
            <div className="reservations-list">
              <h2>Rezerwacje {activeTab === 'today' ? 'Dzisiejsze' : activeTab === 'future' ? 'Przyszłe' : 'Archiwalne'}:</h2>
              <ul>
                {reservations.map((reservation) => (
                  <li key={reservation.id} className="reservation-box">
                    <p>ID: {reservation.id}, Data: {reservation.date}, Godzina: {reservation.time}</p>
                    <p>Liczba osób: {reservation.numberOfPeople}, Status: {reservation.status}</p>
                    <p>Numer stolika: {reservation.tableNumber}, Email: {reservation.email}</p>
                    {activeTab === 'future' && (
                      <div className="reservation-actions">
                        <button onClick={() => handleChangeDateStart(reservation)}>Zmień datę</button>
                        <button onClick={() => handleCancelReservation(reservation.id)}>Anuluj rezerwację</button>
                      </div>
                    )}

                    {editingReservationId === reservation.id && (
                      <div className="date-change-form">
                        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                        <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />
                        <button onClick={handleUpdateReservationDate}>Potwierdź zmianę daty</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'addTable' && (
            <form onSubmit={handleCreateTable} className="table-create-form">
              <label>
                Numer stolika:
                <input className="table-form" type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
              </label>
              <label>
                Ilość osób:
                <input className="table-form" type="number" value={tableCapacity} onChange={(e) => setTableCapacity(e.target.value)} />
              </label>
              <label>
                Data:
                <input className="table-form" type="date" value={tableDate} onChange={(e) => setTableDate(e.target.value)} />
              </label>
              <label>
                Godzina:
                <input className="table-form" type="time" value={tableTime} onChange={(e) => setTableTime(e.target.value)} />
              </label>
              <button type="submit">Dodaj</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Employee;
