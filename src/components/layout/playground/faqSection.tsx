import classNames from 'classnames';
import React from 'react';

import SquareField from '../../decoration/squares';

import Accordion from './accordion';

import CustomLink from 'components/decoration/link';
import { JOIN_PLAYGROUND_URL } from 'lib/discord/constants';

const faqEntries = [
  {
    title: 'What is VH: Playground exactly?',
    children: (
      <>
        <p>
          Playground is a community of passionate vegan volunteers looking to
          support animal advocates and organizations by volunteering their time
          and skills. Their diverse skill sets include software development,
          design, content creation, marketing, and much more. Anyone can join
          this community and apply to help you with your request.
        </p>
        <p>
          Playground is separate from the Vegan Hacktivists team, and aims to
          increase the capacity in which we can support your work for the
          animals.
        </p>
      </>
    ),
  },
  {
    title: 'How does it work if I want to submit a request for a project?',
    children: (
      <>
        <p>
          If you&apos;re an organization or animal advocate, click on
          &ldquo;Submit a request&rdquo; and fill out the form to let us know
          exactly what you need help with. We&apos;ll review your request to
          make sure it fits our community standards, and then approve or decline
          it. If approved, you will get an email confirming when your request is
          live and public. Then all you have to do is wait for volunteers to
          apply! We&apos;ll review all applications, vet them, and then approve
          the most suitable one. You&apos;ll automatically be connected with the
          volunteer over email with a Calendy link.
        </p>
      </>
    ),
  },
  {
    title: 'How does it work if I want to volunteer my time here?',
    children: (
      <>
        <p>
          All vegans who can code, design, edit, translate, research, analyze
          data, or contribute other skills are welcome! Simply browse the list
          of requests <CustomLink href="/playground">here</CustomLink> and apply
          to the ones most relevant to your skill set. Make sure you can commit
          a reasonable amount of time and have the ability or qualifications to
          do the work properly. If you&apos;re matched with a project, remember
          to communicate your progress and be mindful of the project&apos;s
          deadline.
        </p>
        <p>
          Fill out your information below the request and we&apos;ll review your
          application. You&apos;ll get an email to tell you whether your help
          has been approved or declined. If approved, we&apos;ll automatically
          connect you to the requestor with a Calendly link so that you can get
          started!
        </p>
      </>
    ),
  },
  {
    title: 'Are people applying to my request qualified?',
    children: (
      <>
        <p>
          Anyone can join this community and apply to volunteer. However, we
          carefully review every application. While we can&apos;t guarantee the
          quality of work, we do our best to make sure the applicant has the
          required skills and background for your project. Our review process
          includes checking their LinkedIn, portfolio, resume, past work, and
          social media profiles. Depending on the request, we may also interview
          the applicant by phone or email.
        </p>
      </>
    ),
  },
  {
    title: "I'd rather get support from the VH team, is that possible?",
    children: (
      <>
        <p>
          Unfortunately, our core team of developers, designers, and specialists
          have both internal and external projects that they&apos;re dedicating
          their time toward. Playground was designed to increase our capacity by
          leveraging our network of vegan volunteers who are enthusiastic to
          help.
        </p>
      </>
    ),
  },
  {
    title: 'How long does it take for my request/application to get accepted?',
    children: (
      <>
        <p>
          If you&apos;re submitting a request for support, it will usually be
          reviewed and live within 24 hours. To find a suitable volunteer for
          your project, it can take anywhere from one to seven days. We thank
          you for your patience as we&apos;re still new and growing!
        </p>
        <p>
          If you&apos;re applying to help someone with a request, you should get
          an email within 24 to 48 hours confirming your application status.
        </p>
      </>
    ),
  },
  {
    title: 'As a volunteer, can I stay updated on new requests that come in?',
    children: (
      <>
        <p>
          Absolutely! Join our{' '}
          <CustomLink href={JOIN_PLAYGROUND_URL}>
            Playground Discord server
          </CustomLink>{' '}
          - all new requests get posted there. Turn on notifications to get
          alerts whenever a new request comes in. You can also chat with other
          volunteers, discuss your experiences, and get support from the
          Playground community. We look forward to seeing you soon!
        </p>
      </>
    ),
  },
].map((entry) => ({
  ...entry,
  children: <div className="flex flex-col gap-5">{entry.children}</div>,
}));
interface FaqSectionProps {
  design?: 'dark' | 'light';
}

const FaqSection: React.FC<FaqSectionProps> = ({ design }) => {
  return (
    <div>
      <SquareField
        className="hidden md:block"
        squares={[
          {
            color: `${
              design === 'dark'
                ? 'grey'
                : design === 'light'
                ? 'grey-light'
                : 'white'
            }`,
            size: 16,
            right: 0,
            top: 0,
          },
          {
            bottom: 0,
            left: 0,
            color: 'grey',
          },
        ]}
      />
      <div
        className={classNames(
          design === 'dark'
            ? 'bg-[#3D3D3D]'
            : design === 'light'
            ? 'bg-white'
            : 'bg-grey-background',
          'py-10'
        )}
      >
        <span
          id="faq"
          className={classNames(
            design === 'dark' ? 'text-white' : 'text-black',
            'text-3xl font-bold font-mono'
          )}
        >
          Frequently Asked Questions
        </span>
        <div className="mb-4 mt-9">
          <Accordion entries={faqEntries} design={design} />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
