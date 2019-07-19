import React from 'react';
import { Formik } from 'formik';
import { Button, Form, Grid, Icon, Segment } from 'semantic-ui-react'
import * as Yup from "yup";
import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'


const Login = (props) => {
    console.log(props)
    const[token, SetToken] = useLocalStorage('token')

    return (

        <Formik 
        
            initialValues = {{
                username: "",
                password: "",
            }}
            onSubmit={(values, actions,) => {
                actions.resetForm()
                const url = "http://localhost:5000/api/register";

                actions.setSubmitting(true)

                axios.post(url, values)
                    .then(res => {
                        console.log(res.data.token)
                        
                        // localStorage.setItem('token', res.data.token)
                        SetToken(res.data.token)
                        actions.setSubmitting(false)
                        props.history.push('/list')
                    })
                    .catch(err => {
                        console.log(err.response)
                        actions.setSubmitting(false)
                    })
            }}

            validationSchema={UserSignUpSchema}
        
            render = {({ values, handleSubmit, handleChange, errors, touched, isSubmitting, ...props }) => (
                <Grid style={{ height: '100vh' }} verticalAlign='middle' textAlign='center' divided stackable>
                    
                    <Grid.Column width={6}>
                        <Segment>

                            <Form onSubmit={handleSubmit} size='big'>

                                <Form.Input   
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    icon='user circle' 
                                    iconPosition='left'
                                    value={values.username}
                                    onChange={handleChange}
                                    error={touched.username && errors.username}
                                />

                                <Form.Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    icon='lock' 
                                    iconPosition='left'
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && errors.password}
                                />

                                <Button 
                                    color='brown' 
                                    animated
                                    type='submit' 
                                    fluid
                                    loading={isSubmitting}
                                    size='big'
                                >
                                    <Button.Content visible>Login</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>                                
                                </Button>

                            </Form>

                        </Segment>
                    </Grid.Column>
                </Grid>
            )}        
        
        />
    )
}

const UserSignUpSchema = Yup.object().shape({

    username: Yup.string()
        .required('You must participate if you want the goods'),
    password: Yup.string()
        .min(3, 'Not Long Enough')
        .max(15, 'Slow Down Partner')
        .required('You must participate if you want the goods')
})

export default Login;    