import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoaderComponent from "../../../app/layout/LoaderComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from 'yup';
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { thinkingStyles } from "../../../app/common/constants/ThinkingStyles";
import { anxietyLevels } from "../../../app/common/constants/AnxietyLevels";
import { IWorryItem } from "../../../app/models/worryItem";

const validationSchema = yup.object({
    situation: yup.string().required('The Situation field is required'),
    emotions: yup.string().required('The Emotions field is required'),
    anxietyLevel: yup.string().required('The Anxiety Level field is required'),
    thoughts: yup.string().required('The Thoughts field is required'),
    beliefs: yup.string().required('The Beliefs field is required'),
    thinkingStyle: yup.string().required('The Thinking Stle field is required'),
    positiveResponse: yup.string().required('The Postive Response field is required'),
    actions: yup.string().required('The Actions field is required'),
});

export default observer(function WorryItemForm() {

    const { worryItemStore } = useStore();
    const { selectedWorryItem, createWorryItem, updateWorryItem,
        loadWorryItem, loading, loadingInitial } = worryItemStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [worryItem, setWorryItem] = useState({
        id: '',
        createdDate: new Date(),
        modifiedDate: new Date(),
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

    function handleFormSubmit(worryItem: IWorryItem) {
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

    useEffect(() => {
        if (id) {
            loadWorryItem(id).then(worryItem => {
                setWorryItem(worryItem!);
            });
        }
    }, [id, loadWorryItem])

    if (loadingInitial) return <LoaderComponent content="Loading worry item..." />

    return (
        <Segment clearing>
            <Header content='Worry Item Details' color='blue' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={worryItem}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <TextInput name='situation' placeholder="Situation" label="The situation you were in (i.e. meeting at work)" />
                        <TextInput placeholder='Your Emotions' name='emotions' label="Your emotions at the time" />
                        <SelectInput placeholder='Your Anxiety Level' options={anxietyLevels} name='anxietyLevel' label="Your anxiety level" />
                        <TextArea rows={5} placeholder='Your Thoughts' name='thoughts' label="Your thoughts at the time" />
                        <TextInput placeholder='Your Beliefs' name='beliefs' label="Beliefs based on the experience" />
                        <SelectInput placeholder='Thinking Style' options={thinkingStyles} name='thinkingStyle' label='Your thinking style' />
                        <TextArea rows={5} placeholder='A Positive response' name='positiveResponse' label="A positive response" />
                        <TextArea rows={5} placeholder='Your Actions' name='actions' label="Actions to help with this worry" />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit' />
                        <Button as={Link} to={'/my-worry-list'} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})