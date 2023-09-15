import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(2);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchData(date, selectedSeats); // Aktualizujemy również ilość miejsc w żądaniu GET
  };

  const handleSeatsChange = (event) => {
    const selectedSeatsValue = parseInt(event.target.value, 10);
    setSelectedSeats(selectedSeatsValue);
    fetchData(selectedDate, selectedSeatsValue);
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
      {data && (
        <div>
          <h2>Dane dla wybranej daty:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Reservation;