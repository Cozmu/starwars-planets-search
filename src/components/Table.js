import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table({ planetsAPI }) {
  const { nameFilter, filtersCollection } = useContext(StarWarsContext);
  const lower = nameFilter.toLocaleLowerCase();

  // const filterArr = () => filtersCollection
  //   .forEach(({ comparisonFilter, valueFilter, columnFilter }) => {
  //     if (comparisonFilter === 'maior que') {
  //       return ;
  //     }
  //     if (comparisonFilter === 'menor que') {

  //     }
  //     if (comparisonFilter === 'igual a') {

  //     }
  //   });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {planetsAPI.filter((e) => e.name.toLowerCase().includes(lower))
          .map(({
            name, rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod, diameter,
            climate, gravity, terrain, surface_water: surfaceWater, population, films,
            created, edited, url,
          }, i) => (
            <tr key={ i }>
              <td>{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>
                {films}
              </td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  planetsAPI: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default Table;
