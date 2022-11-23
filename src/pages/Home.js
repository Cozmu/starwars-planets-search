import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
// import useFetch from '../hooks/useFetch';
import Table from '../components/Table';

function Home() {
  // const { data, error, isLoading } = useFetch('https://swapi.dev/api/planets');
  const [planetsAPI, setPlanetAPI] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrror] = useState(null);

  const toSeek = async () => {
    try {
      const endPoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endPoint);
      const data = await response.json();
      const filter = data.results.filter((e) => delete e.residents);
      setPlanetAPI(filter);
    } catch (e) {
      setErrror(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    toSeek();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Form />
      <Table
        planetsAPI={ planetsAPI }
      />
    </div>
  );
}

export default Home;
