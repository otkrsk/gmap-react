import React from 'react';
import Map from './Maps';

import './App.css';

function App() {

  return (
    <div style={{ margin: '100px' }}>
      <Map
        center={{lat: 3.040020, lng: 101.579231}}
        height='500px'
        zoom={15}
      />
    </div>
  );

}

export default App;
