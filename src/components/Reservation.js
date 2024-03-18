import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './/style/reservation.css';
import LoginForm from './LoginForm';

function Reservation() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [selectedDate, setSelectedDate] = useState(tomorrow);
    const [data, setData] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(4); 
    const { id: restaurantId } = useParams();
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [reservationConfirmed, setReservationConfirmed] = useState(false);
    const [userName, setUserName] = useState('');
    const [restaurantName, setRestaurantName] = useState(''); // Dodano stan dla nazwy restauracji

    useEffect(() => {
        axios.get(`http://localhost:8081/restaurants/${restaurantId}`)
            .then((response) => {
                setRestaurantName(response.data.name); // Ustaw nazwę restauracji
            })
            .catch((error) => {
                console.error('Błąd pobierania nazwy restauracji:', error);
            });
    }, [restaurantId]);

    const handleLoginSuccess = (loginUserId) => {
        setIsUserLoggedIn(true);
        setUserId(loginUserId);
        
        axios.get(`http://localhost:8081/users/name/${loginUserId}`)
            .then((response) => {
                setUserName(response.data); // Zapisz nazwę użytkownika
            })
            .catch((error) => {
                console.error('Błąd pobierania nazwy użytkownika:', error);
            });
    };

    const handleReservation = async () => {
        if (!selectedTableId || !userId) {
            console.log('Brak danych do rezerwacji');
            return;
        }

        try {
            await axios.post('http://localhost:8081/reservations/reserve', {
                userId: userId,
                tableId: selectedTableId,
            });
            console.log('Rezerwacja została dokonana');
            setSelectedTime(null);
            setSelectedTableId(null);
            fetchData(selectedDate, selectedSeats);
            setReservationConfirmed(true);
        } catch (error) {
            console.error('Błąd podczas rezerwacji:', error);
        }
    };

    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchData = useCallback(async (date, seats) => {
        try {
            const formattedDate = formatDateToYYYYMMDD(date);
            const response = await axios.get(`http://localhost:8081/tables/${restaurantId}/${formattedDate}/${seats}`);
            setData(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
    }, [restaurantId]);

    useEffect(() => {
        fetchData(selectedDate, selectedSeats);
    }, [selectedDate, selectedSeats, fetchData]);

    const handleDateChange = (date) => {
        const currentDate = new Date();
        if (date < currentDate) {
            return;
        }
        setSelectedDate(date);
        setSelectedTime(null);
        setSelectedTableId(null);
        setReservationConfirmed(false);
    };

    const handleSeatsChange = (event) => {
        setSelectedSeats(parseInt(event.target.value, 10));
        setSelectedTime(null);
        setSelectedTableId(null);
        setReservationConfirmed(false);
    };

    const handleTimeClick = (time, tableId) => {
        setSelectedTime(time);
        setSelectedTableId(tableId);
    };

    const isReservationButtonEnabled = isUserLoggedIn && selectedTableId && !reservationConfirmed;

    return (
        <div className="reservation-container">
            <h1>{restaurantName || 'Ładowanie...'}</h1>
            <div className="calendar-container">
                <Calendar onChange={handleDateChange} value={selectedDate} />
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
                    <h2>Dostępne godziny:</h2>
                    {data.map((item, index) => (
                        <button
                            key={index}
                            className={`time-frame ${selectedTime === item.time ? 'selected' : ''}`}
                            onClick={() => handleTimeClick(item.time, item.id)}
                        >
                            {item.time}
                        </button>
                    ))}
                </div>
            )}
            
            {!isUserLoggedIn && <LoginForm onLoginSuccess={handleLoginSuccess} />}
            <button 
                onClick={handleReservation} 
                disabled={!isReservationButtonEnabled}
            >
                Rezerwuj
            </button>
            {isUserLoggedIn && <p>Cześć, {userName}!</p>}
            
           
            {reservationConfirmed && (
                <p>Potwierdzenie rezerwacji zostało wysłane na Twój adres email.</p>
            )}
        </div>
    );
}

export default Reservation;
