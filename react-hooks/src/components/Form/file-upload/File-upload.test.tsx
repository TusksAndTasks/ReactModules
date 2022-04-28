import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Form from '../Form';

describe('Test file-uploader element', () => {
  test('Test empty input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByTestId('submit-btn');

    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.getByTestId('file').textContent).toEqual('You must set a picture!');
  });

  test('Test image input', async () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    const submit = screen.getByTestId('submit-btn');
    const uploader = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['img'], 'img.png', { type: 'image/png' });

    if (!URL.createObjectURL) {
      URL.createObjectURL = () => {
        return `C://fakepath//${file.name}`;
      };
    }

    userEvent.upload(uploader, file);
    userEvent.click(submit);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.queryByTestId('file')).toBeNull();
  });
});
