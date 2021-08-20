import React from 'react';
import Image from 'next/image';
import { LightButton } from '../../decoration/buttons';

export interface JobRoleProps {
  image: StaticImageData;
  color: string;
  title: string;
  description: React.ReactNode;
}

const JobRole: React.FC<JobRoleProps> = ({
  image,
  color,
  title,
  description,
}) => (
  <div className="flex flex-col justify-between gap-6 bg-gray-background">
    <div className={`bg-${color} md:h-40 flex flex-col justify-center py-5`}>
      <Image alt={title} src={image} objectFit="contain" />
    </div>
    <h2 className="text-2xl font-modo font-bold md:px-8">{title}</h2>
    <p className="md:px-8">{description}</p>
    <div className="mb-8">
      <LightButton>Apply Now</LightButton>
    </div>
  </div>
);

export default JobRole;
