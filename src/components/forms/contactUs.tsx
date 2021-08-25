import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select';
import useThemeColor from '../../hooks/useThemeColor';
import dynamic from 'next/dynamic';
import { DarkButton } from '../decoration/buttons';
import classNames from 'classnames';
type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

interface ContactUsSubmission {
  name: string;
  email: string;
  service: Service;
  message: string;
}

const contactUsRequestHeaders: HeadersInit = new Headers({
  'Content-Type': 'application/json',
});

const inputClassnames =
  'px-2 py-2 text-xl text-grey w-full focus:ring-1 focus:ring-grey';

interface LabelProps {
  name: string;
}

const Label: React.FC<LabelProps> = ({ name }) => {
  return (
    <label className="block font-bold text-left capitalize" htmlFor={name}>
      {name}
    </label>
  );
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <>
      <Label name={props.name || ''} />
      <input
        ref={ref}
        className={inputClassnames}
        {...props}
        id={props.id || props.name}
      />
    </>
  );
});

const StyledSelect: React.FC<any> = (props) => {
  const grey = useThemeColor('grey');
  const lightGrey = useThemeColor('grey-light');

  const options = ['website', 'project', 'funding', 'advice'].map(
    (service) => ({
      value: service,
      label: service.charAt(0).toUpperCase() + service.slice(1),
    })
  );

  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  const height = '44px';

  return (
    <Select
      {...props}
      id="service"
      instanceId="service"
      placeholder="Select a service..."
      onChange={(selection) => setValue(selection?.value || null)}
      value={options.find((option) => option.value === value)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: grey,
          primary25: lightGrey,
          secondary: lightGrey,
        },
      })}
      styles={{
        placeholder: (provided) => ({
          ...provided,
          color: '#a1a1aa',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          backgroundColor: grey,
          height,
          verticalAlign: 'middle',
          marginTop: 'auto',
          marginBottom: 'auto',
        }),
        control: (provided) => ({
          ...provided,
          minHeight: height,
          height,
          border: 0,
          fontSize: '1.25rem',
        }),
        valueContainer: (provided) => ({
          ...provided,
          height,
          padding: '0 6px',
        }),
        input: (provided) => ({
          ...provided,
          margin: '0px',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height,
        }),
        // option: provided=>({...provided})
      }}
      options={options}
    />
  );
};

const ContactUsForm: React.FC = () => {
  const onSubmit = useCallback(async (values: ContactUsSubmission) => {
    try {
      await axios.post('/api/contactUs', values);
    } catch (e) {
      // TODO: What do we do with errors here?
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, []);

  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm<ContactUsSubmission>();

  return (
    <div className="md:w-2/3 mx-auto pt-5">
      <div className="text-xl w-2/5 mx-auto text-grey-dark pt-5">
        If you&apos;d like to talk about any of these services, please use our
        contact form to get in touch! We do our best to respond to every email
        within 48 hours.
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Name" {...register('name', { required: true })} />
        </div>
        <div>
          <Input
            placeholder="yourname@example.com"
            {...register('email', {
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            })}
          />
        </div>
        <div>
          <Label name="service" />
          <Controller
            name="service"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <StyledSelect {...field} />}
          />
        </div>
        <div>
          <Label name="message" />
          <textarea
            id="message"
            wrap="soft"
            className={classNames(inputClassnames, 'resize-none')}
            rows={10}
            {...register('message')}
          />
        </div>
        <div className="pt-5 pb-10">
          <DarkButton type="submit" disabled={isSubmitting} className="px-10">
            Submit
          </DarkButton>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
