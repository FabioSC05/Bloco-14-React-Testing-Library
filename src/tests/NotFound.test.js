import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';

describe('04.Teste o componente NotFound.js', () => {
  test('Teste se a página contem um H2 com o texto específico', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem específica', () => {
    render(<NotFound />);
    const image = screen.getByRole('img', { name: /Pikachu/ });
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
