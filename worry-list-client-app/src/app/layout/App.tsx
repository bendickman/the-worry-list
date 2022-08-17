import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, useLocation } from 'react-router-dom';
import WorryItemForm from '../../features/worryItems/form/WorryItemForm';
import WorryItemDetails from '../../features/worryItems/details/WorryItemDetails';

function App() {

  const location = useLocation();

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Route exact path='/my-worry-list' component={WorryItemDashboard} />
              <Route path='/my-worry-list/:id' component={WorryItemDetails} />
              <Route key={location.key} exact path={['/create', '/manage/:id']} component={WorryItemForm} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  )
}

export default observer(App);