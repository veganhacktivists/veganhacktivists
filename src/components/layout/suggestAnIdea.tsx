import React from 'react';
import Image from 'next/image';
import { LightButton } from '../decoration/buttons';
import lampImage from '../../../public/images/Services-icon-project.png';

const SuggestAnIdea: React.FC = () => (
  <div className="bg-gray md:p-36 flex flex-row justify-center">
    <div className="bg-green flex p-2 md:p-8">
      <Image
        alt="Lamp"
        src={lampImage.src}
        width={300}
        height={300}
        objectFit="contain"
      />
    </div>
    <div className="bg-gray-background text-left p-3 md:p-10">
      <h4 className="text-4xl font-bold pb-5">Have an idea for a project?</h4>
      <p className="mb-3 md:mb-8">
        <strong className="font-bold">We&apos;re all ears</strong>! Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua
      </p>
      <LightButton href="/projects" className="w-72">
        Suggest a project idea
      </LightButton>
    </div>
  </div>
);

export default SuggestAnIdea;
