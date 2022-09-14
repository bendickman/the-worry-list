import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemMeta, Label, Segment, SegmentGroup } from "semantic-ui-react";
import { IWorryItem } from "../../../app/layout/models/worryItem";
import { useStore } from "../../../app/stores/store";

interface Props {
    worryItem: IWorryItem;
}

export default function WorryItemListItem({ worryItem }: Props) {

    const { worryItemStore } = useStore();
    const { deleteWorryItem, loading } = worryItemStore;
    const [target, setTarget] = useState('');

    function handleWorryItemDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteWorryItem(id);
    }

    return (
        <Segment.Group>
            <Segment>
                {worryItem.isComplete &&
                    <Label attached='top' 
                        color='green'
                        content='Completed - Great Work!' 
                        style={{textAlign: 'center'}}/>
                }
                {!worryItem.isComplete &&
                    <Label attached='top' 
                        color='blue'
                        content='Look at your actions and use your postive responses, you have got this!' 
                        style={{textAlign: 'center'}}/>
                }
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/my-worry-list/${worryItem.id}`}>
                                {worryItem.situation}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Item.Content>
                    <span>
                        <><Icon name='clock' /> {new Date(worryItem.modifiedDate).toDateString()}</>
                        <><Icon name='adjust' /> {worryItem.anxietyLevel}</>
                    </span>
                </Item.Content>
            </Segment>
            <Segment secondary>
                <p>Some content here...</p>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`/my-worry-list/${worryItem.id}`}
                    color='blue'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}