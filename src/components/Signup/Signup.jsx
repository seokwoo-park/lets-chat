import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { validationSchema, defaultValues } from './formikConfig';
import { FormField } from '../index';
import { fb } from 'service';
import axios from 'axios';

const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          axios
            .post(
              'https://api.chatengine.io/users/',
              { username: userName, secret: res.user.uid },
              {
                headers: {
                  // 'PRIVATE-KEY': 'e937dee4-9f9d-4913-a67d-ab723911e5bc',
                  'PRIVATE-KEY': `${process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY}`,
                },
              },
            )
            // fetch('/api/createUser', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     userName,
            //     userId: res.user.uid,
            //   }),
            // })
            .then(() => {
              fb.firestore
                .collection('chatUsers')
                .doc(res.user.uid)
                .set({ userName, avatar: '' });
            });
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('Account with this email already exists.');
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .finally(() => setSubmitting(false));
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
