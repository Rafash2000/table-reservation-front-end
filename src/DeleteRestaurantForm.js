import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/addRestaurant.css';

function DeleteRestaurantForm() {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantIdToDelete, setRestaurantIdToDelete] = useState('');

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:8081/admin/restaurants');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania restauracji:', error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleDeleteRestaurant = async (id) => {
        if (window.confirm("Czy na pewno chcesz usunąć tę restaurację?")) {
            try {
                await axios.put(`http://localhost:8081/admin/restaurants/disable/${id}`);
                alert('Restauracja została usunięta');
                fetchRestaurants();
            } catch (error) {
                console.error('Błąd podczas usuwania restauracji:', error);
            }
        }
    };

    const handleDeleteById = async () => {
        if (restaurantIdToDelete) {
            await handleDeleteRestaurant(restaurantIdToDelete);
            setRestaurantIdToDelete('');
        } else {
            alert("Proszę wprowadzić prawidłowe ID restauracji.");
        }
    };

    return (
        <div>
            <h2>Usuń restauracje</h2>
            <div>
                <input 
                    type="text" 
                    value={restaurantIdToDelete} 
                    onChange={e => setRestaurantIdToDelete(e.target.value)}
                    placeholder="Wprowadź ID restauracji do usunięcia" 
                />
                <button onClick={handleDeleteById}>Usuń po ID</button>
            </div>
            <div>
                {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="restaurant-box">
                        {restaurant.id}: {restaurant.name}
                        <button onClick={() => handleDeleteRestaurant(restaurant.id)}>Usuń</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeleteRestaurantForm;
