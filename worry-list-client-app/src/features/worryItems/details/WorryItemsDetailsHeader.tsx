import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import { IWorryItem } from '../../../app/models/worryItem';
import { useStore } from '../../../app/stores/store';

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
    worryItem: IWorryItem;
}

export default observer (function WorryItemDetailsHeader({worryItem}: Props) {
    const {worryItemStore: {loading, completeWorryItemToggle}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {worryItem.isComplete && 
                    <Label style={{ position:'absolute', zIndex: 1000, left: -14, top: 20}}
                        ribbon 
                        color='green' 
                        content='Completed - Great Work!' />
                }
                {!worryItem.isComplete && 
                    <Label style={{ position:'obsolute', zIndex: 1000, left: -14, top: 20}}
                        ribbon 
                        color='blue' 
                        content='Look at your actions and use your postive responses, you have got this!' />
                }
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
                <Button color={worryItem.isComplete ? 'red' : 'green'}
                    floated='left'
                    content={worryItem.isComplete ? 'Mark as incomplete' : 'Mark as complete'}
                    onClick={completeWorryItemToggle}
                    loading={loading}>
                </Button>

                <Button 
                    as={Link} 
                    to={`/manage/${worryItem.id}`} 
                    color='orange' 
                    floated='right'
                    disabled={worryItem.isComplete}
                    content='Manage Worry'>
                </Button>
            </Segment>
        </Segment.Group>
    )
})
