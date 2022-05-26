import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test select element', () => {
  test('Test correct select input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByTestId('select-input') as HTMLSelectElement;
    const submit = screen.getByTestId('submit-btn');
    userEvent.selectOptions(input, 'Hell');
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.queryByTestId('location')).toBeNull();
  });

  test('Test empty select input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByTestId('select-input') as HTMLSelectElement;
    const submit = screen.getByTestId('submit-btn');
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(input.value).toEqual('');
    expect(screen.queryByTestId('location')?.textContent).toEqual(
      'You must set an origin location!'
    );
  });
});
