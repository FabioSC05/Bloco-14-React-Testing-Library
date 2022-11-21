import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('01.Teste o componente App.js', () => {
  test('Teste se a aplicação é redirecionada para a Home ao ser clicada', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });
  test('Teste se a aplicação é redirecionada para o About ao ser clicada', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a aplicação é redirecionada para os Favoritos ao ser clicada', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Teste se a aplicação é redirecionada para Not Found', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemoninexistente');
    });
    await waitFor(() => expect(screen.getByText(/not found/i)).toBeInTheDocument());
  });
});
