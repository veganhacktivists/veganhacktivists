import { useState } from 'react';

import callImage from '../../../../public/images/grants/call.jpg';
import squarespaceImage from '../../../../public/images/grants/squarespace.jpg';
import contentImage from '../../../../public/images/grants/content.jpg';
import designerImage from '../../../../public/images/grants/designer.jpg';
import CustomImage from '../../decoration/customImage';
import { pixelHeart } from '../../../images/separators';

import useOnce from 'hooks/useOnce';

import type { StaticImageData } from 'next/image';

type PerkProps = React.PropsWithChildren<{
  image: StaticImageData;
  title: React.ReactNode;
}>;

const PERKS: PerkProps[] = [
  {
    image: squarespaceImage,
    title: 'Squarespace Website Subscription',
    children: (
      <>
        <div>
          Valued at $200, we cover the subscription cost for the first year.
        </div>
        <div>You own it, and we help you design and maintain it.</div>
        <div>Easy to update with little to no experience.</div>
      </>
    ),
  },
  {
    image: designerImage,
    title: 'Design Creation',
    children: (
      <>
        Depending on your needs, we design (or redesign) the branding and logo
        for your organization or project. We also provide digital assets, such
        as banners, icons, and any custom elements, for social media and your
        website.
      </>
    ),
  },
  {
    image: contentImage,
    title: 'Content Development',
    children: (
      <>
        We help craft any public-facing messages, including website copy. We
        offer our writing and editing skills at any stage of the process: from
        initial brainstorming to reviewing copy that helps promote your work.
      </>
    ),
  },
  {
    image: callImage,
    title: 'Monthly Advisory Check-ins',
    children: (
      <>
        A monthly 30-minute Zoom call to help advise you and your team. Topics
        include but are not limited to technology, marketing, strategy, and
        other aspects of your organization&apos;s growth and development.
      </>
    ),
  },
];

const Perk: React.FC<PerkProps> = ({ image, title, children }) => {
  return (
    <div className="grid grid-cols-1 py-10 md:grid-cols-2">
      <div>
        <CustomImage src={image} alt="" layout="responsive" />
      </div>
      <div className="flex flex-col justify-center px-4 mt-6 ml-0 md:ml-8 md:mt-0 md:px-0">
        <h4 className="text-3xl font-semibold">{title}</h4>
        <div className="mt-6 text-xl leading-loose">{children}</div>
      </div>
    </div>
  );
};

const GrantsPerks: React.FC = () => {
  const [perks, setPerks] = useState<PerkProps[]>([]);
  useOnce(() => {
    setPerks(PERKS);
  });
  return (
    <div className="max-w-screen-lg p-0 px-5 pt-12 mx-auto mt-10 md:p-12 lg:p-0">
      <CustomImage
        src={pixelHeart.src}
        width={pixelHeart.width * 0.5}
        height={pixelHeart.height * 0.5}
        alt="Heart icon"
      />
      <h3 className="p-4 mt-12 mb-10 text-4xl font-semibold md:p-0">
        In addition to $1,000 in seed funding, VH Grants include:
      </h3>

      <div className="text-center md:text-left">
        {perks.map(({ image, title, children }, i) => (
          <Perk key={i} image={image} title={title}>
            {children}
          </Perk>
        ))}
      </div>
    </div>
  );
};

export default GrantsPerks;
