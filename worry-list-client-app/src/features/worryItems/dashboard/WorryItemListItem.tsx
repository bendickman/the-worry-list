import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Item, ItemMeta, Label, Segment, SegmentGroup } from "semantic-ui-react";
import { IWorryItem } from "../../../app/models/worryItem";
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
        <Card fluid>
            {worryItem.isComplete &&
                <Label attached='top'
                    color='green'
                    content='Completed - Great Work!'
                    style={{ textAlign: 'center' }} />
            }
            {!worryItem.isComplete &&
                <Label attached='top'
                    color='blue'
                    content='Keep working at it'
                    style={{ textAlign: 'center' }} />
            }
            <Card.Content>
                <Card.Header>{worryItem.situation}</Card.Header>
                <Card.Meta>
                    Anxiety Level: {worryItem.anxietyLevel}
                </Card.Meta>
                <Card.Description>
                    Your thinking style was <strong>'{worryItem.thinkingStyle}'</strong>.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button
                        as={Link}
                        to={`/my-worry-list/${worryItem.id}`}
                        color='green'
                        floated='right'
                        content='View'
                        basic
                    />
                    <Button
                        onClick={() => worryItemStore.deleteWorryItem(worryItem.id)} 
                        basic 
                        color='red'
                        content='Delete'>
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}