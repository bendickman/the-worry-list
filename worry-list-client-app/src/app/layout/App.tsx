import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { WorryItem } from './models/worryItem';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';

function App() {

  const [worryItems, setWorryItems] = useState<WorryItem[]>([]);
  const [selectedWorryItem, setSelectedWorryItem] = useState<WorryItem | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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

  function handleFormOpen(id?: string) {
    id ? handleSelectWorryItem(id) : handleCancelSelectWorryItem();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <WorryItemDashboard 
        worryItems={worryItems}
        selectedWorryItem={selectedWorryItem}
        selectWorryItem={handleSelectWorryItem}
        cancelSelectWorryItem={handleCancelSelectWorryItem}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        />
      </Container>
    </Fragment>
  )
}

export default App;
