import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

describe('02.Teste o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const pokedexInfo = screen.getByText(/about pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const pokedexH2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(pokedexH2).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const pokeParagraph1 = screen.getByText(/simulates a Pokédex/i);
    const pokeParagraph2 = screen.getByText(/filter Pokémons by type/i);
    expect(pokeParagraph1).toBeInTheDocument();
    expect(pokeParagraph2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    const png = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(png);
  });
});
