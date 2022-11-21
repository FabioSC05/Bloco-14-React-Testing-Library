import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const more = 'More details';

describe('07.Teste o componente PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do pokémon selecionado estão na tela', () => {
    renderWithRouter(<App />);
    const { name, summary } = pokemons[0];
    const pokeLink = screen.getByRole('link', { name: more });
    userEvent.click(pokeLink);
    const details = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(details).toBeInTheDocument();
    expect(pokeLink).not.toBeInTheDocument();
    const pokeSummary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(pokeSummary).toBeInTheDocument();
    const pokeText = screen.getByText(summary);
    expect(pokeText).toBeInTheDocument();
  });
  test('Teste se existe na página os mapas contendo as localizações', () => {
    renderWithRouter(<App />);
    const { name, foundAt } = pokemons[0];
    const pokeLink = screen.getByRole('link', { name: more });
    userEvent.click(pokeLink);
    const local = screen.getByRole('heading', { name: `Game Locations of ${name}`,
      level: 2 });
    expect(local).toBeInTheDocument();
    const maps = screen.getAllByRole('img', { name: /location/ });
    expect(maps).toHaveLength(foundAt.length);
    foundAt.forEach((ele, ind) => {
      const localName = screen.getByText(ele.location);
      const localImage = screen.getAllByRole('img', { name: `${name} location` });
      expect(localName).toBeInTheDocument();
      expect(localImage[ind]).toBeInTheDocument();
      expect(localImage[ind].src).toBe(ele.map);
      expect(localImage[ind].alt).toBe(`${name} location`);
    });
  });
  test('Teste se é possível favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const { name } = pokemons[0];
    const pokeLink = screen.getByRole('link', { name: more });
    userEvent.click(pokeLink);
    const pokeCheck = screen.getByRole('checkbox');
    expect(pokeCheck).toBeInTheDocument();
    userEvent.click(pokeCheck);
    act(() => {
      history.push('/favorites');
    });
    const pokeName = screen.getByText(name);
    expect(pokeName).toBeInTheDocument();
    act(() => {
      history.goBack();
    });
    const pokeLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(pokeLabel).toBeInTheDocument();
  });
});
