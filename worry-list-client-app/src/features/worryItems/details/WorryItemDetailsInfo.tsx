import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { WorryItem } from '../../../app/layout/models/worryItem';

interface Props {
    worryItem: WorryItem;
}

export default observer(function ActivityDetailedInfo({worryItem}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>beliefs - {worryItem.beliefs}</p>
                        <p>thoughts - {worryItem.thoughts}</p>
                        <p>thinking styles - {worryItem.thinkingStyle}</p>

                    </Grid.Column>
                </Grid>
            </Segment>
            {/* <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {activity.date}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment> */}
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='frown' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>emotions - {worryItem.emotions}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})