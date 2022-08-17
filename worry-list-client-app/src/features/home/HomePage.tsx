import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>Home Page</h1>
            <h3><Link to={'/my-worry-list'}>My Worry List</Link></h3>
        </Container>
    )
}