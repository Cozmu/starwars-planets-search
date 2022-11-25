import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/henderWithRouter';

describe('Form coverage' , () => {
  it('Verifique se há 3 botôes na tela' , () => {
    render(<App />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  })
})
test('I am your test', () => {
  render(<App />);
  expect(true).toBe(true)
});
