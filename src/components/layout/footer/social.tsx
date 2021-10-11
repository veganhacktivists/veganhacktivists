import {
  ExternalLinkButton,
  InstagramButton,
  PatreonButton,
  YoutubeButton,
} from '../../decoration/buttons';

import Link from 'next/link';

const Social: React.FC = () => {
  return (
    <div className="pt-10 text-left">
      <div className="text-4xl font-semibold uppercase mb-1">
        <code>Contact Us</code>
      </div>
      <div className="max-w-xs m-auto">
        If you have project ideas, suggestions, questions or anything else, get
        in touch!
      </div>
      <div className="font-bold pt-5 text-lg">
        <Link href="/contact">
          <a>hello@veganhacktivists.org</a>
        </Link>
      </div>
      <div className="flex gap-x-2 pt-5">
        <InstagramButton
          href="https://www.instagram.com/veganhacktivists/"
          aria-label="Follow us on Instagram!"
        />
        <PatreonButton
          href="https://www.patreon.com/veganhacktivists"
          aria-label="Support Us on Patreon!"
        />
        <YoutubeButton
          href="https://www.youtube.com/channel/UCCQtxGjnbbUwmSMOpvQz3Eg"
          aria-label="Subscribe to our Youtube channel!"
        />
      </div>
      <div className="pt-10 text-center">
        <ExternalLinkButton href="https://www.patreon.com/veganhacktivists">
          <div className="font-italic text-xl capitalize">Support us on</div>
          <div className="text-4xl uppercase font-mono font-semibold">
            Patreon
          </div>
        </ExternalLinkButton>
      </div>
    </div>
  );
};

export default Social;
