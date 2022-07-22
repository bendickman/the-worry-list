import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { WorryItem } from './models/worryItem';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {

  const [worryItems, setWorryItems] = useState<WorryItem[]>([]);
  const [selectedWorryItem, setSelectedWorryItem] = useState<WorryItem | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.WorryItems.list().then(response => {
      const worryItem: WorryItem[] = [];

      response.forEach(wi => {
        if (wi.createdDate) {
          wi.createdDate.setHours(0,0,0,0);
          worryItems.push(wi);
        }
        
      })

      setWorryItems(response);
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

  function handleUpsertWorryItem(worryItem: WorryItem) {
    worryItem.id ?
      setWorryItems([...worryItems.filter(wi => wi.id !== worryItem.id), {...worryItem, modifiedDate: new Date()}])
      : setWorryItems([...worryItems, {...worryItem, id: uuid(), createdDate: new Date()}]);

      worryItem.id ? worryItem.modifiedDate = new Date()
        : worryItem.createdDate = new Date();

      setEditMode(false);
      setSelectedWorryItem(worryItem);
  }

  function handleDeleteWorryItem(id: string) {
    setWorryItems([...worryItems.filter(wi => wi.id !== id)]);
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
        upsertWorryItem={handleUpsertWorryItem}
        deleteWorryItem={handleDeleteWorryItem}
        />
      </Container>
    </Fragment>
  )
}

export default App;
