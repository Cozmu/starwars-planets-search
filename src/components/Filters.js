import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { filtersCollection } = useContext(StarWarsContext);
  return (
    <div>
      {filtersCollection.map(({ valueFilter, comparisonFilter, columnFilter }, i) => (
        <section
          key={ i }
          className="filtro"
        >
          <p>{`${columnFilter} ${comparisonFilter} ${valueFilter}`}</p>
        </section>
      ))}
    </div>
  );
}

export default Filters;
