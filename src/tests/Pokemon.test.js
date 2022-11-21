import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const more = 'More details';

describe('06.Teste o componente Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const { name, type, averageWeight, image } = pokemons[0];
    const { value, measurementUnit } = averageWeight;
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe(name);
    expect(pokeName).toBeInTheDocument();
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe(type);
    expect(pokeType).toBeInTheDocument();
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeWeight).toBeInTheDocument();
    const pokeImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokeImage.src).toBe(image);
    expect(pokeImage.alt).toBe(`${name} sprite`);
    expect(pokeImage).toBeInTheDocument();
  });
  test('Teste se o card do pokémon indicado na Pokédex contém o link correto', () => {
    renderWithRouter(<App />);
    const { id } = pokemons[0];
    const pokeLink = screen.getByRole('link', { name: more });
    expect(pokeLink.href).toBe(`http://localhost/pokemons/${id}`);
    expect(pokeLink).toBeInTheDocument();
  });
  test('Teste se ao clicar no link de navegação é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemons[0];
    const pokeLink = screen.getByRole('link', { name: more });
    userEvent.click(pokeLink);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
  test('Teste também se a URL exibida no navegador muda para a específica', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemons[0];
    expect(history.location.pathname).toBe('/');
    const pokeLink = screen.getByRole('link', { name: more });
    userEvent.click(pokeLink);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const { name } = pokemons[0];
    const pokeLink = screen.getByRole('link', { name: more });
    userEvent.click(pokeLink);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const pokeStar = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(pokeStar.src).toBe('http://localhost/star-icon.svg');
    expect(pokeStar.alt).toBe(`${name} is marked as favorite`);
    expect(pokeStar).toBeInTheDocument();
  });
});
