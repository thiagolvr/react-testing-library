import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa componente Pokemon', () => {
  test('Verifica se é renderizado um card com as informações de um pokémon',
    () => {
      renderWithRouter(<App />);

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent('Pikachu');

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent('Electric');

      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

      const img = screen.getByAltText(/pikachu sprite/i);
      expect(img).toBeInTheDocument();
      expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

  test('Verifica o funcionamento do link More details', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Verifica se o pokemon está favoritado', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const favoriteCheckbox = screen
      .getByRole('checkbox', { name: /pokémon favoritado?/i });
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);

    const favorited = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favorited).toBeInTheDocument();
    expect(favorited.src).toBe('http://localhost/star-icon.svg');
  });
});
