import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AdminPanel from './AdminPanel';

jest.mock('axios', () => ({
  post: jest.fn()
}));

describe('AdminPanel', () => {
  test('displays login form when not logged in', () => {
    render(<AdminPanel />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Hasło')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Zaloguj' })).toBeInTheDocument();
  });

  test('allows user to log in', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(<AdminPanel />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Hasło'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

    await waitFor(() => expect(screen.queryByText('Zaloguj')).not.toBeInTheDocument());
  });

  test('renders different forms based on activeView', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(<AdminPanel />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Hasło'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

    await waitFor(() => screen.getByText('Dodaj restauracje'));

    fireEvent.click(screen.getByText('Dodaj restauracje'));
    expect(screen.getByText('Dodaj restauracje')).toBeInTheDocument();
  });

  test('renders delete user form when activeView is set to "deleteUser"', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
  
    render(<AdminPanel />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Hasło'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));
  
    await waitFor(() => screen.getByText('Dodaj restauracje'));

    fireEvent.click(screen.getByText('Usuń użytkownika'));
    expect(screen.getByText('Usuń użytkownika')).toBeInTheDocument();
  });
});


