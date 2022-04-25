import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from './Form';

describe('Test Form', () => {
  test('Test empty form input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByText('Создать');
    userEvent.click(submit);
    expect(screen.queryByTestId('card-0')).toBeNull();
  });

  test('Test correct created card and inputs reset', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByText('Создать');
    const nameInput = screen.getByText('Выберите регион') as HTMLSelectElement;
    const dateInput = screen.getByTestId('date-input') as HTMLInputElement;
    const openInput = screen.getByTestId('open-input') as HTMLInputElement;
    const commInput = screen.getByTestId('switcher') as HTMLInputElement;
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['img'], 'img.png', { type: 'image/png' });
    const region = screen.getByText('Ростов');

    if (!URL.createObjectURL) {
      URL.createObjectURL = () => {
        return `C://fakepath//${file.name}`;
      };
    }

    fireEvent.change(nameInput, { target: { value: 'Имя Фамилия' } });
    fireEvent.change(dateInput, { target: { value: '2022-04-15' } });
    userEvent.click(region);
    userEvent.click(openInput);
    userEvent.click(commInput);
    userEvent.upload(fileInput, file);
    userEvent.click(submit);

    setTimeout(() => {
      expect(screen.queryByTestId('card-0')).toBeInTheDocument();
      expect(nameInput.value).toEqual('');
      expect(commInput.checked).toEqual(false);
      expect(screen.getByText('Имя Фамилия')).toBeInTheDocument();
      expect(screen.getByText('Ростов-на-Дону')).toBeInTheDocument();
    }, 0);
  });

  test('Multiple created cards', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByText('Создать');
    const nameInput = screen.getByText('Выберите регион') as HTMLSelectElement;
    const dateInput = screen.getByTestId('date-input') as HTMLInputElement;
    const openInput = screen.getByTestId('open-input') as HTMLInputElement;
    const commInput = screen.getByTestId('switcher') as HTMLInputElement;
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['img'], 'img.png', { type: 'image/png' });
    const region1 = screen.getByText('Онлайн');
    const region2 = screen.getByText('Ростов');

    if (!URL.createObjectURL) {
      URL.createObjectURL = () => {
        return `C://fakepath//${file.name}`;
      };
    }

    fireEvent.change(nameInput, { target: { value: 'Мастер Чиф' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    userEvent.click(region1);
    userEvent.click(openInput);
    userEvent.click(commInput);
    userEvent.upload(fileInput, file);
    userEvent.click(submit);

    fireEvent.change(nameInput, { target: { value: 'Солид Снейк' } });
    fireEvent.change(dateInput, { target: { value: '2023-02-02' } });
    userEvent.click(region2);
    userEvent.click(openInput);
    userEvent.click(commInput);
    userEvent.upload(fileInput, file);
    userEvent.click(submit);

    setTimeout(() => {
      expect(screen.queryByTestId('card-0')).toBeInTheDocument();
      expect(screen.queryByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByText('Мастер Чиф')).toBeInTheDocument();
      expect(screen.getByText('Солид Снейк')).toBeInTheDocument();
      expect(screen.getByText('01.01.2023')).toBeInTheDocument();
      expect(screen.getByText('02.02.2023')).toBeInTheDocument();
      expect(screen.getByText('Ростов-на-Дону')).toBeInTheDocument();
      expect(screen.getByText('Онлайн')).toBeInTheDocument();
    }, 0);
  });
});
