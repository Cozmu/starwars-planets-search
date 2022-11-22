import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import starWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [searchName, setSearchName] = useState('');
  const values = useMemo(() => ({
    searchName, setSearchName,
  }), [searchName]);

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
