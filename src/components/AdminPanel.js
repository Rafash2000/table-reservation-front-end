import React, { useState } from 'react';
import axios from 'axios';
import AddRestaurantForm from './AddRestaurantForm';
import EditRestaurantForm from './EditRestaurantForm';
import DeleteRestaurantForm from './DeleteRestaurantForm';
import AddEmployeeForm from './AddEmployeeForm';
import DeleteUserForm from './DeleteUserForm';
import './/style/restaurantForm.css';
import './/style/admin.css';

function AdminPanel() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeView, setActiveView] = useState('home');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8081/admin/login', {
          email: email,
          password: password,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Błąd logowania:', error);
      }
    };

    const renderContent = () => {
        switch (activeView) {
            case 'addRestaurant':
                return <AddRestaurantForm />;
            case 'editRestaurant':
                return <EditRestaurantForm />;
            case 'deleteRestaurant':
                return <DeleteRestaurantForm />;
            case 'addEmployee':
                return <AddEmployeeForm />;
            case 'deleteUser':
                return <DeleteUserForm />
          default:
            return <p></p>;
        }
      };

    return (
        <div>
        {!isLoggedIn && (
            <div>
            <input
                className="admin-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="admin-login"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hasło"
            />
            <button onClick={handleLogin}>Zaloguj</button>
            </div>
        )}
        {isLoggedIn && (
        <nav>
          <ul>
            <li><button onClick={() => setActiveView('addRestaurant')}>Dodaj restauracje</button></li>
            <li><button onClick={() => setActiveView('editRestaurant')}>Edytuj restaraucje</button></li>
            <li><button onClick={() => setActiveView('deleteRestaurant')}>Usuń restauracje</button></li>
            <li><button onClick={() => setActiveView('addEmployee')}>Dodaj pracownika</button></li>
            <li><button onClick={() => setActiveView('deleteUser')}>Usuń użytkownika</button></li>
          </ul>
        </nav>
      )}
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminPanel;
