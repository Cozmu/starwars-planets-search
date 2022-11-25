import './App.css';
import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import StarWarsProvider from './context/StartWarsProvider';

function App() {
  return (
    // <Switch>
    //   <Route exact path="/" component={ Home } />
    // </Switch>
    <StarWarsProvider>
      <Home />
    </StarWarsProvider>
  );
}

export default App;
