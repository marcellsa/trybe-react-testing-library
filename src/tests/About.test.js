import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Ao acesar o componente About', () => {
  test('Se a página contém as informações sobre a Pokédex', () => {
    // Acessar
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: /about/i });

    // Aferir
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    // Acessar
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    // Aferir
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // Acessar
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);

    // Aferir
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Se a página contém a seguinte imagem de uma Pokédex', () => {
    // Acessar
    renderWithRouter(<About />);
    const aboutImage = screen.getByAltText(/Pokédex/i);

    // Aferir
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// Acessar
// Agir
// Aferir
