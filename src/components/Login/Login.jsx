import { FormField } from 'components';
import { Formik, Form } from 'formik';
import { defaultValues, validationSchema } from './formikConfig';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const login = ({ email, password }, { setSubmitting }) => {
    console.log('Logging In: ', email, password);
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

export default Login;
