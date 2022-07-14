import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [worryItems, setWorryItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/worryitems').then(response => {
      setWorryItems(response.data);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <ul>
          {
          worryItems.map((worryItem: any) => (
            <li key={worryItem.id}>{worryItem.situation}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
