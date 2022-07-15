import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { WorryItem } from './models/worryItem';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';

function App() {

  const [worryItems, setWorryItems] = useState<WorryItem[]>([]);

  useEffect(() => {
    axios.get<WorryItem[]>('http://localhost:5000/api/worryitems').then(response => {
      setWorryItems(response.data);
    })
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <WorryItemDashboard worryItems={worryItems}/>
      </Container>
    </Fragment>
  )
}

export default App;
