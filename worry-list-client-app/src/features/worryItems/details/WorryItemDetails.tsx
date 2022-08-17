import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoaderComponent from "../../../app/layout/LoaderComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function WorryItemDetails() {
    const {worryItemStore} = useStore();
    const {selectedWorryItem: worryItem, loadWorryItem, loadingInitial} = worryItemStore;

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadWorryItem(id);
    }, [id, loadWorryItem])

    if (loadingInitial || !worryItem) return <LoaderComponent />

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
                    <Button as={Link} to={`/manage/${worryItem.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/my-worry-list'} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})