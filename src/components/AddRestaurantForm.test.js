import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AddRestaurantForm from './AddRestaurantForm';

jest.mock('axios', () => ({
  post: jest.fn()
}));

describe('AddRestaurantForm', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('allows entering data into form fields', () => {
    render(<AddRestaurantForm />);

    const nameInput = screen.getByPlaceholderText('Nazwa');
    const cityInput = screen.getByPlaceholderText('Miasto');
    const addressInput = screen.getByPlaceholderText('Adres');
    const phoneInput = screen.getByPlaceholderText('Telefon');
    const openingTimeInput = screen.getByPlaceholderText('Godzina otwarcia');
    const closingTimeInput = screen.getByPlaceholderText('Godzina zamknięcia');

    fireEvent.change(nameInput, { target: { value: 'Test Restaurant' } });
    fireEvent.change(cityInput, { target: { value: 'Test City' } });
    fireEvent.change(addressInput, { target: { value: 'Test Address' } });
    fireEvent.change(phoneInput, { target: { value: '123456789' } });
    fireEvent.change(openingTimeInput, { target: { value: '08:00' } });
    fireEvent.change(closingTimeInput, { target: { value: '22:00' } });

    expect(nameInput.value).toBe('Test Restaurant');
    expect(cityInput.value).toBe('Test City');
    expect(addressInput.value).toBe('Test Address');
    expect(phoneInput.value).toBe('123456789');
    expect(openingTimeInput.value).toBe('08:00');
    expect(closingTimeInput.value).toBe('22:00');
  });

  test('validates form data before submission', () => {
    render(<AddRestaurantForm />);

    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(axios.post).not.toHaveBeenCalled();
  });

  test('submits the form with correct data', () => {
    render(<AddRestaurantForm />);

    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));

    const nameInput = screen.getByPlaceholderText('Nazwa');
    const cityInput = screen.getByPlaceholderText('Miasto');
    const addressInput = screen.getByPlaceholderText('Adres');
    const phoneInput = screen.getByPlaceholderText('Telefon');
    const openingTimeInput = screen.getByPlaceholderText('Godzina otwarcia');
    const closingTimeInput = screen.getByPlaceholderText('Godzina zamknięcia');
    const submitButton = screen.getByRole('button');

    fireEvent.change(nameInput, { target: { value: 'Test Restaurant' } });
    fireEvent.change(cityInput, { target: { value: 'Test City' } });
    fireEvent.change(addressInput, { target: { value: 'Test Address' } });
    fireEvent.change(phoneInput, { target: { value: '123456789' } });
    fireEvent.change(openingTimeInput, { target: { value: '08:00' } });
    fireEvent.change(closingTimeInput, { target: { value: '22:00' } });
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/admin/restaurants/create', {
      name: 'Test Restaurant',
      city: 'Test City',
      address: 'Test Address',
      phone: '123456789',
      openingTime: '08:00',
      closingTime: '22:00'
    });
  });
});
