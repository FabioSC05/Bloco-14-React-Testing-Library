import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('03.Teste o componente FavoritePokemons.js', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const noFavorites = screen.getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText('More details');
    userEvent.click(details);
    const favorite = screen.getByText('Pokémon favoritado?');
    userEvent.click(favorite);
    act(() => {
      history.push('/favorites');
    });
    const favoritePokemon = screen.getByText('Pikachu');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
