import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email Is Required'),
  password: Yup.string().required('Password Is Required')
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        {this.props.message ? <small>Invalid Email Or Password</small> : null}
        <Formik
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LogInSchema}
          onSubmit={values => {
            this.props.handleLogIn(values.email, values.password);
          }}
        >
          {() => (
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
              <button className="btn btn-info" type="submit">
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

// class LoginForm extends Component {
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
//         <h1>Log In</h1>
//         {this.props.message ? <small>Invalid Email Or Password</small> : null}
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
//             this.props.handleLogIn(this.state.email, this.state.password)
//           }
//         >
//           Log In
//         </button>
//       </div>
//     );
//   }
// }

export default LoginForm;
