import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image src='/assets/list.png' alt='the worry list logo' style={{ marginBottom: 12 }}></Image>
                    The Worry List
                </Header>
                {userStore.isLoggedIn ? (
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to The Worry List'></Header>
                        <Button as={Link} to='/my-worry-list' size='huge' inverted>
                            My Worry List
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register
                        </Button>
                    </Fragment>
                )}
            </Container>
        </Segment>
    )
})