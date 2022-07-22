import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { WorryItem } from './models/worryItem';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoaderComponent from './LoaderComponent';

function App() {

  const [worryItems, setWorryItems] = useState<WorryItem[]>([]);
  const [selectedWorryItem, setSelectedWorryItem] = useState<WorryItem | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.WorryItems.list().then(response => {
      const worryItem: WorryItem[] = [];

      response.forEach(wi => {
        if (wi.createdDate) {
          //wi.createdDate.setHours(0,0,0,0);
          worryItems.push(wi);
        }
        
      })
      setWorryItems(response);
      setLoading(false);
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
    setSubmitting(true);

    if (worryItem.id) {
          agent.WorryItems.update(worryItem).then(() => {
            setWorryItems([...worryItems.filter(wi => wi.id !== worryItem.id), {...worryItem, modifiedDate: new Date()}])
            setSelectedWorryItem(worryItem);
            setEditMode(false);
            setSubmitting(false);
      })
    } else {
          worryItem.id = uuid();
          agent.WorryItems.create(worryItem).then(() => {
            setWorryItems([...worryItems, worryItem])
            setSelectedWorryItem(worryItem);
            setEditMode(false);
            setSubmitting(false);
      })
    }
  }

  function handleDeleteWorryItem(id: string) {
    setWorryItems([...worryItems.filter(wi => wi.id !== id)]);
  }

  if (loading) return <LoaderComponent />
  
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
        submitting={submitting}
        />
      </Container>
    </Fragment>
  )
}

export default App;
