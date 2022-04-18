import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });

  test('Verifica se os detalhes do pokemon aparecem', () => {
    const pokemonName = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonName).toBeInTheDocument();

    const pokemonDetailsTitle = screen
      .getByRole('heading', { name: /summary/i, level: 2 });
    expect(pokemonDetailsTitle).toBeInTheDocument();

    const pokemonDetailsParagraph = screen.getByText(/this intelligent pokémon/i);
    expect(pokemonDetailsParagraph).toBeInTheDocument();
  });

  test('Verifica se renderiza a localização do pokemon', () => {
    const pokemonLocationTitle = screen
      .getByRole('heading', { name: /game locations of pikachu/i });
    expect(pokemonLocationTitle).toBeInTheDocument();

    const pokemonLocationImg = screen.getAllByAltText(/pikachu location/i);
    expect(pokemonLocationImg).toHaveLength(2);
    expect(pokemonLocationImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocationImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const pokemonLocationText1 = screen.getByText(/kanto viridian forest/i);
    expect(pokemonLocationText1).toBeInTheDocument();

    const pokemonLocationText2 = screen.getByText(/kanto power plant/i);
    expect(pokemonLocationText2).toBeInTheDocument();
  });

  test('Verifica se o pokemon pode ser favoritado', () => {
    const favoriteCheckbox = screen
      .getByRole('checkbox', { name: /pokémon favoritado?/i });
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);

    const favorited = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favorited).toBeInTheDocument();
  });
});
