import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { WorryItem } from './models/worryItem';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';

function App() {

  const [worryItems, setWorryItems] = useState<WorryItem[]>([]);
  const [selectedWorryItem, setSelectedWorryItem] = useState<WorryItem | undefined>(undefined);

  useEffect(() => {
    axios.get<WorryItem[]>('http://localhost:5000/api/worryitems').then(response => {
      setWorryItems(response.data);
    })
  }, []);

  function handleSelectWorryItem(id: string) {
    setSelectedWorryItem(worryItems.find(wi => wi.id === id));
  }

  function handleCancelSelectWorryItem() {
    setSelectedWorryItem(undefined);
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <WorryItemDashboard 
        worryItems={worryItems}
        selectedWorryItem={selectedWorryItem}
        selectWorryItem={handleSelectWorryItem}
        cancelSelectWorryItem={handleCancelSelectWorryItem}
        />
      </Container>
    </Fragment>
  )
}

export default App;
