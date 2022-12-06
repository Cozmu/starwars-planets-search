import './App.css';
import React from 'react';
import Home from './pages/Home';
import StarWarsProvider from './context/StartWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Home />
    </StarWarsProvider>
  );
}

export default App;
