import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import starWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [theFilters, setTheFilters] = useState({
    valueFilter: 0,
    comparisonFilter: 'maior que',
    columnFilter: 'population' });
  const [nameFilter, setNameFilter] = useState('');
  const [filtersCollection, setFiltersCollection] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTheFilters({
      ...theFilters,
      [name]: value,
    });
  };

  const addFilter = () => {
    setFiltersCollection([...filtersCollection, theFilters]);
  };

  const values = useMemo(() => ({
    theFilters, handleChange, nameFilter, setNameFilter, addFilter, filtersCollection,
  }), [theFilters, filtersCollection, nameFilter]);

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
