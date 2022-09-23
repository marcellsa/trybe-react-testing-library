import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao acesar o componente Pokedex', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    // Acessar
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2 });

    // Aferir
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('Se o botão deve conter o texto Próximo pokémon', () => {
    // Acessar
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    // Agir
    userEvent.click(nextPokemonBtn);
    const charmanderSprite = screen.getByRole('img', { name: /charmander sprite/i });

    // Aferir
    expect(nextPokemonBtn).toBeInTheDocument();
    expect(charmanderSprite).toBeInTheDocument();
  });

  test(`Se os próximos pokémons da lista devem ser mostrados, 
  um a um, ao clicar sucessivamente no botão;`, () => {
    // Acessar
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(nextPokemonBtn);
    const charmanderSprite = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmanderSprite).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const caterpieSprite = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(caterpieSprite).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const ekansSprite = screen.getByRole('img', { name: /ekans sprite/i });
    expect(ekansSprite).toBeInTheDocument();
  });

  test(`Se o primeiro pokémon da lista deve ser mostrado ao clicar no botão, 
  se estiver no último pokémon da lista`, () => {
    // Acessar
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    // Agir
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    const dragonair = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(dragonair).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const pikachuSprite = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuSprite).toBeInTheDocument();
  });

  test('Se é mostrado apenas um pokémon por vez', () => {
    // Acessar
    const NUMBER_IMAGE = 1;
    renderWithRouter(<App />);
    const oneImage = screen.getAllByRole('img');
    expect(oneImage.length).toBe(NUMBER_IMAGE);

    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonBtn);

    const oneImageNextPokemon = screen.getAllByRole('img');
    expect(oneImageNextPokemon.length).toBe(NUMBER_IMAGE);
  });

  test(`Se existe um botão de filtragem para cada tipo de pokémon, 
  sem repetição`, () => {
    // Acessar
    const NUMBER_TYPE_BUTTONS = 7;
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(NUMBER_TYPE_BUTTONS);
  });

  test(`Se a partir da seleção de um botão de tipo, a Pokédex deve circular 
  somente pelos pokémons daquele tipo`, () => {
    // Acessar
    renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', { name: /fire/i });

    // Agir
    userEvent.click(buttonFire);
    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toBeInTheDocument();

    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonBtn);
    const rapidash = screen.getByRole('img', { name: /rapidash sprite/i });
    expect(rapidash).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    expect(charmander).toBeInTheDocument();
  });

  test('Se o texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    // Acessar
    renderWithRouter(<App />);
    const buttonPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(buttonPsychic).toBeInTheDocument();

    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    expect(buttonDragon).toBeInTheDocument();
  });

  test('Se o botão All precisa estar sempre visível.', () => {
    // Acessar
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    // Agir
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonBtn);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    expect(buttonAll).toBeInTheDocument();
  });

  test(`Se a Pokedéx deverá mostrar os pokémons normalmente (sem filtros) 
  quando o botão All for clicado`, () => {
    // Acessar
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    // Agir
    const buttonPoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(buttonPoison);
    expect(buttonPoison).toBeInTheDocument();

    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    expect(buttonFire).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pikachuSprite = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuSprite).toBeInTheDocument();

    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonBtn);

    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toBeInTheDocument();
  });
});
