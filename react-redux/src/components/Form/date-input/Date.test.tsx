import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test date-input element', () => {
  test('Test empty date input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByTestId('submit-btn');
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.getByText('You must set an origin location!')).toBeInTheDocument();
  });

  test('Test correct date input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByTestId('date-input') as HTMLInputElement;
    const submit = screen.getByTestId('submit-btn');
    fireEvent.change(input, { target: { value: '2022-04-15' } });
    userEvent.click(submit);
    expect(input.value).toEqual('2022-04-15');
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.queryByTestId('date')).toBeNull();
  });
});
