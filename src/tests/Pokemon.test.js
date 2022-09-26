import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao acesar o componente Pokemon', () => {
  test('Se o nome correto do pokémon deve ser mostrado na tela', () => {
    // Acessar
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);

    // Aferir
    expect(pokemonName).toBeInTheDocument();
  });

  test('Se o tipo correto do pokémon deve ser mostrado na tela', () => {
    // Acessar
    const PIKACHU_TYPE = 'Electric';
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');

    // Aferir
    expect(pokemonType.textContent).toBe(PIKACHU_TYPE);
  });

  test(`Se o peso médio do pokémon deve ser exibido com um texto no formato
   Average weight: <value> <measurementUnit>`, () => {
    // Acessar
    const PIKACHU_WEIGHT = 'Average weight: 6.0 kg';
    const CATERPIE_WEIGHT = 'Average weight: 2.9 kg';
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonWeight.textContent).toBe(PIKACHU_WEIGHT);
    // AGIR
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);

    // Aferir
    expect(pokemonWeight.textContent).toBe(CATERPIE_WEIGHT);
  });

  test(`Se a imagem do pokémon deve ser exibida. Ela deve conter um atributo 
  src com a URL da imagem e um atributo alt com o texto <name> sprite, 
  onde <name> é o nome do pokémon`, () => {
    // Acessar
    const CATERPIE_SRC = 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png';
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    // AGIR
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);

    // Aferir
    const caterpieAlt = screen.getByAltText('Caterpie sprite');
    expect(caterpieAlt.src).toBe(CATERPIE_SRC);
  });

  test(`Se ao clicar no link de navegação do pokémon, é feito o redirecionamento da 
  aplicação para a página de detalhes de pokémon`, () => {
    // Acessar
    renderWithRouter(<App />);
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    // AGIR
    userEvent.click(buttonMoreDetails);

    // Aferir
    const detailsTitle = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(detailsTitle).toBeInTheDocument();
  });

  test(`Se a URL exibida no navegador muda para /pokemon/<id>, onde <id> 
  é o id do pokémon cujos detalhes se deseja ver`, () => {
    // Acessar
    const PIKUACHU_URL = '/pokemons/25';
    const { history } = renderWithRouter(<App />);
    const buttonMoreDetails = screen.getByRole('link', { name: /more details/i });

    // AGIR
    userEvent.click(buttonMoreDetails);

    // Aferir
    expect(history.location.pathname).toBe(PIKUACHU_URL);
    // const homeTitle = screen
    //   .getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    // expect(homeTitle).toBeInTheDocument();
  });
});
