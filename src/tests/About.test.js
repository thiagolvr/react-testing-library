import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Testa component About', () => {
  test('Testa se a página contém as informações sobre a Pokédex',
    () => {
      renderWithRouter(<About />);

      const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
      expect(heading).toBeInTheDocument();

      const paragraph = screen.getAllByText(/pokémons/i);
      expect(paragraph).toHaveLength(2);

      const img = screen.getByAltText(/pokédex/i);
      expect(img).toBeInTheDocument();
      expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
