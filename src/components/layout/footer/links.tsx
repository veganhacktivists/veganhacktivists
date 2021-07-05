import classNames from "classnames";
import Link from "next/link";

interface ILinks {
  label: string;
  href?: string;
  links?: this[];
}

const links: ILinks[] = [
  {
    label: "About",
    href: "/about",
    links: [
      { label: "Our Story", href: "/our_story" },
      { label: "Our Values", href: "/our_values" },
      { label: "Our Mission", href: "/our_mission" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  {
    label: "People",
    href: "/people",
    links: [
      { label: "Our Team", href: "/our_team" },
      { label: "Advisors & Partners", href: "/our_team" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Join Us", href: "/join_us" },
];

const MyLink: React.FC<ILinks & { level?: number }> = ({
  label,
  href,
  links,
  level = 0,
}) => {
  const classes = classNames({ "font-black": level === 0, "pl-5": level > 0 });

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
    <div className="text-xl text-left">
      <ul>
        {links.map((link, i) => (
          <MyLink key={i} {...link} />
        ))}
      </ul>
    </div>
  );
};
export default Links;
