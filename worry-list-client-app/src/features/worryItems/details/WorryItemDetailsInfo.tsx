import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon, Table, Divider, Header} from 'semantic-ui-react'
import { IWorryItem } from '../../../app/models/worryItem';

interface Props {
    worryItem: IWorryItem;
}

export default observer(function ActivityDetailedInfo({worryItem}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='table' />
                    Details
                </Header>
                </Divider>
                <p>Here is a breakdown of your worry, use these details to work through and hopefully manage the worry in the best way you can.</p>
                <Table definition>
                    <Table.Body>
                        <Table.Row>
                        <Table.Cell width={2}>Beliefs</Table.Cell>
                        <Table.Cell>{worryItem.beliefs}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                        <Table.Cell>Thoughts</Table.Cell>
                        <Table.Cell>{worryItem.thoughts}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                        <Table.Cell>Thinking Style</Table.Cell>
                        <Table.Cell>{worryItem.thinkingStyle}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                        <Table.Cell>Emotions</Table.Cell>
                        <Table.Cell>{worryItem.emotions}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    </Table>
            </Segment>
        </Segment.Group>
    )
})