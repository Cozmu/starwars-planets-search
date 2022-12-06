import { useContext } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import StarWarsContext from '../context/StarWarsContext';
import '../style/Filters.css';

function Filters() {
  const { filtersCollection, remuveFilter } = useContext(StarWarsContext);
  return (
    <div className="filters-container">
      {filtersCollection.filterByNumericValues
        ?.map(({ valueFilter, comparisonFilter, columnFilter }, i) => (
          <section
            key={ i }
            data-testid="filter"
            className="filters"
          >
            <p>
              {`${columnFilter} ${comparisonFilter} ${valueFilter} `}
            </p>
            <button
              type="button"
              data-testid="removed-filters"
              className="removed-filters"
              onClick={ () => remuveFilter(columnFilter) }
            >
              <RiDeleteBin7Fill className="removed-icon" />
            </button>
          </section>
        ))}
    </div>
  );
}

export default Filters;
