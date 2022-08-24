import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image src='/assets/list.png' alt='the worry list logo' style={{marginBottom: 12}}></Image>
                    The Worry List
                </Header>
                <Header as='h2' inverted content='Welcome to The Worry List'></Header>
                <Button as={Link} to='/my-worry-list' size='huge' inverted>
                    My Worry List
                </Button>
            </Container>
        </Segment>
    )
}  