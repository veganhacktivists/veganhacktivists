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
    <div className={`w-1/8 bg-${color}`} style={{ width: 50, height: 50, minWidth: 50, minHeight: 50 }}>
      <Image alt={description} src={image} width={50} height={50} />
    </div>
    <p className="w-5/8 text-left md:text-xl">{description}</p>
  </div>
);

export default CandidateRequirement;
