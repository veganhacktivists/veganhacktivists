import React from 'react';
import Image from 'next/image';

interface CandidateRequirementProps {
  image: StaticImageData;
  description: string;
  color: 'green' | 'yellow' | 'magenta' | 'orange';
}

const CandidateRequirement: React.FC<CandidateRequirementProps> = ({
  image,
  description,
  color,
}) => (
  <div className="flex flex-row items-center gap-4">
    <div className={`flex-shrink w-1/6 bg-${color}`}>
      <Image
        alt={description}
        src={image}
        width={100}
        height={100}
        placeholder="blur"
      />
    </div>
    <p className="flex-grow w-5/6 text-left md:text-3xl">{description}</p>
  </div>
);

export default CandidateRequirement;
