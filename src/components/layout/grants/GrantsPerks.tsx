import Image from 'next/image';
import PixelHeart from '../../../../public/images/VH_PixelHeart.png';

const GrantsPerks: React.FC = () => {
  return (
    <div className="p-12 max-w-screen-lg mx-auto">
      <Image
        src={PixelHeart.src}
        width={PixelHeart.width * 0.5}
        height={PixelHeart.height * 0.5}
        alt="Heart icon"
      />
      <h3 className="text-4xl font-semibold mb-10 mt-12">
        In addition to up to $1000 in seed funding, VH Grants include:
      </h3>
      <h4 className="text-3xl font-semibold mt-12">
        Free SquareSpace website subscription
      </h4>
      <p className="text-2xl mt-4 leading-loose">
        <div>Valued at around $200 a year, or $17 a month.</div>
        <div>You own, we pay - just keep active!</div>
      </p>
      <h4 className="text-3xl font-semibold mt-12">
        Free Professional content creation
      </h4>
      <p className="text-2xl mt-4 leading-loose">
        <div>We can create a new logo, or give existing designs a facelift</div>
        <div>We can design other elements like social media banners</div>
        <div>We can help with any written content</div>
        <div>Our writers can check your work, grammar, spelling, etc.</div>
        <div>We can help create content that describes your work</div>
      </p>
      <h4 className="text-3xl font-semibold mt-12">
        Free Monthly advisory calls
      </h4>
      <p className="text-2xl mt-4 leading-loose">
        <div>
          A 30 minute per month zoom call to help advise you and your team.
        </div>
        <div>Advice includes technology, marketing, strategy and more.</div>
      </p>
    </div>
  );
};

export default GrantsPerks;
