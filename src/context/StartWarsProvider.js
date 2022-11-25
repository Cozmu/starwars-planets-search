import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import starWarsContext from './StarWarsContext';

const opt = ['population',
  'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [theFilters, setTheFilters] = useState({
    valueFilter: 0,
    comparisonFilter: 'maior que',
    columnFilter: 'population' });
  const [nameFilter, setNameFilter] = useState('');
  const [filtersCollection, setFiltersCollection] = useState({
    order: { column: 'population', sort: 'ASC' },
    filterByNumericValues: [],
  });
  const [filterStorage, setfilterStorage] = useState([]);
  const [filterStorageAll, setfilterStorageAll] = useState([]);
  const [options, setOpitions] = useState(opt);
  const [theOrder, setTheOrder] = useState({
    column: 'population', sort: 'ASC',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTheFilters({
      ...theFilters,
      [name]: value,
    });
  };

  const ordination = (data) => data.sort((a, b) => {
    if (filtersCollection.order.sort === 'ASC') {
      if (a[filtersCollection.order.column] === 'unknown') {
        return Infinity - b[filtersCollection.order.column];
      }
      if (b[filtersCollection.order.column] === 'unknown') {
        return a[filtersCollection.order.column] - Infinity;
      }
      return a[filtersCollection.order.column] - b[filtersCollection.order.column];
    }
    return b[filtersCollection.order.column] - a[filtersCollection.order.column];
  });

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
    console.log(filtersCollection.order);
    intermediario = ordination(intermediario);
    setfilterStorage(intermediario);
  }, [filtersCollection, planets]);

  useEffect(() => {
    const lower = nameFilter.toLowerCase();
    setfilterStorageAll(filterStorage
      .filter((e) => e.name.toLowerCase().includes(lower)));
  }, [nameFilter, filterStorage]);

  useEffect(() => {
    const filtered = filtersCollection.filterByNumericValues.map((e) => e.columnFilter);
    const newOptions = options.filter((e) => !filtered.includes(e));
    setOpitions(newOptions);
    setTheFilters({
      ...theFilters,
      columnFilter: newOptions[0],
    });
  }, [filtersCollection]);

  const addFilter = () => {
    setFiltersCollection({
      ...filtersCollection,
      filterByNumericValues: [...filtersCollection.filterByNumericValues, theFilters],
    });
  };

  const remuveFilter = (filtroClicado) => {
    const newFilters = filtersCollection.filterByNumericValues
      .filter((e) => e.columnFilter !== filtroClicado);

    setFiltersCollection({
      ...filtersCollection,
      filterByNumericValues: newFilters,
    });
    const verificaOptions = options.some((e) => !filtroClicado.includes(e));
    if (verificaOptions) {
      setOpitions([...options, filtroClicado]);
    }
  };

  const remuveAllFilters = () => {
    setFiltersCollection({
      ...filtersCollection,
      filterByNumericValues: [],
    });
    setOpitions(opt);
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
    options,
    remuveFilter,
    remuveAllFilters,
    setFiltersCollection,
    setTheOrder,
    theOrder,
  }), [
    theFilters,
    filtersCollection,
    nameFilter,
    filterStorageAll,
    options,
    theOrder,
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
