import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../style/Table.css';

function Table() {
  const { filterStorageAll } = useContext(StarWarsContext);
  return (
    <table className="table-container">
      <thead className="table-header">
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
      <tbody
        data-testid="table-body"
        className="table-body"
      >
        {filterStorageAll
          ?.map(({
            name, rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod, diameter,
            climate, gravity, terrain, surface_water: surfaceWater, population, films,
            created, edited, url,
          }, i) => (
            <tr key={ i }>
              <td
                data-testid="planet-name"
              >
                {name}
              </td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>
                {films.map((e, index) => (
                  <p
                    key={ index }
                  >
                    {e}

                  </p>
                ))}
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
