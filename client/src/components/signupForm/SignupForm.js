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

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTaken: false
    };
    this.checkEmailUsed = this.checkEmailUsed.bind(this);
  }

  checkEmailUsed(email) {
    if (email) {
      return axios
        .get(`/api/email/availability/${email}`)
        .then(res => {
          if (res.data) {
            this.setState({ emailTaken: true });
          } else {
            this.setState({ emailTaken: false });
          }
        })
        .catch(err => console.log(err));
    }
  }

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
            if (!this.state.emailTaken) {
              axios
                .post('/api/signup', {
                  email: values.email,
                  password: values.password
                })
                .then(res => {
                  formikBag.resetForm();
                })
                .catch(err => console.log(err));
            }
          }}
        >
          {({ values }) => (
            <Form className="form-block">
              <div className="form-group">
                <Field
                  name="email"
                  type="text"
                  onBlur={() => this.checkEmailUsed(values.email)}
                />
                {this.state.emailTaken ? (
                  <p>
                    <small>Email is already in use.</small>
                  </p>
                ) : null}
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
