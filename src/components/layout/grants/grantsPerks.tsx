import Image from 'next/image';
import PixelHeart from '../../../../public/images/VH_PixelHeart.png';
import websiteImage from '../../../../public/images/grants/website.png';
import squarespaceImage from '../../../../public/images/grants/squarespace.jpg';
import contentImage from '../../../../public/images/grants/content.jpg';
import designerImage from '../../../../public/images/grants/designer.jpg';

const GrantsPerks: React.FC = () => {
  return (
    <div className="p-0 px-5 md:p-12 lg:p-0 pt-12 max-w-screen-lg mx-auto">
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
        <div className="px-10 grid grid-cols-1 md:grid-cols-2 py-10">
          <div>
            <Image src={websiteImage} alt="website" />
          </div>
          <div className="ml-0 md:ml-8 flex flex-col justify-center mt-6 md:mt-0 px-4 md:px-0">
            <h4 className="text-3xl font-semibold">
              SquareSpace website subscription
            </h4>
            <p className="text-xl mt-6 leading-loose">
              <div>Valued at around $200 a year, or $17 a month.</div>
              <div>You own, we pay - just keep active!</div>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10">
          <div>
            <Image src={squarespaceImage} alt="" />
          </div>
          <div className="ml-0 md:ml-8 flex flex-col justify-center mt-6 md:mt-0 px-4 md:px-0">
            <h4 className="text-3xl font-semibold">
              Professional design creation
            </h4>
            <p className="text-xl mt-6 leading-loose">
              <div>
                We&apos;ll design your group or project a new logo, or give your
                existing designs a facelift. This includes social media elements
                like banners, posts, icons and more.
              </div>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10">
          <div>
            <Image src={contentImage} alt="" />
          </div>
          <div className="ml-0 md:ml-8 flex flex-col justify-center mt-6 md:mt-0 px-4 md:px-0">
            <h4 className="text-3xl font-semibold mt-6 md:mt-0">
              Professional content creation
            </h4>
            <p className="text-xl mt-6 leading-loose">
              <div>
                We can help with any written content creation, including
                checking your existing content, grammar, spelling, and the
                creation of content that helps with promoting your work.
              </div>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10">
          <div className="flex items-center">
            <Image src={designerImage} alt="" />
          </div>
          <div className="ml-0 md:ml-8 flex flex-col justify-center mt-6 md:mt-0 px-4 md:px-0">
            <h4 className="text-3xl font-semibold">Monthly advisory calls</h4>
            <p className="text-xl mt-6 leading-loose">
              <div>
                A 30 minute per month zoom call to help advise you and your
                team.
              </div>
              <div>
                Advice includes technology, marketing, strategy and more.
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantsPerks;
