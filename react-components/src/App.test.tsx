import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router';
import { data } from './Data';

describe('Route and component tests', () => {
  test('Test HomePage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const home = screen.getByTestId('1');
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
    expect(screen.getByTestId('1')).toBeInTheDocument();
    userEvent.click(btnAbout);
    expect(screen.getByText(/гитхаб/i)).toBeInTheDocument();
    userEvent.click(btnHome);
    expect(screen.getByTestId('1')).toBeInTheDocument();
  });

  test('Test page not found', () => {
    render(
      <MemoryRouter initialEntries={['/dasdas']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Упс/i)).toBeInTheDocument();
  });

  test('Test change card state', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('open-2').className).toEqual('card-notSelected');
    userEvent.click(screen.getByTestId('open-2'));
    expect(screen.getByTestId('open-2').className).toEqual('card-selected');
    userEvent.click(screen.getByTestId('open-2'));
    expect(screen.getByTestId('open-2').className).toEqual('card-notSelected');
  });

  test('Test all cards render', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryAllByTitle('card').length).toEqual(data.length);
  });
});
