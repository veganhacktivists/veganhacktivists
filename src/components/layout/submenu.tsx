import React from "react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import classNames from "classnames";

interface Entry {
  title: string;
  link: Url;
  active?: boolean;
}

interface SubMenuProps {
  title: string;
  entries: Entry[];
}

const SubMenu: React.FC<SubMenuProps> = ({ title, entries }) => {
  return (
    <div className="h-28 bg-black flex flex-col justify-end">
      <div className="w-full flex">
        <div className="w-full"/>
        <div className="w-full">
          <h1 className="text-4xl text-white font-bold font-mono text-center pt-8">{title}</h1>
        </div>
        <div className="flex w-full justify-end h-20">
          { entries.map((entry) => <>
            <Link key={entry.title} href={entry.link} className={classNames("text-2xl px-4 font-semibold font-mono flex flex-col justify-center", entry.active ? 'text-black bg-white' : 'text-white')}>
              {entry.title}
            </Link>
          </>
          ) }
        </div>
      </div>
    </div>
  )
};

export default SubMenu;
