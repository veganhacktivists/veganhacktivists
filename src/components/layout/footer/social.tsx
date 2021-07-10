import {
  ExternalLinkButton,
  InstagramButton,
  PatreonButton,
} from '../../decoration/buttons';

const Social: React.FC = () => {
  return (
    <div className="pt-10">
      <div className="text-4xl font-semibold uppercase">
        <code>Contact Us</code>
      </div>
      <div className="max-w-xs m-auto">
        If you have project ideas, suggestions, questions or anything else, get
        in touch!
      </div>
      <div className="font-bold pt-5 text-lg">
        <a href="mailto:hello@veganhacktivists.org">
          hello@veganhacktivists.org
        </a>
      </div>
      <div className="flex content-center justify-center px-3 pt-5">
        <InstagramButton
          href="https://www.instagram.com/veganhacktivists/"
          aria-label="Follow us on Instagram!"
        />
        <PatreonButton
          href="https://www.patreon.com/veganhacktivists"
          aria-label="Support Us on Patreon!"
        />
      </div>
      <div className="pt-10">
        <ExternalLinkButton href="https://www.patreon.com/veganhacktivists">
          <div className="font-italic text-xl capitalize">Support us on</div>
          <div className="text-4xl uppercase font-bold">Patreon</div>
        </ExternalLinkButton>
      </div>
    </div>
  );
};

export default Social;
