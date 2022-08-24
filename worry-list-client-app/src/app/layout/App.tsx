import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import WorryItemDashboard from '../../features/worryItems/dashboard/WorryItemDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, Switch, useLocation } from 'react-router-dom';
import WorryItemForm from '../../features/worryItems/form/WorryItemForm';
import WorryItemDetails from '../../features/worryItems/details/WorryItemDetails';
import TestError from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {

  const location = useLocation();

  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path='/my-worry-list' component={WorryItemDashboard} />
                <Route path='/my-worry-list/:id' component={WorryItemDetails} />
                <Route key={location.key} exact path={['/create', '/manage/:id']} component={WorryItemForm} />
                <Route path={'/errors'} component={TestError} />
                <Route path={'/server-error'} component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  )
}

export default observer(App);