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
    const submit = screen.getByTestId('submit-btn'); //Изменения связаны с преименованием элементов
    userEvent.click(submit);
    expect(screen.queryByTestId('card-0')).toBeNull();
  });

  test('Test correct created card and inputs reset', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByTestId('submit-btn');
    const nameInput = screen.getByPlaceholderText("Enter character's name") as HTMLSelectElement;
    const dateInput = screen.getByTestId('date-input') as HTMLInputElement;
    const selectInput = screen.getByTestId('select-input') as HTMLSelectElement;
    const openInput = screen.getByTestId('open-input') as HTMLInputElement;
    const commInput = screen.getByTestId('switcher') as HTMLInputElement;
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['img'], 'img.png', { type: 'image/png' });

    if (!URL.createObjectURL) {
      URL.createObjectURL = () => {
        return `C://fakepath//${file.name}`;
      };
    }

    fireEvent.change(nameInput, { target: { value: 'Имя Фамилия' } });
    fireEvent.change(dateInput, { target: { value: '2022-04-15' } });
    userEvent.selectOptions(selectInput, 'Hell');
    userEvent.click(openInput);
    userEvent.click(commInput);
    userEvent.upload(fileInput, file);
    userEvent.click(submit);

    await new Promise((r) => setTimeout(r, 0)); //Ранее тесты были написаны неправильно, expect внутри сеттаймаута делает любые тесты успешными вне зависимости ни от чего. Тесты были переписаны в соответствии с правильным способом создания задержки в тестах.

    expect(commInput.checked).toEqual(false);
    expect(screen.getByText('Name: Имя Фамилия')).toBeInTheDocument();
    expect(screen.getByText('Hell')).toBeInTheDocument();
    expect(screen.queryByTestId('card-0')).toBeInTheDocument();
    expect(nameInput.value).toEqual('');
  });

  test('Multiple created cards', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByTestId('submit-btn');
    const nameInput = screen.getByPlaceholderText("Enter character's name") as HTMLSelectElement;
    const dateInput = screen.getByTestId('date-input') as HTMLInputElement;
    const selectInput = screen.getByTestId('select-input') as HTMLSelectElement;
    const openInput = screen.getByTestId('open-input') as HTMLInputElement;
    const commInput = screen.getByTestId('switcher') as HTMLInputElement;
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['img'], 'img.png', { type: 'image/png' });
    const file2 = new File(['img'], 'img.png', { type: 'image/png' });

    if (!URL.createObjectURL) {
      URL.createObjectURL = () => {
        return `C://fakepath//${file.name}`;
      };
    }

    fireEvent.change(nameInput, { target: { value: 'Мастер Чиф' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    userEvent.selectOptions(selectInput, 'Earth');
    userEvent.click(openInput);
    userEvent.click(commInput);
    userEvent.upload(fileInput, file);
    userEvent.click(submit);

    fireEvent.change(nameInput, { target: { value: 'Солид Снейк' } });
    fireEvent.change(dateInput, { target: { value: '2023-02-02' } });
    userEvent.selectOptions(selectInput, 'Hell');
    userEvent.click(openInput);
    userEvent.click(commInput);
    userEvent.upload(fileInput, file2);
    userEvent.click(submit);

    await new Promise((r) => setTimeout(r, 0));

    expect(screen.queryByTestId('card-0')).toBeInTheDocument();
    expect(screen.queryByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByText('Name: Мастер Чиф')).toBeInTheDocument();
    expect(screen.getByText('Name: Солид Снейк')).toBeInTheDocument();
    expect(screen.getByText('Birthday: 01.01.2023')).toBeInTheDocument();
    expect(screen.getByText('Birthday: 02.02.2023')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth')).toBeInTheDocument();
    expect(screen.getByText('Origin: Hell')).toBeInTheDocument();
  });
});
