import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Card, Header, Item, Label, Message, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import WorryItemListItem from "./WorryItemListItem";

export default observer(function WorryItemList() {

    const { worryItemStore } = useStore();
    const { groupedWorryItems } = worryItemStore;

    return (
        <Fragment>
            {
                !groupedWorryItems.length &&
                <Message info>
                    <Message.Header>You do not have any worry items yet</Message.Header>
                    <p>Click the 'Add Worry' button above to get started.</p>
                </Message>
            }
            {
                groupedWorryItems.map(([group, worryItems]) => (
                    <Fragment key={group}>
                        <Header color='blue' size='small'>
                            {group}
                        </Header>
                        <Card.Group>
                            {worryItems.map(worryItem => (
                                <WorryItemListItem key={worryItem.id} worryItem={worryItem} />
                            ))}
                        </Card.Group>
                    </Fragment>

                ))}
        </Fragment>
    )
})