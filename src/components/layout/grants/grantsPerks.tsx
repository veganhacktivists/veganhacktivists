import Image from 'next/image';
import PixelHeart from '../../../../public/images/VH_PixelHeart.png';
import callImage from '../../../../public/images/grants/call.jpg';
import squarespaceImage from '../../../../public/images/grants/squarespace.jpg';
import contentImage from '../../../../public/images/grants/content.jpg';
import designerImage from '../../../../public/images/grants/designer.jpg';

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
        <div>Valued at around $200 a year, or $17 a month.</div>
        <div>You own, we pay - just keep active!</div>
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
        includes technology, marketing, strategy and other organizational subjects.
      </>
    ),
  },
];

const Perk: React.FC<PerkProps> = ({ image, title, children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-10">
      <div>
        <Image src={image} alt="" layout="responsive" />
      </div>
      <div className="ml-0 md:ml-8 flex flex-col justify-center mt-6 md:mt-0 px-4 md:px-0">
        <h4 className="text-3xl font-semibold">{title}</h4>
        <p className="text-xl mt-6 leading-loose">{children}</p>
      </div>
    </div>
  );
};

const GrantsPerks: React.FC = () => {
  return (
    <div className="p-0 px-5 md:p-12 lg:p-0 pt-12 max-w-screen-lg mx-auto mt-10">
      <Image
        src={PixelHeart.src}
        width={PixelHeart.width * 0.5}
        height={PixelHeart.height * 0.5}
        alt="Heart icon"
      />
      <h3 className="p-4 md:p-0 text-4xl font-semibold mb-10 mt-12">
        In addition to $1000 in seed funding, VH Grants include:
      </h3>

      <div className="text-center md:text-left">
        {PERKS.map(({ image, title, children }, i) => (
          <Perk key={i} image={image} title={title}>
            {children}
          </Perk>
        ))}
      </div>
    </div>
  );
};

export default GrantsPerks;
