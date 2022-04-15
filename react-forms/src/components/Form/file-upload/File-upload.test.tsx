import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test file-uploader element', () => {
  test('Test empty input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const label = screen.getByTestId('file');
    const submit = screen.getByText('Создать');

    userEvent.click(submit);
    setTimeout(() => {
      expect(label.textContent).toEqual('Вы должны добавить изображение!');
    }, 0);
  });

  test('Test image input', () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const label = screen.getByTestId('file');
    const submit = screen.getByText('Создать');
    const uploader = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['img'], 'img.png', { type: 'image/png' });

    if (!URL.createObjectURL) {
      URL.createObjectURL = () => {
        return `C://fakepath//${file.name}`;
      };
    }

    userEvent.upload(uploader, file);
    userEvent.click(submit);
    setTimeout(() => {
      expect(label.textContent).toEqual('');
    }, 0);
  });
});
