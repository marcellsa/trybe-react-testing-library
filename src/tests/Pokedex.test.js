import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';

const favoritesList = [{
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
},
];
const pokemonsList = [
  {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: '{measurementUnit: "kg", value: "8.5"}',
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: '[{…}, {…}, {…}, {…}]',
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: '{measurementUnit: "kg", value: "2.9"}',
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: '[{…}, {…}, {…}, {…}]',
    summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: '{measurementUnit: "kg", value: "6.9"}',
    image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: '[{…}]',
    summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: '{measurementUnit: "kg", value: "48.0"}',
    image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    foundAt: '[{…}]',
    summary: 'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: '{measurementUnit: "kg", value: "4.0"}',
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
    foundAt: '[{…}]',
    summary: 'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: '{measurementUnit: "kg", value: "95.0"}',
    image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
    foundAt: '[{…}, {…}]',
    summary: 'At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: '{measurementUnit: "kg", value: "460.0"}',
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: '[{…}]',
    summary: 'What sounds like its cry may actually be its snores or the rumblings of its hungry belly.',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: '{measurementUnit: "kg", value: "16.5"}',
    image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: '[{…}, {…}]',
    summary: 'They say that if it emits an aura from its whole body, the weather will begin to change instantly.',
  },
];

describe('Ao acesar o componente Pokedex', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    // Acessar
    renderWithRouter(<Pokedex
      pokemons={ pokemonsList }
      isPokemonFavoriteById={ favoritesList }
    />);
    const pokedexTitle = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2 });

    // Aferir
    expect(pokedexTitle).toBeInTheDocument();
  });

  test(`Se é exibido o próximo pokémon da lista quando o botão Próximo pokémon 
  é clicado`, () => {
    // Acessar
    renderWithRouter(<Pokedex
      pokemons={ pokemonsList }
      isPokemonFavoriteById={ favoritesList }
    />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    // Agir
    userEvent.click(nextPokemonBtn);
    const nextPokemon = screen.getByRole('img', { name: /charmander sprite/i });

    // Aferir
    expect(nextPokemonBtn).toBeInTheDocument();
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    // Acessar
    renderWithRouter(<Pokedex
      pokemons={ pokemonsList }
      isPokemonFavoriteById={ favoritesList }
    />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const firstPokemon = screen.getByRole('img', { name: /pikachu sprite/i });

    // Agir
    userEvent.click(nextPokemonBtn);
    userEvent.click(buttonAll);

    // Aferir
    expect(buttonAll).toBeInTheDocument();
    expect(firstPokemon).toBeInTheDocument();
  });
});
