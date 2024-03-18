import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Dodane Link
import './style/reservation.css';

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/users/login', { email, password });
            setUser(response.data);
            if (response.data) {
                onLoginSuccess(response.data.id); // Wywołanie funkcji przekazanej w props
            }
        } catch (error) {
            console.error('Błąd logowania:', error);
        }
    };

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    if (user) {
        return <div>Cześć, {user.name}!</div>;
    }

    return (
        <div>
            <h2>Formularz logowania</h2>
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="email" witch>Adres e-mail:</label>
                    <input
                        className="form-login"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło:</label>
                    <input
                        className="form-login"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" disabled={!isFormValid}>
                    Zaloguj
                </button>
                <p>Nie masz jeszcze konta? <Link to="/register">Załóż konto</Link></p>
            </form>
        </div>
    );
}

export default LoginForm;
