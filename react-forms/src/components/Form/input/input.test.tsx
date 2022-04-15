import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test input element', () => {
  test('Test correct name input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Введите Ваши имя и фамилию') as HTMLInputElement;
    const submit = screen.getByText('Создать');
    const label = screen.getByTestId('name');
    fireEvent.change(input, { target: { value: 'Имя Фамилия' } });
    userEvent.click(submit);
    expect(input.value).toEqual('Имя Фамилия');
    expect(label.textContent).toEqual('');
  });

  test('Test too little information input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Введите Ваши имя и фамилию') as HTMLInputElement;
    const submit = screen.getByText('Создать');
    const label = screen.getByTestId('name');
    userEvent.click(submit);
    expect(label.textContent).toEqual('Вы должны указать имя и фамилию!');
    fireEvent.change(input, { target: { value: 'Имя' } });
    userEvent.click(submit);
    expect(label.textContent).toEqual('Вы должны указать имя и фамилию!');
  });

  test('Test too much information input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Введите Ваши имя и фамилию') as HTMLInputElement;
    const submit = screen.getByText('Создать');
    const label = screen.getByTestId('name');
    fireEvent.change(input, { target: { value: 'Имя Фамилия Отчество' } });
    userEvent.click(submit);
    expect(label.textContent).toEqual('Вы указали слишком много слов!');
  });
});
