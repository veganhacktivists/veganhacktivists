import React from 'react';
import Image from 'next/image';

export interface CandidateRequirementProps {
  image: StaticImageData;
  description: React.ReactNode;
  color: 'green' | 'yellow' | 'magenta' | 'orange';
}

const iconSize = 60;

const CandidateRequirement: React.FC<CandidateRequirementProps> = ({
  image,
  description,
  color,
}) => (
  <div className="flex flex-col md:flex-row items-center gap-4 px-2 md:px-0">
    <div className={`bg-${color} p-1 pb-0`}>
      <Image
        src={image}
        alt=""
        width={iconSize}
        height={iconSize}
        layout="fixed"
        className="relative my-auto"
        priority
      />
    </div>
    <p className="w-5/8 text-center md:text-left md:text-xl">{description}</p>
  </div>
);

export default CandidateRequirement;
