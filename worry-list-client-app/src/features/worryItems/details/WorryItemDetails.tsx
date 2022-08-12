import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoaderComponent from "../../../app/layout/LoaderComponent";
import { useStore } from "../../../app/stores/store";

export default function WorryItemDetails() {
    const {worryItemStore} = useStore();
    const {selectedWorryItem: worryItem, openUpsertForm, cancelSelectedWorryItem} = worryItemStore;

    if (!worryItem) return <LoaderComponent />

    return (
        <Card fluid>
            <Image src='/assets/categoryImages/travel.jpg' />
            <Card.Content>
            <Card.Header>{worryItem.situation}</Card.Header>
            <Card.Meta>
                <span>{worryItem?.createdDate?.toString()}</span>
            </Card.Meta>
            <Card.Description>
                <div>Anxiety Level: {worryItem.anxietyLevel}</div>
                <div>{worryItem.thoughts}</div>
                <div>{worryItem.thinkingStyle}</div>
                <div>{worryItem.beliefs}</div>
                <br />
                <h3>Action and Positivity</h3>
                <div>{worryItem.positiveResponse}</div>
                <div>{worryItem.actions}</div>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openUpsertForm(worryItem.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => cancelSelectedWorryItem()} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}