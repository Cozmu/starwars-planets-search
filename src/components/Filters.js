import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { filtersCollection, remuveFilter } = useContext(StarWarsContext);
  return (
    <div>
      {filtersCollection.filterByNumericValues
        ?.map(({ valueFilter, comparisonFilter, columnFilter }, i) => (
          <section
            key={ i }
            data-testid="filter"
            className="filtro"
          >
            <p>{`${columnFilter} ${comparisonFilter} ${valueFilter}`}</p>
            <button
              type="button"
              onClick={ () => remuveFilter(columnFilter) }
            >
              Remover
            </button>
          </section>
        ))}
    </div>
  );
}

export default Filters;
