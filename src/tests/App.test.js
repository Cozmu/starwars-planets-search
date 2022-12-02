import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import StarWarsProvider from '../context/StartWarsProvider';

afterEach(() => jest.clearAllMocks()); 

describe('Form coverage' , () => {
  it('Verifique se os inputs são renderizados corretamente' , async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(testData),
    // }));
    // global.fetch = jest.fn(async () => ({
    //   json: async () => testData
    // })); 
    render(<StarWarsProvider><App /></StarWarsProvider>);
    // await waitForElementToBeRemoved(() =>
    //   screen.queryByText(/Carregando.../i),
    // )
    await wait(async () => {
      expect(screen.queryByText('Tatooine')).toBeInTheDocument();
       expect(screen.queryByTestId('name-filter')).toBeInTheDocument();
       expect(screen.queryByTestId('column-filter')).toBeInTheDocument();
       expect(screen.queryByTestId('comparison-filter')).toBeInTheDocument();
       expect(screen.queryByTestId('value-filter')).toBeInTheDocument();
       expect(screen.queryByTestId('button-filter')).toBeInTheDocument();
       expect(screen.queryByTestId('column-sort')).toBeInTheDocument();
       expect(screen.queryByTestId('column-sort-input-asc')).toBeInTheDocument();
       expect(screen.queryByTestId('column-sort-input-desc')).toBeInTheDocument();
       expect(screen.queryByTestId('column-sort')).toBeInTheDocument();
       expect(screen.queryByTestId('column-sort-button')).toBeInTheDocument();
    })
    
  })
 
})

