import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './restaurant.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Twój URL API
    const apiUrl = 'http://localhost:8081/restaurants';

    // Pobieranie danych z API za pomocą Axios
    axios.get(apiUrl)
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Błąd pobierania danych z API:', error);
      });
  }, []);

  return (
    <div className="lista">
      {restaurants.map((restaurant) => (
        <a href={`restaurant/${restaurant.id}`} className="restauracja" key={restaurant.id}>
          <section className="nazwa_restauracja">
            <h4>{restaurant.name}</h4>
          </section>
          <section className="nazwa_reszta">
            <p>{restaurant.city}, {restaurant.address}</p>
            <p>{restaurant.phone}</p>
            <p>Godziny otwarcia: {restaurant.openingHours}</p>
          </section>
        </a>
      ))}
    </div>
  );
}

export default RestaurantList;
