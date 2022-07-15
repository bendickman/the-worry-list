import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';
import { WorryItem } from './models/worryItem';

function App() {

  const [worryItems, setWorryItems] = useState<WorryItem[]>([]);

  useEffect(() => {
    axios.get<WorryItem[]>('http://localhost:5000/api/worryitems').then(response => {
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
          worryItems.map(worryItem => (
            <List.Item key={worryItem.id}>{worryItem.situation} - {worryItem.actions}</List.Item>
          ))}
      </List>

    </div>
  );
}

export default App;
