import React, { useState } from 'react';
import axios from 'axios';

function DeleteUserForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email) {
            alert('Proszę podać adres email pracownika do usunięcia');
            return;
        }

        try {
            await axios.put(`http://localhost:8081/users/disable`, { email: email } );
            alert('Użytkownik został usunięty');
            setEmail('');
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error);
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
            <button type="submit">Usuń pracownika</button>
        </form>
    );
}

export default DeleteUserForm;
