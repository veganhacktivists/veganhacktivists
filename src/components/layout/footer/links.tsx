import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import VH_footer_candid_guidestar_badge from '../../../../public/images/footer/VH_footer_candid_guidestar_badge.png';
import VH_one_percent_for_the_planet_badge from '../../../../public/images/footer/VH_one_percent_for_the_planet_badge.png';

import CustomImage from 'components/decoration/customImage';
import CustomLink from 'components/decoration/link';

import type { IntlShape } from 'react-intl';

interface ILinks {
  label: string;
  href?: string;
  links?: this[];
}

const getLinks: (intl: IntlShape) => ILinks[] = (intl) => [
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.about.label',
      defaultMessage: 'About',
    }),
    href: '/about',
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.services.label',
      defaultMessage: 'Services',
    }),
    href: '/services',
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.work.label',
      defaultMessage: 'Our Work',
    }),
    href: '/work',
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.people.label',
      defaultMessage: 'People',
    }),
    href: '/people/team',
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.blog.label',
      defaultMessage: 'Blog',
    }),
    href: '/blog',
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.contact.label',
      defaultMessage: 'Contact Us',
    }),
    href: '/contact',
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.join.label',
      defaultMessage: 'Join Us',
    }),
    href: '/join',
  },
  {
    label: intl.formatMessage({
      id: 'layout.footer.navigation-item.privacy-policy.label',
      defaultMessage: 'Privacy Policy',
    }),
    href: '/privacy-policy',
  },
];

const MyLink: React.FC<ILinks & { level?: number }> = ({
  label,
  href,
  links = [],
  level = 0,
}) => {
  const classes = classNames({ 'font-black': level === 0, 'pl-5': level > 0 });

  return (
    <li>
      <span className={classes}>
        {href ? <Link href={href}>{label}</Link> : label}
      </span>
      {links && (
        <ul>
          {links.map((link, i) => (
            <MyLink key={i} {...link} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Badges: React.FC = () => {
  return (
    <div className='pt-10 md:pt-[1.7rem] flex flex-row gap-8 w-fit md:w-auto mx-auto md:mx-0'>
      <div>
        <CustomLink href='https://www.guidestar.org/profile/92-3997981'>
          <CustomImage
            src={VH_footer_candid_guidestar_badge}
            alt='Badge: Platinum Transparency 2025 - Candid.'
            width={Math.floor(VH_footer_candid_guidestar_badge.width * 0.371)}
            height={Math.floor(VH_footer_candid_guidestar_badge.height * 0.371)}
          />
        </CustomLink>
      </div>
      <div>
        <CustomLink href='https://directories.onepercentfortheplanet.org/profile/vegan-hacktivists'>
          <CustomImage
            src={VH_one_percent_for_the_planet_badge}
            alt='Badge: one percent for the Planet'
            width={Math.floor(
              VH_one_percent_for_the_planet_badge.width * 0.14575,
            )}
            height={Math.floor(
              VH_one_percent_for_the_planet_badge.height * 0.14575,
            )}
          />
        </CustomLink>
      </div>
    </div>
  );
};

const Links: React.FC = () => {
  const intl = useIntl();

  return (
    <div className='pt-10 md:pt-0 text-xl text-center md:text-left'>
      <ul>
        {getLinks(intl).map((link, i) => (
          <MyLink key={i} {...link} />
        ))}
      </ul>
      <Badges />
    </div>
  );
};
export default Links;
