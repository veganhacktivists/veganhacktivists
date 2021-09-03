import classNames from 'classnames';
import Link from 'next/link';

interface ILinks {
  label: string;
  href?: string;
  links?: this[];
}

const links: ILinks[] = [
  {
    label: 'About',
    href: '/about',
    links: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Our Values', href: '/about/our-values' },
      { label: 'Our Mission', href: '/about/our-mission' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'People',
    href: '/people',
    links: [
      { label: 'Our Team', href: '/people/team' },
      { label: 'Advisors', href: '/people/advisors' },
      { label: 'Partners', href: '/people/partners' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/services#contact-us' },
  { label: 'Join Us', href: '/join' },
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
        {href ? <Link href={href}>{label}</Link> : { label }}
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

const Links: React.FC = () => {
  return (
    <ul className="text-xl text-left">
      {links.map((link, i) => (
        <MyLink key={i} {...link} />
      ))}
    </ul>
  );
};
export default Links;
