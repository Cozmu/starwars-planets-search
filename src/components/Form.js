import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Form() {
  const {
    handleChange,
    setNameFilter,
    theFilters,
    addFilter,
    options,
    remuveAllFilters } = useContext(StarWarsContext);

  return (
    <form>
      <label htmlFor="nameFilter">
        <input
          type="text"
          data-testid="name-filter"
          id="nameFilter"
          name="nameFilter"
          placeholder="Nos fale seu filme favorito"
          onChange={ ({ target }) => {
            setNameFilter(target.value);
          } }
        />
      </label>
      <select
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
      <select
        name="comparisonFilter"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="valueFilter">
        <input
          type="number"
          data-testid="value-filter"
          id="valueFilter"
          name="valueFilter"
          onChange={ handleChange }
          value={ theFilters.valueFilter }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => addFilter() }
      >
        Adicionar Filtro
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ remuveAllFilters }
      >
        Remover todas filtragens
      </button>
    </form>
  );
}

export default Form;
