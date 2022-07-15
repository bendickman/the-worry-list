import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

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

export default function WorryItemForm() {
    return (
        <Segment clearing>
            <Form>
                <Form.TextArea placeholder='situation/trigger' />
                <Form.TextArea placeholder='emotions' />
                <Form.Input placeholder='anxiety level' />
                <Form.TextArea placeholder='thoughts' />
                <Form.TextArea placeholder='beliefs' />
                <Form.Dropdown placeholder='thinking stlye' selection options={thinkingStyles} />
                <Form.TextArea placeholder='positive response' />
                <Form.TextArea placeholder='actions' />
                
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' positive type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}