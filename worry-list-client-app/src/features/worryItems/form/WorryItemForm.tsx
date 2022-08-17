import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoaderComponent from "../../../app/layout/LoaderComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';

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

export default observer(function WorryItemForm() {

    const {worryItemStore} = useStore();
    const {selectedWorryItem, createWorryItem, updateWorryItem, 
            loadWorryItem, loading, loadingInitial} = worryItemStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();

    const [worryItem, setWorryItem] = useState({
        id: '',
        //createdDate: undefined, TODO - figure these dates out!
        //modifiedDate: undefined,
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
    });

    useEffect(() => {
        if (id) { 
            loadWorryItem(id).then(worryItem => {
                setWorryItem(worryItem!);
            });
        }
    }, [id, loadWorryItem])

    function handleSubmit() {
        if (worryItem.id.length === 0) {
            let newWorryItem = {
                ...worryItem,
                id: uuid(),
            }
            createWorryItem(newWorryItem).then(() => {
                history.push(`/my-worry-list/${newWorryItem.id}`)
            })
        } else {
            updateWorryItem(worryItem).then(() => {
                history.push(`/my-worry-list/${worryItem.id}`)
            })
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;

        setWorryItem({...worryItem, [name]: value});
    }

    if (loadingInitial) return <LoaderComponent content="Loading worry item..." />

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
                
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={'/my-worry-list'} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})