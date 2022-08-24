import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
             <Header icon>
                <Icon name='search' />
                Ooops, we're having trouble find that page...
             </Header>
             <Segment.Inline>
                <Button as={Link} to={'/my-worry-list'} primary>
                    Return to my worry list
                </Button>
             </Segment.Inline>
        </Segment>
    )
}