import { Fragment, useEffect } from 'react';
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
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoaderComponent from './LoaderComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const {userStore, commonStore} = useStore();
  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded(true));
    } else {
      commonStore.setAppLoaded(true);
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) (
    <LoaderComponent content='Loading...' />
  )

  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
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
                <Route path={'/login'} component={LoginForm} />
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