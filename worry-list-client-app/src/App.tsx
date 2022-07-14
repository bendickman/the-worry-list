import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

function App() {

  const [worryItems, setWorryItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/worryitems').then(response => {
      setWorryItems(response.data);
    })
  }, []);

  return (
    <div>
      <Header icon as='h2'>
      <Icon name='users' />
        Second Header
        </Header>
        
      <List>
        {
          worryItems.map((worryItem: any) => (
            <List.Item key={worryItem.id}>{worryItem.situation}</List.Item>
          ))}
      </List>

    </div>
  );
}

export default App;
