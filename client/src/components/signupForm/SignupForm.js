import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email Is Required'),
  password: Yup.string()
    .min(5, 'Password too short')
    .max(15, 'Password too long')
    .required('Password Is Required')
});

const checkEmailUsed = email => {
  return axios
    .get(`/api/email/availability/${email}`)
    .then(res => {
      if (res.data) throw 'Email Is Taken';
    })
    .catch(err => console.log(err));
};

class SignupForm extends Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>
        <Formik
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, formikBag) => {
            axios
              .post('/api/signup', {
                email: values.email,
                password: values.password
              })
              .then(res => {
                formikBag.resetForm();
              })
              .catch(err => console.log(err));
          }}
        >
          {() => (
            <Form className="form-block">
              <div className="form-group">
                <Field name="email" type="text" validate={checkEmailUsed} />
                <ErrorMessage
                  name="email"
                  component="small"
                  className="form-text text-muted"
                />
              </div>

              <div className="form-group">
                <Field name="password" type="password" />
                <ErrorMessage
                  name="password"
                  component="small"
                  className="form-text text-muted"
                />
              </div>
              <button className="btn btn-info" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default SignupForm;
