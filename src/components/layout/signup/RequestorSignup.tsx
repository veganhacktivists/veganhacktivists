import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import ToolTip from '../../decoration/tooltip';

import { requestorSignupSchema } from 'lib/services/playground/schemas';
import TextInput from 'components/forms/inputs/textInput';
import Label from 'components/forms/inputs/label';
import SelectInput from 'components/forms/inputs/selectInput';
import TextArea from 'components/forms/inputs/textArea';

import type { z } from 'zod';

interface RequestorSignupProps {}

type RequestorSignupPayload = z.infer<typeof requestorSignupSchema>;

const RequestorSignup = () => {
  const {
    register,
    formState: { errors },
  } = useForm<RequestorSignupPayload>({
    resolver: zodResolver(requestorSignupSchema),
  });

  return (
    <>
      <div className="px-10 bg-grey-background" id="contact-us">
        <form
          noValidate
          className="grid grid-cols-1 gap-5 py-10 mx-auto text-left lg:grid-cols-6 md:max-w-3xl"
        >
          <div className="text-xl col-span-full">Personal Information</div>
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="Name"
            showRequiredMark
            {...register('name', { required: 'Please enter a name' })}
            error={errors.name?.message}
          />
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="they/them"
            {...register('pronouns')}
            error={errors.pronouns?.message}
          >
            Pronouns
          </TextInput>
          <TextInput
            className="col-span-full"
            placeholder="Email"
            showRequiredMark
            {...register('providedEmail', {
              required: 'The email is required',
            })}
            error={errors.providedEmail?.message}
          >
            Email
          </TextInput>
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="Phone"
            showRequiredMark
            type="tel"
            {...register('phone', { required: 'The phone is required' })}
            error={errors.phone?.message}
          />
          <TextInput
            placeholder="www.website..."
            showRequiredMark
            {...register('website', {
              required: 'Please enter a valid website',
            })}
            className="w-full col-span-full"
            error={errors.website?.message}
          />
          <TextInput
            showRequiredMark
            placeholder="Calendly"
            className="col-span-full"
            {...register('calendlyUrl')}
            error={errors.calendlyUrl?.message}
          >
            Link to your Calendly
          </TextInput>
          <div className="text-xl col-span-full">Organization Information</div>
          <TextInput
            className="col-span-full"
            placeholder="Organization"
            {...register('organization', { required: false })}
            error={errors.organization?.message}
          />
          {/* // <div className="col-span-full">
        //   <Label name="organizationType">
        //     Is your organization or activism for profit?
        //   </Label>
        //
        //   <Controller
        //     name="organizationType"
        //     control={control}
        //     rules={{
        //       required: 'Please select the best option for your organization',
        //     }}
        //     render={({ field: { value: current, onChange, ...field } }) => (
        //       <SelectInput
        //         {...field}
        //         current={
        //           IS_FOR_PROFIT_ORGANIZATION_OPTIONS.find(
        //             (c) => c.value === current
        //           ) || null
        //         }
        //         error={errors.organizationType?.message}
        //         options={IS_FOR_PROFIT_ORGANIZATION_OPTIONS}
        //         onChange={(option) => {
        //           onChange(option?.value || null);
        //           setFormData({
        //             organizationType:
        //               option?.value as PlaygroundRequestOrganizationType,
        //           });
        //         }}
        //       />
        //     )}
        //   />
        // </div> */}
          {/*// {!isFirstRender &&
        //   organizationType === PlaygroundRequestOrganizationType.Profit && (
        //     <div className="col-span-full">
        //       Playground is a platform that primarily supports not-for-profit
        //       organizations and activism. As a for-profit, we require you to
        //       offer compensation for your project. Please add this information
        //       to your post by selecting &ldquo;Paid&rdquo; in the request
        //       information section. We want to support as many vegan endeavors as
        //       possible, but also try our best to ensure the equitable
        //       distribution of limited volunteer labor. Thank you for your
        //       cooperation!
        //     </div>
        //   )} */}
          <TextArea
            placeholder="Please briefly describe your organization (e.g. your vision and mission, your impact, which countries you operate in, etc). By providing some context, you help the volunteers better understand how they will contribute towards your cause."
            error={errors.organizationDescription?.message}
            {...register('organizationDescription', {
              required: 'Organization description is required',
            })}
            style={{ resize: 'vertical' }}
            className="col-span-full"
            showRequiredMark
          >
            About your organization
          </TextArea>
        </form>
      </div>
    </>
  );
};

export default RequestorSignup;
