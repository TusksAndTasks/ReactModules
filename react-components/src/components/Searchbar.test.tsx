import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from './Searchbar';

interface Storage {
  [key: string]: string;
}

function mockStorageCreator() {
  let storage: Storage = {};

  return {
    getItem: function (key: string) {
      return storage[key] || null;
    },
    setItem: function (key: string, value: string) {
      storage[key] = value;
    },
    clear: function () {
      storage = {};
    },
  };
}

const mockLocalStorage = mockStorageCreator();

describe('Searchbar tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });

  test('Input test', () => {
    render(<Searchbar />);
    const search = screen.getByPlaceholderText('поиск') as HTMLInputElement;
    fireEvent.change(search, { target: { value: 'test-string' } });
    expect(search.value).toEqual('test-string');
  });

  test('Input save LocalStorage test', () => {
    const { unmount } = render(<Searchbar />);
    const search = screen.getByPlaceholderText('поиск') as HTMLInputElement;
    fireEvent.change(search, { target: { value: 'test-string' } });
    unmount();
    expect(mockLocalStorage.getItem('search-bar')).toEqual('test-string');
    mockLocalStorage.clear();
  });

  test('Input value from LocalStorage', () => {
    mockLocalStorage.setItem('search-bar', 'test-string');
    render(<Searchbar />);
    const search = screen.getByPlaceholderText('поиск') as HTMLInputElement;
    expect(search.value).toEqual('test-string');
  });
});
