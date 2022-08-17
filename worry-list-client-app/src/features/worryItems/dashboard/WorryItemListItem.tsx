import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import { WorryItem } from "../../../app/layout/models/worryItem";
import { useStore } from "../../../app/stores/store";

interface Props {
    worryItem: WorryItem;
}

export default function WorryItemListItem({worryItem}: Props) {

    const {worryItemStore} = useStore();
    const {deleteWorryItem, loading} = worryItemStore;
    const [target, setTarget] = useState('');

    function handleWorryItemDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteWorryItem(id);
    }

return (
    <Item key={worryItem.id}>
        <Item.Content>
            <Item.Header as='a'>{worryItem.situation}</Item.Header>
            <Item.Meta>{worryItem?.createdDate?.toString()}</Item.Meta>
            <Item.Description>
                <div>{worryItem.emotions}</div>
                <div>{worryItem.thoughts}</div>
            </Item.Description>
            <Item.Extra>
                <Button as={Link} to={`/my-worry-list/${worryItem.id}`} floated='right' content='View' color='blue' />
                <Button 
                name={worryItem.id}
                loading={loading && target === worryItem.id} 
                onClick={(e) => handleWorryItemDelete(e, worryItem.id)} 
                floated='right' 
                content='Delete' 
                color='red' />
                <Label basic content={worryItem.anxietyLevel} />
            </Item.Extra>
        </Item.Content>
    </Item>
)}