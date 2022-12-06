import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import StarWarsProvider from '../context/StartWarsProvider';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';

afterEach(() => jest.clearAllMocks()); 

describe('30% COVERAGE' , () => {

  it('Verifique se a uma tela de carregamento antes de aparecer as informações da página', () => {
    render(<StarWarsProvider><Home /></StarWarsProvider>);
    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
  })

  it('Verifique se os inputs são renderizados corretamente' , async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    render(<StarWarsProvider><Home /></StarWarsProvider>);

    await waitFor(async () => {
      expect(screen.queryByTestId('column-filter')).toBeInTheDocument();
      expect(screen.queryByTestId('name-filter')).toBeInTheDocument();
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

  it('Verifique se ao carregar a página o primeiro planeta e rederizado', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    render(<StarWarsProvider><Home /></StarWarsProvider>);

    await waitFor(async () => { 
      expect(screen.getByRole('cell', { name: /tatooine/i})).toBeInTheDocument();
    })
  })
  
  it('Verifique se e possivel digitar no campo de testo', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    render(<StarWarsProvider><Home /></StarWarsProvider>);

    await waitFor(async () => {
      const inputText = screen.getByTestId('name-filter');
      userEvent.type(inputText, 'digitando');
    })
  })

  it(`Verifique se ao digitar 'Endor' no campo de busca apenas ele e renderizado` , async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    render(<StarWarsProvider><Home /></StarWarsProvider>);

    await waitFor(async () => {
      const inputText = screen.getByTestId('name-filter');
      userEvent.type(inputText, /Endor/i);
      expect(screen.getByRole('cell', { name: /Endor/i })).toBeInTheDocument();
    })
  })

  it('Verifique se ao filtar e renderizado a tabela de acordo', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    
    render(<StarWarsProvider><Home /></StarWarsProvider>);
   
    await waitFor(async () => { 
      const inputValueFilter = screen.getByTestId('value-filter'); 
      const btnFilter = screen.getByTestId('button-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      userEvent.selectOptions(comparisonFilter, ['menor que']);
      userEvent.type(inputValueFilter, '7000000');
      userEvent.click(btnFilter);	
      const planetNames = screen.getAllByTestId('planet-name');
      expect(planetNames[0].innerHTML).toBe('Tatooine');
    })
  })

   it('Verifique se ao filtar e renderizado a tabela de acordo PT.2', async () => {
     global.fetch = jest.fn(() => Promise.resolve({
       json: () => Promise.resolve(testData),
     }));
    
     render(<StarWarsProvider><Home /></StarWarsProvider>);
   
     await waitFor(async () => { 
       const inputValueFilter = screen.getByTestId('value-filter'); 
       const btnFilter = screen.getByTestId('button-filter');
       const comparisonFilter = screen.getByTestId('comparison-filter');
       userEvent.selectOptions(comparisonFilter, ['igual a']);
       userEvent.type(inputValueFilter, '1000000000000');
       userEvent.click(btnFilter);	
      const planetNames = screen.getAllByTestId('planet-name');
      expect(planetNames[0].innerHTML).toBe('Coruscant');
     })
   })

  it('Verifique se quando e aplido um filtro e renderizado um card com as expecificações do filtro', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    
    render(<StarWarsProvider><Home /></StarWarsProvider>);

    await waitFor(async () => {
      const btnFilter = screen.getByTestId('button-filter');
      userEvent.click(btnFilter);
      expect(screen.getByTestId('filter')).toBeInTheDocument();
      expect(screen.getByTestId('removed-filters')).toBeInTheDocument();
    })
  })

  it('Verifoque se ao retirar um filtro a renderização da tabela volta ao estado inicial', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    
    render(<StarWarsProvider><Home /></StarWarsProvider>);

    await waitFor(async () => {
      const inputValueFilter = screen.getByTestId('value-filter'); 
      const btnFilter = screen.getByTestId('button-filter');
      userEvent.type(inputValueFilter, '200000');
      userEvent.click(btnFilter);
      expect(screen.getAllByRole('row')).toHaveLength(7);
      const btnRemoverFilter = screen.getByTestId('removed-filters');
      userEvent.click(btnRemoverFilter);
      expect(screen.getAllByRole('row')).toHaveLength(11);
    })
  })

  it(`Verifique se ao clicar em 'Ascendete' e em seguida em 'ORDERNAR' a tabela e renderizada de acordo`, async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    
    render(<StarWarsProvider><Home /></StarWarsProvider>);
   
    await waitFor(async () => {
      const btnOrdination = screen.getByRole('button', {name: /ordenar/i});
      const btnAsc = screen.getByRole('radio', {name: /ascendete/i});
      userEvent.click(btnAsc);
      userEvent.click(btnOrdination);
      const planetNames = screen.getAllByTestId('planet-name');
      expect(planetNames[0].innerHTML).toBe('Yavin IV');
    })
  })

  it(`Verifique se ao clicar em 'Descendente' e em seguida em 'ORDERNAR' a tabela e renderizada de acordo`, async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    
    render(<StarWarsProvider><Home /></StarWarsProvider>);
   
    await waitFor(async () => {
      const btnOrdination = screen.getByRole('button', {name: /ordenar/i});
      const btnAsc = screen.getByRole('radio', {name: /descendente/i});
      const columnSort = screen.getByTestId('column-sort');
      userEvent.selectOptions(columnSort, ['diameter']);
      userEvent.click(btnAsc);
      userEvent.click(btnOrdination);
      const planetNames = screen.getAllByTestId('planet-name');
      expect(planetNames[0].innerHTML).toBe('Bespin');
    })
  })

  it(`Verifique se quando apertar em 'REMOVER TODOS OS FILTROS' todas as opções do select voltam`, async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    
    render(<StarWarsProvider><Home /></StarWarsProvider>);

    await waitFor(async () => {
      // const btnFilter = screen.getByTestId('button-filter');
      const btnRemoverAllFilters = screen.getByRole('button', { name: /REMOVER TODOS OS FILTROS/i });
      const columnFilter = screen.getByTestId('column-sort');
      // userEvent.click(btnFilter);
      // expect(columnFilter).toHaveLength(4);
      userEvent.click(btnRemoverAllFilters);
      expect(columnFilter).toHaveLength(5);
    })
  })

})

