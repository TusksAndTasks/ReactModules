import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test input element', () => {
  test('Test correct name input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Enter character's name") as HTMLInputElement;
    const submit = screen.getByTestId('submit-btn');
    fireEvent.change(input, { target: { value: 'Имя Фамилия' } });
    userEvent.click(submit);
    expect(input.value).toEqual('Имя Фамилия');
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.queryByTestId('name')).toBeNull();
  });

  test('Test too little information input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Enter character's name") as HTMLInputElement;
    const submit = screen.getByTestId('submit-btn');
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.getByTestId('name').textContent).toEqual('You must choose a name!');
    fireEvent.change(input, { target: { value: '' } });
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.getByTestId('name').textContent).toEqual('You must choose a name!');
  });

  test('Test too much information input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Enter character's name") as HTMLInputElement;
    const submit = screen.getByTestId('submit-btn');
    fireEvent.change(input, { target: { value: 'Имя Фамилия Отчество' } });
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.getByTestId('name').textContent).toEqual("You're using too many words!");
  });
});
