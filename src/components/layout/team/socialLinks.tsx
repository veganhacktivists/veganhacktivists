import {
  faLinkedinIn as linkedInIcon,
  faFacebookF as facebookIcon,
  faInstagram as instagramIcon,
  faTwitter as twitterIcon,
  faGithub as githubIcon,
  faYoutube as youtubeIcon,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faGlobe as websiteIcon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ISocialLinksFields } from '../../../types/generated/contentful';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import ahIcon from '../../../../public/images/projects/icons/ahub.svg';

import CustomImage from '../../decoration/customImage';

const SOCIAL_LINK_KEY_TO_ICON: Record<
  keyof ISocialLinksFields,
  FontAwesomeIconProps['icon']
> = {
  facebook: facebookIcon,
  twitter: twitterIcon,
  instagram: instagramIcon,
  github: githubIcon,
  website: websiteIcon,
  linkedIn: linkedInIcon,
  // TODO: Do we have an icon for this?
  activistHub: ahIcon,
  youtube: youtubeIcon,
  email: faEnvelope,
};

interface SocialLinksProps {
  socialLinks: ISocialLinksFields;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  socialLinks,
  className = '',
}) => {
  const hasAnySocialLinks = Object.keys(socialLinks).length > 0;
  if (!hasAnySocialLinks) {
    return null;
  }

  return (
    <div
      className={classNames(
        'flex flex-row gap-2 flex-wrap text-2xl',
        className
      )}
    >
      {Object.entries({ ...socialLinks }).map(([key, value]) => (
        <a key={key} href={value} target="_blank" rel="noreferrer">
          <div className="bg-grey-background text-grey-dark p-1">
            {key === 'activistHub' ? (
              <CustomImage
                src={ahIcon}
                alt=""
                layout="fixed"
                width={30}
                height={24}
              />
            ) : (
              <FontAwesomeIcon
                fixedWidth
                icon={SOCIAL_LINK_KEY_TO_ICON[key as keyof ISocialLinksFields]}
              />
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
