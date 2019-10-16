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
  render() {
    return (
      <div>
        <h1>Signup</h1>
        <Formik
          validateOnBlur={true}
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, formikBag) => {
            axios.get(`/api/email/availability/${values.email}`).then(res => {
              if (!res.data) {
                formikBag.resetForm();
              } else {
                formikBag.setFieldError('email', 'Email is already taken');
              }
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-block">
              <div className="form-group">
                <Field name="email" type="text" />
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
              {/* {errors.email && touched.email && <div>...{errors.email}...</div>} */}

              {/* {errors.password && touched.password && (
                <div>...{errors.password}...</div>
              )} */}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

// class SignupForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { email: '', password: '' };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Sign Up</h1>
//         <form action="">
//           <label htmlFor="">Email</label>
//           <input
//             name="email"
//             type="text"
//             value={this.state.email}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="">Password</label>
//           <input
//             name="password"
//             type="password"
//             value={this.state.password}
//             onChange={this.handleChange}
//           />
//         </form>
//         <button
//           value="submit"
//           onClick={() =>
//             this.props.handleSignUp(this.state.email, this.state.password)
//           }
//         >
//           Sign Up
//         </button>
//       </div>
//     );
//   }
// }

export default SignupForm;
