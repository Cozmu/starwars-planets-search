import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import starWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [theFilters, setTheFilters] = useState({
    valueFilter: 0,
    comparisonFilter: 'maior que',
    columnFilter: 'population' });
  const [nameFilter, setNameFilter] = useState('');
  const [filtersCollection, setFiltersCollection] = useState({
    filterByNumericValues: [],
  });
  const [filterStorage, setfilterStorage] = useState([]);
  const [filterStorageAll, setfilterStorageAll] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTheFilters({
      ...theFilters,
      [name]: value,
    });
  };

  useEffect(() => {
    let intermediario = planets;
    filtersCollection.filterByNumericValues
      .forEach(({ comparisonFilter, valueFilter, columnFilter }) => {
        if (comparisonFilter === 'maior que') {
          intermediario = intermediario
            .filter((e) => e[columnFilter] > +valueFilter);
        } else if (comparisonFilter === 'menor que') {
          intermediario = intermediario
            .filter((e) => e[columnFilter] < +valueFilter);
        } else if (comparisonFilter === 'igual a') {
          intermediario = intermediario
            .filter((e) => +e[columnFilter] === +valueFilter);
        }
      });
    setfilterStorage(intermediario);
  }, [filtersCollection, planets]);

  useEffect(() => {
    const lower = nameFilter.toLowerCase();
    setfilterStorageAll(filterStorage
      .filter((e) => e.name.toLowerCase().includes(lower)));
  }, [nameFilter, filterStorage]);

  const addFilter = () => {
    setFiltersCollection({
      ...filtersCollection,
      filterByNumericValues: [...filtersCollection.filterByNumericValues, theFilters],
    });
  };

  const values = useMemo(() => ({
    theFilters,
    handleChange,
    nameFilter,
    setNameFilter,
    addFilter,
    filtersCollection,
    setPlanets,
    filterStorageAll,
  }), [
    theFilters,
    filtersCollection,
    nameFilter,
    filterStorageAll,
  ]);

  return (
    <starWarsContext.Provider value={ values }>
      { children }
    </starWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default StarWarsProvider;
