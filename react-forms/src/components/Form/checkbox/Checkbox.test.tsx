import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test checkbox element', () => {
  test('Test unchecked input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const label = screen.getByTestId('open');
    const submit = screen.getByText('Создать');
    userEvent.click(submit);
    setTimeout(() => {
      expect(label.textContent).toEqual('Вы должны открыть проект!');
    }, 0);
  });

  test('Test checked input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByTestId('open-input') as HTMLInputElement;
    const submit = screen.getByText('Создать');
    const label = screen.getByTestId('open');
    userEvent.click(input);
    userEvent.click(submit);
    setTimeout(() => {
      expect(input.checked).toEqual(true);
      expect(label.textContent).toEqual('');
    }, 0);
  });
});
