import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";

export default observer (function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik 
            initialValues={{email: '', password: '', userName: '', displayName: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                {setErrors({error: error})})}
            validationSchema={Yup.object({
                email: Yup.string().email().required(),
                displayName: Yup.string().required(),
                userName: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >

            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Create Account' textAlign='center' color='teal' />
                    <TextInput name='email' placeholder='Email' />
                    <TextInput name='userName' placeholder='Username' />
                    <TextInput name='displayName' placeholder='Display Name' />
                    <TextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error} />
                        }
                    ></ErrorMessage>
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})