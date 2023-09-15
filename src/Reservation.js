import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './reservation.css'; 


function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(2);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReservationEnabled, setReservationEnabled] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchData(selectedDate, selectedSeats);
  }, [selectedDate, selectedSeats]);

  useEffect(() => {
    if (
      selectedDate &&
      selectedTime &&
      phoneNumber.trim() !== '' &&
      email.trim() !== ''
    ) {
      setReservationEnabled(true);
    } else {
      setReservationEnabled(false);
    }
  }, [selectedDate, selectedTime, phoneNumber, email]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSeatsChange = (event) => {
    const selectedSeatsValue = parseInt(event.target.value, 10);
    setSelectedSeats(selectedSeatsValue);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = async (date, seats) => {
    try {
      const formattedDate = formatDateToYYYYMMDD(date);
      const response = await axios.get(`http://localhost:8081/tables/1/${formattedDate}/${seats}`);
      setData(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleReservation = async () => {
    try {
      const pathArray = window.location.pathname.split('/');
      const restaurantId = parseInt(pathArray[pathArray.length - 1], 10);
  
      const formattedDate = formatDateToYYYYMMDD(selectedDate);
      const dateTime = `${formattedDate}T${selectedTime}`;
  
      const reservationData = {
        restaurantId: restaurantId,
        numberOfPeople: selectedSeats,
        dateTime: dateTime,
        phone: phoneNumber,
        email: email
      };
  
      const response = await axios.post(
        'http://localhost:8081/reservations/addReservation',
        reservationData
      );
      setPhoneNumber('');
      setEmail('');
      fetchData(selectedDate, selectedSeats);
  
      alert('Rezerwacja dokonana pomyślnie!');
    } catch (error) {
      console.error('Błąd podczas rezerwacji:', error);
      alert('Wystąpił błąd podczas rezerwacji.');
    }
  };
  

  return (
    <div className="App">
      <h1>Kalendarz z możliwością wyboru daty</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
      <p>Wybrana data: {selectedDate.toDateString()}</p>
      <label>
        Wybierz liczbę miejsc:
        <select value={selectedSeats} onChange={handleSeatsChange}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </label>
      {data.length > 0 && (
        <div>
          <h2>Dane dla wybranej daty:</h2>
          {data.map((item, index) => (
            <button
              key={index}
              className={`data-frame ${selectedTime === item.time ? 'selected' : ''}`}
              onClick={() => handleTimeClick(item.time)}
            >
              {item.time}
            </button>
          ))}
        </div>
      )}
      <div className="user-info">
        <label>
          Numer telefonu:
          <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </label>
        <label>
          Adres e-mail: {/* Nowe pole na adres e-mail */}
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
      </div>
      <button onClick={handleReservation} disabled={!isReservationEnabled}>
        Rezerwuj
      </button>
    </div>
  );
}

export default Reservation;
