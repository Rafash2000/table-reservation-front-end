import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './/style/registerForm.css';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Hasła nie są identyczne.");
      return;
    }

    try {
      const user = {
        name: firstName,
        surname: lastName,
        email: email,
        password: password
      };

      await axios.post('http://localhost:8081/users/create', user);
      setIsRegistered(true);
      setTimeout(() => navigate('/'), 5000);
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
    }
  };

  if (isRegistered) {
    return (
      <div>
        <h2>Rejestracja zakończona pomyślnie</h2>
        <p>Link aktywacyjny do konta został wysłany na adres email.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Formularz Rejestracji</h2>
      <div className="centered-container">
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Imię"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Nazwisko"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Potwierdź Hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="form-button" type="submit">Zarejestruj się</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
