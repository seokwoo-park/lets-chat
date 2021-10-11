import { FormField } from 'components';
import { Formik, Form } from 'formik';
import { defaultValues, validationSchema } from './formikConfig';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { fb } from 'service';

const Login = () => {
  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError(
            "We're having problem to log you in. Please try again.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setServerError('Please check your password.');
        } else if (err.code === 'auth/user-not-found') {
          setServerError('No account for this email');
        } else {
          setServerError('Something went wrong :( Please Try it later.');
        }
      })
      .finally(setSubmitting(false));
  };

  const history = useHistory();
  const [serverError, setServerError] = useState('');

  return (
    <div className="auth-form">
      <h1>LOGIN</h1>

      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />

            <div className="auth-link-container">
              Already have an account?{' '}
              <span
                className="auth-link"
                onClick={() => history.push('/signup')}
              >
                Sign Up
              </span>
            </div>
            <button disabled={!isValid || isSubmitting} type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default Login;
