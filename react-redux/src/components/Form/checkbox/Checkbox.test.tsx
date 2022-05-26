import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test checkbox element', () => {
  test('Test unchecked input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByTestId('submit-btn');
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.getByTestId('open').textContent).toEqual('You must confirm charachter creation!');
  });

  test('Test checked input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByTestId('open-input') as HTMLInputElement;
    const submit = screen.getByTestId('submit-btn');
    userEvent.click(input);
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(input.checked).toEqual(true);
    expect(screen.queryByTestId('open')).toBeNull();
  });
});
