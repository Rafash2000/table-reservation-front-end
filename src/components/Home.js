import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './/style/restaurant.css';


function Home() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [newRestaurants, setNewRestaurants] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const apiUrlAll = 'http://localhost:8081/restaurants';
    const apiUrlNew = 'http://localhost:8081/restaurants/new';
    const apiUrlRecommended = 'http://localhost:8081/restaurants/recommend';

    const fetchAllRestaurants = async () => {
      try {
        const response = await axios.get(apiUrlAll);
        setAllRestaurants(response.data);
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error);
      }
    };

    const fetchNewRestaurants = async () => {
      try {
        const response = await axios.get(apiUrlNew);
        setNewRestaurants(response.data);
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error);
      }
    };

    const fetchRecommendedRestaurants = async () => {
      try {
        const response = await axios.get(apiUrlRecommended);
        setRecommendedRestaurants(response.data);
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error);
      }
    };

    fetchAllRestaurants();
    fetchNewRestaurants();
    fetchRecommendedRestaurants();
  }, []);

  useEffect(() => {
    const filtered = allRestaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, allRestaurants]);

  return (
    <><div className='tytul'><h1>REZERWACJA ONLINE</h1></div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <input
            type="text"
            placeholder="Wyszukaj restaurację"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', height: '2rem' }} />
        </div>
    <div className="main-container">
      <div className="restaurant-column" style={{ width: '33.33%' }}>
        <h2 style={{ textAlign: 'center', marginLeft: '0.6rem', width: '83.5%',backgroundColor: '#cda945' }}>Polecane restauracje</h2>
        {recommendedRestaurants.map((restaurant) => (
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
      <div className="restaurant-column" style={{ width: '33.33%' }}>
        <h2 style={{ textAlign: 'center', marginLeft: '0.6rem', width: '83.5%',backgroundColor: '#cda945' }}>Wszystkie restauracje</h2>
        
        {filteredRestaurants.map((restaurant) => (
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
      <div className="restaurant-column" style={{ width: '33.33%' }}>
        <h2 style={{ textAlign: 'center', marginLeft: '0.6rem', width: '83.5%',backgroundColor: '#cda945' }}>Nowe restauracje</h2>
        {newRestaurants.map((restaurant) => (
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
    </div></>
  );
}

export default Home;
