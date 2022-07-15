import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { WorryItem } from "../../../app/layout/models/worryItem";

interface Props {
    worryItems: WorryItem[];
}

export default function WorryItemList({worryItems}: Props) {
    return (
            <Segment>
                <Item.Group divided>
                    {worryItems.map(worryItem => (
                        <Item key={worryItem.id}>
                            <Item.Content>
                                <Item.Header as='a'>{worryItem.situation}</Item.Header>
                                <Item.Meta>{worryItem.createdDate.toString()}</Item.Meta>
                                <Item.Description>
                                    <div>{worryItem.emotions}</div>
                                    <div>{worryItem.thoughts}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button floated='right' content='View' color='blue' />
                                    <Label basic content={worryItem.anxietyLevel} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
    )
}