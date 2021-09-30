import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { validationSchema, defaultValues } from './formikConfig';
import { FormField } from '../index';

const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    console.log('Signing up :', email, userName, password);
  };

  return (
    <div className="auth-form">
      <h1>Signup</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={{ defaultValues }}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="userName" label="User Name" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />
            <FormField
              name="verifyPassword"
              label="Verify Password"
              type="password"
            />

            <div className="auth-link-container">
              Already have an account?{' '}
              <span
                className="auth-link"
                onClick={() => history.push('/login')}
              >
                Login
              </span>
            </div>

            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default Signup;
