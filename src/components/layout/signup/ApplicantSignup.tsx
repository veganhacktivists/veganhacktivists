import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TimePerWeek } from '@prisma/client';

import { applicantSignupSchema } from 'lib/services/playground/schemas';
import TextInput from 'components/forms/inputs/textInput';
import Label from 'components/forms/inputs/label';
import SelectInput from 'components/forms/inputs/selectInput';
import { DarkButton } from 'components/decoration/buttons';
import Spinner from 'components/decoration/spinner';
import type { z } from 'zod';
import { SourceLabel, TimePerWeekLabel } from '../playground/applyForm';

type ApplicantSignupPayload = z.infer<typeof applicantSignupSchema>;

const ApplicantSignup = () => {
  const {
    control,
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ApplicantSignupPayload>({
    resolver: zodResolver(applicantSignupSchema),
  });

  return (
    <>
      <div className="px-10 bg-grey-background" id="contact-us">
        <form
          className="grid grid-cols-1 gap-5 py-10 mx-auto text-left lg:grid-cols-6 md:max-w-3xl"
        >
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="Name"
            showRequiredMark
            {...register('name', { required: 'Please enter a name' })}
            error={errors.name?.message}
          >
            Name
          </TextInput>
          <TextInput
            className="lg:col-span-3 col-span-full"
            placeholder="they/them"
            {...register('pronouns')}
            error={errors.pronouns?.message}
          >
            Pronouns
          </TextInput>
          <TextInput
            className="lg:col-span-3"
            placeholder="Email"
            showRequiredMark
            {...register('contactEmail', {
              required: 'The email is required',
            })}
            error={errors.contactEmail?.message}
          >
            Email
          </TextInput>
          <TextInput
            className="lg:col-span-3"
            placeholder="Personal Website"
            showRequiredMark
            {...register('website', {
              required: 'Please enter a valid website',
            })}
            error={errors.contactEmail?.message}
          >
           Personal website or potfolio link
          </TextInput>
          <TextInput
            className="md:col-span-2"
            placeholder="@yourhandle"
            showRequiredMark
            {...register('twitter')}
            error={errors.twitter?.message}
          >
            Twitter
          </TextInput>
          <TextInput
            className="md:col-span-2"
            placeholder="@yourhandle"
            showRequiredMark
            {...register('instagram')}
            error={errors.instagram?.message}
          >
           Instagram
          </TextInput>
          <TextInput
            className="md:col-span-2"
            placeholder="linkedin.com/in/"
            showRequiredMark
            {...register('linkedin')}
            error={errors.linkedin?.message}
          >
           LinkedIn
          </TextInput>
          <TextInput
            className="col-span-full md:col-span-3"
            error={errors.calendlyUrl?.message}
            {...register('calendlyUrl')}
            placeholder="calendly.com/yourname"
          >
            Calendly link (or alternative scheduling link)
          </TextInput>
          <div className="relative bottom-0 self-end col-span-full md:col-span-3">
            <Label
              name="availableTimePerWeek"
              error={errors.availableTimePerWeek?.message}
              showRequiredMark
            >
              Available time per week
            </Label>
            <Controller
              control={control}
              {...register('availableTimePerWeek', { required: true })}
              render={({ field: { value: current, onChange, ...field } }) => (
                <SelectInput
                  {...field}
                  placeholder="Select an option"
                  onChange={(option) => onChange(option?.value)}
                  current={{ value: current, label: TimePerWeekLabel[current] }}
                  options={Object.keys(TimePerWeek).map((time) => ({
                    value: time,
                    label: TimePerWeekLabel[time as TimePerWeek],
                  }))}
                />
              )}
            />
          </div>
        <div className="col-span-full">
          <Label error={errors.source?.message} name="source">
            Where did you hear about Playground?
          </Label>
          <Controller
            name="source"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <SelectInput
                {...field}
                current={
                  value ? { value: value, label: SourceLabel[value] } : null
                }
                onChange={(option) => onChange(option?.value)}
                options={Object.entries(SourceLabel).map(([value, label]) => ({
                  value,
                  label,
                }))}
              />
            )}
          />
        </div>
          <DarkButton
            className="mb-10 text-center w-fit md:w-72"
            type="submit"
          >
            {'Save'}
          </DarkButton>
        </form>
      </div>
    </>
  );
};

export default ApplicantSignup;
