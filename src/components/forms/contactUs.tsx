import React, { useCallback } from 'react';
import { Formik } from 'formik';

type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

type ContactUsSubmission = {
  name: string;
  email: string;
  service: Service;
  message: string;
};

const contactUsRequestHeaders: HeadersInit = new Headers();
contactUsRequestHeaders.set('Content-Type', 'application/json');

const ContactUsForm: React.FC = () => {
  const onValidateForm = useCallback((values: ContactUsSubmission) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  }, []);
  const onSubmitForm = useCallback(
    async (values: ContactUsSubmission, { isSubmitting, setSubmitting }) => {
      // Stop multiple submits while loading
      if (isSubmitting) {
        return;
      }

      try {
        await window.fetch({
          url: '/api/contactUs',
          method: 'POST',
          headers: contactUsRequestHeaders,
          // @ts-expect-error I'm not sure why TS doesn't like this, it wants `ReadableStream<Uint8Array> | null`
          body: JSON.stringify(values),
        });
      } catch (e) {
        // TODO: What do we do with errors here?
        // eslint-disable-next-line no-console
        console.log(e);
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  return (
    <Formik
      initialValues={{ name: '', email: '', service: 'Website', message: '' }}
      validate={onValidateForm}
      onSubmit={onSubmitForm}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="service"
            >
              Service
            </label>
            <select name="service">
              <option value="Website">Website</option>
              <option value="Project">Project</option>
              <option value="Funding">Funding</option>
              <option value="Advice">Advice</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="service"
            >
              Service
            </label>
            <select name="service">
              <option value="Website">Website</option>
              <option value="Project">Project</option>
              <option value="Funding">Funding</option>
              <option value="Advice">Advice</option>
            </select>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default ContactUsForm;
