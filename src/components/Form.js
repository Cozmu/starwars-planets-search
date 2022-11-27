import { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import StarWarsContext from '../context/StarWarsContext';
import '../style/Form.css';

function Form() {
  const {
    handleChange,
    setNameFilter,
    theFilters,
    addFilter,
    options,
    remuveAllFilters,
    setFiltersCollection,
    filtersCollection,
    setTheOrder } = useContext(StarWarsContext);

  const handleChageColumnSort = ({ target }) => {
    setFiltersCollection({
      ...filtersCollection,
      order: {
        ...filtersCollection.order,
        sort: target.value,
      },
    });
  };

  return (
    <form className="form-container">
      <section className="name-filter-container">
        <label htmlFor="nameFilter">
          <input
            type="text"
            data-testid="name-filter"
            id="nameFilter"
            name="nameFilter"
            placeholder="Nos fale seu planeta favorito"
            onChange={ ({ target }) => {
              setNameFilter(target.value);
            } }
          />
        </label>
        <button
          type="button"
          onClick={ () => {
            console.log('XD');
          } }
        >
          <FaSearch className="search-icon" />
        </button>
      </section>
      <label
        className="drop-down-label"
        htmlFor="column-filter"
      >
        Coluna
        <select
          className="drop-down"
          id="column-filter"
          name="columnFilter"
          data-testid="column-filter"
          onChange={ handleChange }
        >
          {options.map((el) => (
            <option
              key={ el }
            >
              {el}
            </option>
          ))}
        </select>
      </label>
      <label
        className="drop-down-label"
        htmlFor="comparison-filter"
      >
        Operador
        <select
          className="drop-down"
          id="comparison-filter"
          name="comparisonFilter"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        <input
          className="value-filter"
          type="number"
          data-testid="value-filter"
          id="valueFilter"
          name="valueFilter"
          onChange={ handleChange }
          value={ theFilters.valueFilter }
        />
      </label>
      <button
        className="btns"
        data-testid="button-filter"
        onClick={ () => addFilter() }
        type="button"
      >
        FILTRAR
      </button>
      <button
        className="btns"
        data-testid="button-remove-filters"
        type="button"
        onClick={ remuveAllFilters }
      >
        REMOVER TODOS OS FILTROS
      </button>
      <section className="column-sort-container">
        <label htmlFor="columnSortAsc">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            id="columnSortAsc"
            name="columnSort"
            onChange={ handleChageColumnSort }
            value="ASC"
          />
          Ascendete
        </label>
        <label htmlFor="columnSortDesc">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            id="columnSortDesc"
            name="columnSort"
            onChange={ handleChageColumnSort }
            value="DESC"
          />
          Descendente
        </label>
      </section>
      <label
        className="drop-down-label"
        htmlFor="column-sort"
      >
        Ordenar
        <select
          className="drop-down"
          id="column-sort"
          name="column"
          data-testid="column-sort"
          onChange={ ({ target }) => {
            setFiltersCollection({
              ...filtersCollection,
              order: {
                ...filtersCollection.order,
                column: target.value,
              },
            });
          } }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <button
        className="btns"
        type="button"
        onClick={ () => {
          setTheOrder(
            filtersCollection.order,
          );
        } }
        data-testid="column-sort-button"
      >
        ORDENAR
      </button>
    </form>
  );
}

export default Form;
