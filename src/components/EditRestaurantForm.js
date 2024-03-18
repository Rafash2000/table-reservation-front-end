import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './/style/editRestaurant.css';


function EditRestaurantForm() {
    const [restaurants, setRestaurants] = useState([]);
    const [editingRestaurantId, setEditingRestaurantId] = useState(null);
    const [restaurantData, setRestaurantData] = useState({
        name: '',
        city: '',
        address: '',
        phone: '',
        openingTime: '',
        closingTime: '',
    });

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

    const handleEditClick = (restaurant) => {
        setEditingRestaurantId(restaurant.id);
        setRestaurantData(restaurant);
    };

    const handleInputChange = (e, field) => {
        setRestaurantData({ ...restaurantData, [field]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8081/admin/restaurants/${editingRestaurantId}`, restaurantData);
            alert('Zmiany zostały zapisane.');
            await fetchRestaurants();
            setEditingRestaurantId(null);
            setRestaurantData({ name: '', city: '', address: '', phone: '', openingTime: '', closingTime: '' });
        } catch (error) {
            console.error('Błąd podczas aktualizacji restauracji:', error);
        }
    };

    return (
        <div>
            <h2>Edytuj restauracje</h2>
            {restaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant-box">
                    <div onClick={() => handleEditClick(restaurant)}>
                        {restaurant.id}: {restaurant.name}
                    </div>
                    {editingRestaurantId === restaurant.id && (
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                value={restaurantData.name} 
                                onChange={e => handleInputChange(e, 'name')}
                                placeholder="Nazwa" 
                            />
                            <input 
                                type="text" 
                                value={restaurantData.city} 
                                onChange={e => handleInputChange(e, 'city')}
                                placeholder="Miasto" 
                            />
                            <input 
                                type="text" 
                                value={restaurantData.address} 
                                onChange={e => handleInputChange(e, 'address')}
                                placeholder="Adres" 
                            />
                            <input 
                                type="text" 
                                value={restaurantData.phone} 
                                onChange={e => handleInputChange(e, 'phone')}
                                placeholder="Telefon" 
                            />
                            <input 
                                type="text" 
                                value={restaurantData.openingTime} 
                                onChange={e => handleInputChange(e, 'openingTime')}
                                placeholder="Godzina otwarcia" 
                            />
                            <input 
                                type="text" 
                                value={restaurantData.closingTime} 
                                onChange={e => handleInputChange(e, 'closingTime')}
                                placeholder="Godzina zamknięcia" 
                            />
                            <button type="submit">Zapisz zmiany</button>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
}

export default EditRestaurantForm;
