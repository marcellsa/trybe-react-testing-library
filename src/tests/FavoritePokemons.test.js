import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

const favoriteFake = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    '{location: "Kanto Viridian Forest", map: "https://c…}',
    '{location: "Kanto Power Plant", map: "https://cdn2.…}',
  ],
  summary: `This intelligent Pokémon roasts hard berries with electricity to make 
  them tender enough to eat.`,
}];

describe('Ao acesar o componente FavoritePokemons', () => {
  test('Se é exibida na tela a mensagem No favorite pokemon found', () => {
    // Acessar
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFoundFavorite = screen.getByText(/No favorite pokemon found/i);

    // Aferir
    expect(notFoundFavorite).toBeInTheDocument();
  });

  test('Se são exibidos todos os cards de pokémons favoritados', () => {
    // Acessar
    renderWithRouter(<FavoritePokemons pokemons={ favoriteFake } />);
    const favoritePokemons = screen.getByRole('img', { name: /pikachu sprite/i });

    // Aferir
    expect(favoritePokemons).toBeInTheDocument();
  });
});
