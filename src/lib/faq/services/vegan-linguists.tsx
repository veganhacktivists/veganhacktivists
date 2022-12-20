import type { FAQService } from '../service';

const service: FAQService = {
  keywords: [['vegan', 'linguist']],
  suggestions: [
    {
      keywords: [
        'accuracy',
        'accurate',
        'qualification',
        'qualified',
        'quality',
        'vet',
        'vetted',
        'vetting',
      ],
      text: (
        <>
          <strong>Pro tip! </strong>
          Anyone is able to sign up to be a translator for the Vegan Linguists
          website. We do not test for language fluency, nor do we require a
          background in translation. In order to ensure accurate translations,
          we have built a review system into the translation process.
        </>
      ),
    },
    {
      keywords: [
        ['your', 'team'],
        ['your', 'translators'],
        ['your', 'volunteers'],
      ],
      text: (
        <>
          <strong>Quick note! </strong>
          The translators on the Vegan Linguists website are not affiliated with
          Vegan Hacktivists. We provide the platform to connect translators and
          those in need of translations, but we have no oversight or direct
          lines of communication with the volunteers.
        </>
      ),
    },
    {
      keywords: [['how', 'long'], 'estimate', 'deadline', 'timeline'],
      text: (
        <>
          <strong>Heads up! </strong>
          Because the translators on the Vegan Linguists website are volunteers
          who are unaffiliated with Vegan Hacktivists, we cannot estimate how
          long translations will take.
        </>
      ),
    },
  ],
};

export default service;
