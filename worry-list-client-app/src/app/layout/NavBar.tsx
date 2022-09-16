import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to={'/'} exact header>
                    <img src='/assets/list.png' alt='the worry list logo' style={{ marginRight: '10px' }} />
                    The Worry List
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/errors'} content={'Test Errors'} />
                <Menu.Item as={NavLink} to={'/my-worry-list'} name='My Worry List' />
                <Menu.Item>
                    <Button as={NavLink} to={'/create'} positive content='Add Worry' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.profileImage || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})