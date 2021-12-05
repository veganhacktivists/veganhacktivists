import { FirstSubSection } from '../../../decoration/textBlocks';

import docImage from '../../../../../public/images/yearInReview/2021/comm_docs.png';
import safetyImage from '../../../../../public/images/yearInReview/2021/comm_safety.png';
import techImage from '../../../../../public/images/yearInReview/2021/comm_tech.png';
import CustomImage from '../../../decoration/customImage';

const growthPoints: {
  image: StaticImageData;
  header: string;
  content: React.ReactNode;
}[] = [
  {
    image: docImage,
    header: 'Documentation',
    content: (
      <>
        Growth doesn&apos;t just come in numbers, it comes into structure. We
        combined our documentation from 4 different platforms into one easily
        digestible section of our new website.
      </>
    ),
  },
  {
    image: techImage,
    header: 'Technology',
    content: (
      <>
        We&apos;ve embraced new technologies in order to be able to both improve
        the quality of our projects, and bring in more talent, such as those who
        prefer other languages like JavaScript.
      </>
    ),
  },
  {
    image: safetyImage,
    header: 'Safety',
    content: (
      <>
        We now have a Code of Conduct for our growing community, and require all
        leadership roles to complete our Effective Communication, Unconcious
        Bias, and Consent training courses in order to foster a healthy and
        inclusive environment.
      </>
    ),
  },
];

const imageDimension = 150;

const CommunityGrowth: React.FC = () => {
  return (
    <div>
      <FirstSubSection
        header="Encouraging community growth"
        firstWordsNum={1}
      />
      <div className="mx-auto md:w-2/3">
        {growthPoints.map(({ image, header, content }) => (
          <div key={header} className="flex flex-row gap-x-10 mb-10 last:mb-0">
            <div>
              <CustomImage
                src={image}
                alt=""
                layout="fixed"
                height={imageDimension}
                width={imageDimension}
              />
            </div>
            <div className="md:text-left">
              <h2 className="text-4xl font-bold text-grey mb-4">{header}</h2>
              <div className="text-2xl">{content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityGrowth;
