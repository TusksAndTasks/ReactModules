import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test select element', () => {
  test('Test correct select input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByText('Выберите регион') as HTMLSelectElement;
    const submit = screen.getByText('Создать');
    const label = screen.getByTestId('location');
    const region = screen.getByText('Ростов');
    userEvent.click(region);
    userEvent.click(submit);
    setTimeout(() => {
      expect(input.value).toEqual('Rostov');
      expect(label.textContent).toEqual('');
    }, 0);
  });

  test('Test empty select input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByText('Выберите регион') as HTMLSelectElement;
    const submit = screen.getByText('Создать');
    const label = screen.getByTestId('location');
    userEvent.click(submit);
    setTimeout(() => {
      expect(input.value).toEqual('');
      expect(label.textContent).toEqual('');
    }, 0);
  });
});
