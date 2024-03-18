import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AddEmployeeForm from './AddEmployeeForm';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe('AddEmployeeForm', () => {
  test('allows entering email and restaurant ID', () => {
    render(<AddEmployeeForm />);

    const emailInput = screen.getByPlaceholderText('Adres email pracownika');
    const restaurantIdInput = screen.getByPlaceholderText('ID restauracji');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(restaurantIdInput, { target: { value: '123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(restaurantIdInput.value).toBe('123');
  });

  test('submits the form with email and restaurant ID', async () => {
    render(<AddEmployeeForm />);

    const emailInput = screen.getByPlaceholderText('Adres email pracownika');
    const restaurantIdInput = screen.getByPlaceholderText('ID restauracji');
    const submitButton = screen.getByRole('button', { name: /dodaj pracownika/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(restaurantIdInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/admin/employee', {
      email: 'test@example.com',
      restaurantId: '123'
    });
  });
});
