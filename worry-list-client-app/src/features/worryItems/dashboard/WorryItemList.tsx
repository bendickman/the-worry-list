import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { WorryItem } from "../../../app/layout/models/worryItem";

interface Props {
    worryItems: WorryItem[];
    selectWorryItem: (id: string) => void;
    deleteWorryItem: (id: string) => void;
    submitting: boolean;
}

export default function WorryItemList({worryItems, selectWorryItem, deleteWorryItem, submitting}: Props) {

    const [target, setTarget] = useState('');

    function handleWorryItemDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteWorryItem(id);
    }

    
    return (
            <Segment>
                <Item.Group divided>
                    {worryItems.map(worryItem => (
                        <Item key={worryItem.id}>
                            <Item.Content>
                                <Item.Header as='a'>{worryItem.situation}</Item.Header>
                                <Item.Meta>{worryItem?.createdDate?.toString()}</Item.Meta>
                                <Item.Description>
                                    <div>{worryItem.emotions}</div>
                                    <div>{worryItem.thoughts}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => selectWorryItem(worryItem.id)} floated='right' content='View' color='blue' />
                                    <Button 
                                    name={worryItem.id}
                                    loading={submitting && target === worryItem.id} 
                                    onClick={(e) => handleWorryItemDelete(e, worryItem.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' />
                                    <Label basic content={worryItem.anxietyLevel} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
    )
}