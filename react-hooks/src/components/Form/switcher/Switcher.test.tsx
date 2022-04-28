import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test switcher element', () => {
  test('Test switch input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByTestId('switcher') as HTMLInputElement;
    userEvent.click(input);
    expect(input.checked).toEqual(true);
  });
});
