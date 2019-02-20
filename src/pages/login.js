// Login
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Debug } from '../components/Debug'
import Layout from '../components/layout'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Required'),
  password: Yup.string().required('Required'),
})

const Login = () => (
  <Layout>
    <div className="max-w-sm mx-auto bg-white rounded py-4 px-4">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        validateOnChange={false}
        onSubmit={values => {
          // same shape as initial values
          console.log(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="my-4">
              <label htmlFor="email" className="text-grey-dark text-sm">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="block bg-grey-light rounded  py-2 px-2"
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="my-4">
              <label htmlFor="password" className="text-grey-dark text-sm">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="block bg-grey-light rounded py-2 px-2"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="my-2 py-2 px-4 bg-purple-dark text-purple-lightest rounded shadow hover:bg-purple font-bold"
            >
              Submit
            </button>
            <Debug />
          </Form>
        )}
      </Formik>
    </div>
  </Layout>
)

export default Login
