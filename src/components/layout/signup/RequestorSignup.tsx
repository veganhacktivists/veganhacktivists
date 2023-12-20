import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ToolTip from '../../decoration/tooltip';

import { requestorSignupSchema } from 'lib/services/playground/schemas';
import TextInput from 'components/forms/inputs/textInput';
import Label from 'components/forms/inputs/label';
import SelectInput from 'components/forms/inputs/selectInput';
import TextArea from 'components/forms/inputs/textArea';

import type { z } from 'zod';
import { trpc } from 'lib/client/trpc';
import { DarkButton } from 'components/decoration/buttons';
import Spinner from 'components/decoration/spinner';

interface RequestorSignupProps {}

type RequestorSignupPayload = z.infer<typeof requestorSignupSchema>;

const RequestorSignup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<RequestorSignupPayload>({
    resolver: zodResolver(requestorSignupSchema),
  });

  const { mutate, isLoading } = trpc.playground.signup.useMutation();

  const onSubmit = useCallback((data: RequestorSignupPayload) => {
    mutate(data);
  }, [mutate]);



  return (
    <>
      <div className="px-10 bg-grey-background" id="contact-us">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5 py-10 mx-auto text-left lg:grid-cols-6 md:max-w-3xl"
        >
          <div className="text-xl col-span-full">Personal Information</div>
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="Name"
            showRequiredMark
            {...register('personal.name', { required: 'Please enter a name' })}
            error={errors.personal?.name?.message}
          />
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="they/them"
            {...register('personal.pronouns')}
            error={errors.personal?.pronouns?.message}
          >
            Pronouns
          </TextInput>
          <TextInput
            className="col-span-full"
            placeholder="Email"
            showRequiredMark
            {...register('personal.contactEmail', {
              required: 'The email is required',
            })}
            error={errors.personal?.contactEmail?.message}
          >
            Email
          </TextInput>
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="Phone"
            showRequiredMark
            type="tel"
            {...register('personal.phone', { required: 'The phone is required' })}
            error={errors.personal?.phone?.message}
          />
          <TextInput
            placeholder="www.website..."
            showRequiredMark
            {...register('organization.website', {
              required: 'Please enter a valid website',
            })}
            className="w-full col-span-full"
            error={errors.organization?.website?.message}
          />
          <TextInput
            showRequiredMark
            placeholder="Calendly"
            className="col-span-full"
            {...register('personal.calendlyUrl')}
            error={errors.personal?.calendlyUrl?.message}
          >
            Link to your Calendly
          </TextInput>
          <div className="text-xl col-span-full">Organization Information</div>
          <TextInput
            className="col-span-full"
            placeholder="Organization"
            {...register('organization.name', { required: false })}
            error={errors.organization?.name?.message}
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
            error={errors.organization?.description?.message}
            {...register('organization.description', {
              required: 'Organization description is required',
            })}
            style={{ resize: 'vertical' }}
            className="col-span-full"
            showRequiredMark
          >
            About your organization
          </TextArea>
          <DarkButton
            className="mb-10 text-center w-fit md:w-72"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 
              <Spinner />
             :  'Save' }
          </DarkButton>
        </form>
      </div>
    </>
  );
};

export default RequestorSignup;
