import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa component NotFound', () => {
  test('Verifica se há o texto e a imagem de erro', () => {
    renderWithRouter(<NotFound />);

    const heading = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();

    const img = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
