import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import planetsAPI from './helpers/MockPlanets'
import MockFetch from './helpers/MockFetch'

describe('Form coverage' , () => {
  it('Verifique se os inputs são renderizados corretamente' , async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(planetsAPI),
    }));
    render(<App />);
    await waitForElementToBeRemoved(() =>
    screen.getByText(/Carregando.../i),
    )
    
    expect( await screen.findByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
  })
 
})

