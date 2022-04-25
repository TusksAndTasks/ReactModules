import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router';

describe('Route and component tests', () => {
  test('Test HomePage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const home = screen.getByPlaceholderText('поиск');
    expect(home).toBeInTheDocument();
  });

  test('Test AboutPage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const btn = screen.getByText(/О нас/i);
    fireEvent.click(btn);
    const about = screen.getByText(/гитхаб/i);
    expect(about).toBeInTheDocument();
  });

  test('Test Return to HomePage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const btnAbout = screen.getByTestId('21');
    const btnHome = screen.getByText(/Главная/i);
    userEvent.click(btnHome);
    expect(screen.getByPlaceholderText('поиск')).toBeInTheDocument();
    userEvent.click(btnAbout);
    expect(screen.getByText(/гитхаб/i)).toBeInTheDocument();
    userEvent.click(btnHome);
    expect(screen.getByPlaceholderText('поиск')).toBeInTheDocument();
  });

  test('Test page not found', () => {
    render(
      <MemoryRouter initialEntries={['/dasdas']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Упс/i)).toBeInTheDocument();
  });
});
