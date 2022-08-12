import { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';
import LoaderComponent from './LoaderComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {worryItemStore} = useStore();

  useEffect(() => {
    worryItemStore.loadWorryItems();
  }, [worryItemStore]);

  if (worryItemStore.loadingInitial) return <LoaderComponent />
  
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <WorryItemDashboard />
      </Container>
    </Fragment>
  )
}

export default observer(App);