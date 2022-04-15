import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test date-input element', () => {
  test('Test empty date input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByText('Создать');
    userEvent.click(submit);
    setTimeout(() => {
      expect(screen.getByText('Вы должны указать дату проведения!')).toBeInTheDocument;
    }, 0);
  });

  test('Test correct date input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByTestId('date-input') as HTMLInputElement;
    const submit = screen.getByText('Создать');
    const label = screen.getByTestId('date');
    fireEvent.change(input, { target: { value: '2022-04-15' } });
    userEvent.click(submit);
    expect(input.value).toEqual('2022-04-15');
    setTimeout(() => {
      expect(label.textContent).toEqual('');
    }, 0);
  });
});
