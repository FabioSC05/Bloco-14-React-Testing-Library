import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const nextPoke = 'Próximo pokémon';

describe('05.Teste o componente Pokedex.js', () => {
  test('Teste se a página contem um H2 com o texto específico', () => {
    renderWithRouter(<App />);
    const head = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(head).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: nextPoke });
    expect(button).toBeInTheDocument();
    for (let index = 0; index < pokemons.length - 1; index += 1) {
      const pokemon = screen.getByText(pokemons[index].name);
      expect(pokemon).toBeInTheDocument();
      userEvent.click(button);
    }
    const lastPokemon = screen.getByText(pokemons[pokemons.length - 1].name);
    expect(lastPokemon).toBeInTheDocument();
    userEvent.click(button);
    const firstPokemon = screen.getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();
    const button = screen.getByRole('button', { name: nextPoke });
    userEvent.click(button);
    const secondPokemon = screen.getByText(pokemons[1].name);
    expect(secondPokemon).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    buttonType.forEach((button) => {
      expect(button).toBeInTheDocument();
      const clickType = pokemons.filter((ele) => ele.type === button.innerHTML);
      expect(button.innerHTML).toBe(clickType[0].type);
      userEvent.click(button);
      clickType.forEach(() => {
        const pokeType = screen.getByTestId('pokemon-type');
        expect(pokeType.innerHTML).toBe(button.innerHTML);
        const next = screen.getByRole('button', { name: nextPoke });
        userEvent.click(next);
      });
    });
    const all = screen.getByRole('button', { name: 'All' });
    userEvent.click(all);
    expect(all).toBeInTheDocument();
    expect(all).toBeEnabled();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();
    pokemons.forEach((poke) => {
      const pokeName = screen.getByTestId('pokemon-type');
      expect(pokeName.innerHTML).toBe(poke.type);
      const next = screen.getByRole('button', { name: nextPoke });
      userEvent.click(next);
    });
  });
});
