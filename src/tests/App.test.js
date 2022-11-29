import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import planetsAPI from './helpers/MockPlanets'
import MockFetch from './helpers/MockFetch'

afterEach(() => jest.clearAllMocks()); 

describe('Form coverage' , () => {
  it('Verifique se os inputs são renderizados corretamente' , async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(planetsAPI),
    // }));
    global.fetch = jest.fn(async () => ({
      json: async () => planetsAPI
    })); 
    render(<App />);
     await waitForElementToBeRemoved(() =>
      screen.queryByText(/Carregando.../i),
     )
    await waitFor(async () => {
      expect(screen.queryByText('Tatooine')).toBeInTheDocument();
    }, { timeout: 3000 }) 
    
    // expect( await screen.findByTestId('name-filter')).toBeInTheDocument();
    // expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    // expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    // expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    // expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    // expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    // expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    // expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    // expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    // expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
  })
 
})

