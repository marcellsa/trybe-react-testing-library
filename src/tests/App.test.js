import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao acesar o componente App', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    // Acessar
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: 'Home' });

    // Aferir
    expect(firstLink).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    // Acessar
    renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: /about/i });

    // Aferir
    expect(secondLink).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    // Acessar
    renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: /favorite pokémons/i });

    // Aferir
    expect(thirdLink).toBeInTheDocument();
  });

  test('Ao clicar em Home, é redirecionado para a página inicial', () => {
    // Acessar
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    // Agir
    userEvent.click(homeLink);

    // Aferir
    expect(history.location.pathname).toBe('/');
    const homeTitle = screen
      .getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(homeTitle).toBeInTheDocument();
  });

  test('Ao clicar em About, é redirecionado para a página about', () => {
    // Acessar
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    // Agir
    userEvent.click(aboutLink);

    // Aferir
    expect(history.location.pathname).toBe('/about');
    expect(aboutLink).toBeInTheDocument();
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Ao clicar em Favorite Pokémons, é redirecionado para a página favorite', () => {
    // Acessar
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    // Agir
    userEvent.click(favoriteLink);

    // Aferir
    expect(history.location.pathname).toBe('/favorites');
    expect(favoriteLink).toBeInTheDocument();
    const favoriteTitle = screen
      .getByRole('heading', { name: 'Favorite pokémons', level: 2 });
    expect(favoriteTitle).toBeInTheDocument();
  });

  test('Ao entrar numa URL desconhecida, é redirecionado para a página Not Found', () => {
    // Acessar
    const { history } = renderWithRouter(<App />);

    // Agir
    history.push('/xablau');

    // const titleNotFound = screen.getByRole('heading', { name: /not found/i, level: 2 });
    const image = screen.getByRole('img');

    // Aferir
    // expect(titleNotFound).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});

// Acessar
// Agir
// Aferir
