import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa component FavoritePokemons', () => {
  test('Verifica se exibe os cards dos pokemons, ou exibe uma mensagem caso não tenha',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/favorites');

      const notFavoritedMessage = screen.getByText(/no favorite pokemon found/i);
      expect(notFavoritedMessage).toBeInTheDocument();

      history.push('/');

      const moreDetails = screen.getByRole('link', { name: /more details/i });
      expect(moreDetails).toBeInTheDocument();

      userEvent.click(moreDetails);
      const checkbox = screen.getByText(/Pokémon favoritado?/i);
      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);

      history.push('/favorites');

      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });
});
