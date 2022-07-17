import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { WorryItem } from "../../../app/layout/models/worryItem";

interface Props {
    closeForm: () => void;
    worryItem: WorryItem | undefined;
    upsertWorryItem: (worryItem: WorryItem) => void;
}

const thinkingStyles = [
    {
      key: 'Predicting',
      text: 'Predicting',
      value: 'Predicting'
    },
    {
      key: 'Self Critical',
      text: 'Self Critical',
      value: 'Self Critical',
    }
];

export default function WorryItemForm({closeForm, worryItem : selectedWorryItem, upsertWorryItem}: Props) {

    const initialState = selectedWorryItem ?? {
        id: '',
        createdDate: undefined,
        modifiedDate: undefined,
        isComplete: false,
        isDeleted: false,
        situation: '',
        emotions: '',
        anxietyLevel: 0,
        thoughts: '',
        beliefs: '',
        thinkingStyle: '',
        positiveResponse: '',
        actions: '',
    }

    const [worryItem, setWorryItem] = useState(initialState);

    function handleSubmit() {
        upsertWorryItem(worryItem);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;

        setWorryItem({...worryItem, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.TextArea placeholder='situation/trigger' value={worryItem.situation} name='situation' onChange={handleInputChange} />
                <Form.TextArea placeholder='emotions' value={worryItem.emotions} name='emotions' onChange={handleInputChange} />
                <Form.Input placeholder='anxiety level' value={worryItem.anxietyLevel} name='anxietyLevel' onChange={handleInputChange} />
                <Form.TextArea placeholder='thoughts' value={worryItem.thoughts} name='thoughts' onChange={handleInputChange} />
                <Form.TextArea placeholder='beliefs' value={worryItem.beliefs} name='beliefs' onChange={handleInputChange} />
                {/* <Form.Dropdown placeholder='thinking stlye' selection options={thinkingStyles} value={worryItem.thinkingStyle} name='thinkingStyle' onChange={handleInputChange} /> */}
                <Form.TextArea placeholder='positive response' value={worryItem.positiveResponse} name='positiveResponse' onChange={handleInputChange} />
                <Form.TextArea placeholder='actions' value={worryItem.actions} name='actions' onChange={handleInputChange} />
                
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' positive type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}