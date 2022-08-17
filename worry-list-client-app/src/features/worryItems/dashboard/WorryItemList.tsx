import { observer } from "mobx-react-lite";
import React from "react";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import WorryItemListItem from "./WorryItemListItem";

export default observer(function WorryItemList() {

    const {worryItemStore} = useStore();
    const {worryItemsByCreatedDate} = worryItemStore;
    
    return (
            <Segment>
                <Item.Group divided>
                    {worryItemsByCreatedDate.map(worryItem => (
                        <WorryItemListItem key={worryItem.id} worryItem={worryItem} />
                    ))}
                </Item.Group>
            </Segment>
    )
})