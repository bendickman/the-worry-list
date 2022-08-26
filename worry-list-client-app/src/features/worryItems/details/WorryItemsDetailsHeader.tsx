import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { WorryItem } from '../../../app/layout/models/worryItem';

const worryItemImageStyle = {
    filter: 'brightness(30%)'
};

const worryItemImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    worryItem: WorryItem;
}

export default observer (function WorryItemDetailsHeader({worryItem}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/food.jpg`} fluid style={worryItemImageStyle}/>
                <Segment style={worryItemImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={worryItem.situation}
                                    style={{color: 'white'}}
                                />
                                <p>Last updated: {new Date(worryItem.modifiedDate).toDateString()}</p>
                                <p>
                                    Anxiety Level: <strong>{worryItem.anxietyLevel}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Mark as complete</Button>
                <Button>Mark as incomplete</Button>
                <Button as={Link} to={`/manage/${worryItem.id}`} color='orange' floated='right'>
                    Manage Worry Item
                </Button>
            </Segment>
        </Segment.Group>
    )
})
