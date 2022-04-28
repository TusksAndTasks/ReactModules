import React from 'react';
import App from '../../App';
import { MemoryRouter } from 'react-router';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('API test', () => {
  const response = {
    info: {
      count: 107,
      next: 'https://rickandmortyapi.com/api/character/?page=2&name=rick',
      pages: 6,
      prev: 'https://rickandmortyapi.com/api/character/?page=0&name=rick',
    },
    results: [
      {
        created: '2017-11-04T22:28:13.756Z',
        episode: ['https://rickandmortyapi.com/api/episode/10'],
        gender: 'Male',
        id: 19,
        image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
        location: { name: 'unknown', url: '' },
        name: 'Antenna Rick',
        origin: { name: 'unknown', url: '' },
        species: 'Human',
        status: 'unknown',
        type: 'Human with antennae',
        url: 'https://rickandmortyapi.com/api/character/19',
      },
      {
        created: '2017-11-04T22:41:07.171Z',
        episode: [
          'https://rickandmortyapi.com/api/episode/10',
          'https://rickandmortyapi.com/api/episode/22',
          'https://rickandmortyapi.com/api/episode/28',
        ],
        gender: 'Male',
        id: 22,
        image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
        location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
        name: 'Aqua Rick',
        origin: { name: 'unknown', url: '' },
        species: 'Humanoid',
        status: 'unknown',
        type: 'Fish-Person',
        url: 'https://rickandmortyapi.com/api/character/22',
      },
      {
        created: '2017-11-30T11:28:06.461Z',
        episode: ['https://rickandmortyapi.com/api/episode/22'],
        gender: 'Male',
        id: 69,
        image: 'https://rickandmortyapi.com/api/character/avatar/69.jpeg',
        location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
        name: 'Commander Rick',
        origin: { name: 'unknown', url: '' },
        species: 'Human',
        status: 'Dead',
        type: '',
        url: 'https://rickandmortyapi.com/api/character/69',
      },
    ],
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((req) => {
      console.log(req);
      if (req === 'https:rickandmortyapi.com/api/character?name=Rick') {
        //тут изначально были опечатки в запросе, которые пусть и не ломали апи, но баги иногда иогли происходить, причем крайне редко и крайне странные. пришлось изменить строку в коде и соответсвенно здесь
        return Promise.resolve(new Response(JSON.stringify(response), { status: 200 }));
      } else {
        return Promise.resolve(new Response(null, { status: 404 }));
      }
    });
  });

  test('Test API-cards functional', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const search = screen.getByPlaceholderText('Search');
    act(() => {
      //из-за варнингов добавил act
      userEvent.type(search, 'Rick{enter}');
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 2000));

    expect(screen.getByTestId('69')).toBeInTheDocument();

    expect(screen.getAllByTestId('card').length).toEqual(3);

    userEvent.click(screen.getByTestId('69'));

    expect(screen.getByTestId('close')).toBeInTheDocument();
    (search as HTMLInputElement).value = ''; //Ввиду нового функционала (теперь при маунте домашней страницы происходит поиск по значению из окна поиска), потребовалось отчистить поиск перед анумунтом
  });

  test('Test wrong request search', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const search = screen.getByPlaceholderText('Search');
    act(() => {
      //из-за варнингов добавил act
      userEvent.type(search, 'Morty{enter}');
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 2000));

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
