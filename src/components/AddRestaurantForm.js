import React, { useState } from 'react';
import axios from 'axios';
import './/style/addRestaurant.css';

function AddRestaurantForm() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if (!name || !city || !address || !phone || !openingTime || !closingTime) {
          alert('Wszystkie pola muszą być wypełnione.');
          return;
        }
      
        await axios.post('http://localhost:8081/admin/restaurants/create', {
          name,
          city,
          address,
          phone,
          openingTime,
          closingTime,
        });
        alert('Restauracja dodana pomyślnie');
      
        setName('');
        setCity('');
        setAddress('');
        setPhone('');
        setOpeningTime('');
        setClosingTime('');
      
      } catch (error) {
        console.error('Błąd podczas dodawania restauracji:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa" />
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Miasto" />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adres" />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" />
      <input type="time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} placeholder="Godzina otwarcia" />
      <input type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} placeholder="Godzina zamknięcia" />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default AddRestaurantForm;
