import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa componente Pokedex', () => {
  test('Verifica se há o título do pokemon sendo renderizado e se há o botão de próximo',
    () => {
      renderWithRouter(<App />);

      const heading = screen
        .getByRole('heading', { level: 2, name: /encountered pokémons/i });
      expect(heading).toBeInTheDocument();

      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(buttonNext).toBeInTheDocument();
    });

  test('Verifica se só um pokemon é renderizado por vez', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(moreDetails).toHaveLength(1);
  });

  test(
    'Verifica se há um botão de filtro para cada um e a funcionalidade do botão próximo',
    () => {
      renderWithRouter(<App />);

      const buttons = screen.getAllByTestId('pokemon-type-button');
      const seven = 7;
      expect(buttons).toHaveLength(seven);

      const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextButton);
      const nextPokemon = screen.getByText(/charmander/i);
      expect(nextPokemon).toBeInTheDocument();

      const psychicBtn = screen.getByRole('button', { name: /psychic/i });
      userEvent.click(psychicBtn);
      const pokemonPsychic1 = screen.getByText(/alakazam/i);
      expect(pokemonPsychic1).toBeInTheDocument();
    },
  );

  test('Verifica se há o botão de reset e se está ativado', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    expect(allBtn).not.toBeDisabled();
  });
});
