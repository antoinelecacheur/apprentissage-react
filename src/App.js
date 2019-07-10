import React from 'react';
import './App.css';
import MonComposant from './MonComposant';
import ComposantAvecFetch from './ComposantAvecFetch';

function App() {
  return (
    <div className="App">
      <MonComposant test="essai" />
      {/* A décommenter pour avoir l'appel API <ComposantAvecFetch /> */ }
    </div>
  );
}

export default App;
