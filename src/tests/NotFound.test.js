import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Ao acesar o componente NotFound', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found', () => {
    // Acessar
    renderWithRouter(<NotFound />);

    // Agir
    // act(() => {
    //   history.push('/testing');
    // });

    const titleNotFound = screen.getByRole('heading', { name: /not found/i, level: 2 });

    // Aferir
    expect(titleNotFound).toBeInTheDocument();
  });

  test('Se Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    // Acessar
    renderWithRouter(<NotFound />);
    // const notFoundImage = screen.getByRole('img', { name: /pikachu crying/i });
    const notFoundImage2 = screen.getByAltText(/pikachu crying/i);

    // Aferir
    expect(notFoundImage2).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // Aferir
    // expect(notFoundImage).toBeInTheDocument();
  });
});
