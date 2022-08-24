import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {
    const {worryItemStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to={'/'} exact header>
                    <img src='/assets/list.png' alt='the worry list logo' style={{marginRight: '10px'}} />
                    The Worry List
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/errors'} content={'Test Errors'} />
                <Menu.Item as={NavLink} to={'/my-worry-list'} name='My Worry List' />
                <Menu.Item>
                    <Button as={NavLink} to={'/create'} positive content='Add Worry' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}