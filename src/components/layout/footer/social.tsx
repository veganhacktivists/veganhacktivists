import { faInstagram, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

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
        <Link href="https://www.instagram.com/veganhacktivists/" passHref>
          <a className="bg-white hover:bg-strawberry text-grey hover:text-white rounded-full px-1 py-2 mx-2">
            <FontAwesomeIcon size="2x" fixedWidth icon={faInstagram} />
          </a>
        </Link>
        <Link href="https://www.patreon.com/veganhacktivists" passHref>
          <a className="bg-white hover:bg-green-dark text-grey hover:text-white rounded-full px-1 py-2 mx-2">
            <FontAwesomeIcon size="2x" fixedWidth icon={faPatreon} />
          </a>
        </Link>
      </div>
      <div className="pt-10">
        <Link href="https://www.patreon.com/veganhacktivists" passHref>
          <a>
            <div className="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
              <div className="font-italic text-xl capitalize">
                Support us on
              </div>
              <div className="text-4xl uppercase font-bold">Patreon</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Social;
