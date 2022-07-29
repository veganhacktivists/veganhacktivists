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
    title: 'SquareSpace website subscription',
    children: (
      <>
        <div>Valued at around $200, we&apos;ll pay for the first year!</div>
        <div>You own it - we&apos;ll help you design and maintain it!</div>
        <div>Easy to update with little to no experience.</div>
      </>
    ),
  },
  {
    image: designerImage,
    title: 'Professional design creation',
    children: (
      <>
        We&apos;ll design your group or project a new logo, or give your
        existing designs a facelift. This includes social media elements like
        banners, posts, icons and more.
      </>
    ),
  },
  {
    image: contentImage,
    title: 'Professional content creation',
    children: (
      <>
        We can help with any written content creation, including checking your
        existing content, grammar, spelling, and the creation of content that
        helps with promoting your work.
      </>
    ),
  },
  {
    image: callImage,
    title: 'Monthly advisory calls',
    children: (
      <>
        A 30 minute per month zoom call to help advise you and your team. Advice
        includes technology, marketing, strategy and other organizational
        subjects.
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
        In addition to $1000 in seed funding, VH Grants include:
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
