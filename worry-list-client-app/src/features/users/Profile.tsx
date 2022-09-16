import React from "react";
import { Card, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default function Profile() {
    const { userStore } = useStore();
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Card>
                        <Card.Content header='My Profile' />
                        <Card.Content description={userStore.user?.displayName} />
                        <Card.Content extra>
                            <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}