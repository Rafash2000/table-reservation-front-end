import React, { useState } from 'react';
import axios from 'axios';

function AddEmployeeForm() {
    const [email, setEmail] = useState('');
    const [restaurantId, setRestaurantId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8081/admin/employee', {
                email: email,
                restaurantId: restaurantId
            });
            alert('Pracownik dodany pomyślnie');
            setEmail('');
            setRestaurantId('');
        } catch (error) {
            console.error('Błąd podczas dodawania pracownika:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Adres email pracownika" 
            />
            <input 
                type="text" 
                value={restaurantId} 
                onChange={(e) => setRestaurantId(e.target.value)} 
                placeholder="ID restauracji" 
            />
            <button type="submit">Dodaj pracownika</button>
        </form>
    );
}

export default AddEmployeeForm;
