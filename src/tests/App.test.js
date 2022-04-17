import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa component App', () => {
  test('Verifica se há três links e se estão funcionando corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const headingHome = screen.getByRole('link', { name: /home/i });
    expect(headingHome).toBeInTheDocument();

    const headingAbout = screen.getByRole('link', { name: /about/i });
    expect(headingAbout).toBeInTheDocument();

    const headingFavoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(headingFavoritePokemons).toBeInTheDocument();

    userEvent.click(headingHome);
    expect(history.location.pathname).toBe('/');
    userEvent.click(headingAbout);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(headingFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/whoareyou?');

    const headingNotFound = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(headingNotFound).toBeInTheDocument();
  });
});
