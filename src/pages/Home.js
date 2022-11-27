import React, { useState, useEffect, useContext } from 'react';
import Filters from '../components/Filters';
import Form from '../components/Form';
import Table from '../components/Table';
import StarWarsContext from '../context/StarWarsContext';
import Header from '../components/Header';
import '../style/Home.css';
// import deleteProperty from '../tests/helpers/Helper';

function Home() {
  const { setPlanets } = useContext(StarWarsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrror] = useState(null);

  const toSeek = async () => {
    try {
      const endPoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endPoint);
      const data = await response.json();
      // const filter = deleteProperty(data.results, 'residents');
      const filter = data.results.filter((e) => delete e.residents);
      setPlanets(filter);
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
      <div className="loading-container">
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
      <Header />
      <main className="conteudo-container">
        <Form />
        <Filters />
        <Table />
      </main>
    </div>
  );
}

export default Home;
