import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import ContentfulImage from '../contentfulImage';
import ShareDialog from '../shareDialog';

import { DarkButton, ShareButton } from 'components/decoration/buttons';
import Sprite, { pig } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';
import RichText from 'components/decoration/richText';

import type { IProject } from 'types/generated/contentful';

const TOP_DECORATION_SQUARES = [
  { color: 'white', size: 16, left: 0, top: 0 },
  { color: 'white', size: 16, right: 0, top: 0 },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'gray-lighter', size: 16, left: 0, bottom: 0 },
  { color: 'gray-background', size: 16, right: 0, top: 0 },
];

interface FeaturedProjectsProps {
  featuredProjects: IProject[];
}

const ProjectCard: React.FC<{ project: IProject }> = ({
  project: {
    fields: { name, description, url, date: dateStr, image, team, retiredInfo },
  },
}) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const shareInfo = useMemo(
    () => ({
      url,
      title: name,
      description: 'Take a look at this awesome project!',
      image,
    }),
    [image, name, url]
  );

  const openDialog = useCallback(() => {
    setShareDialogOpen(true);
  }, []);

  const isRetired = !!retiredInfo;

  const date = useMemo(() => {
    if (isRetired) {
      return 'This project has been retired';
    }
    const formatter = new Intl.DateTimeFormat('en', {
      month: 'short',
      year: 'numeric',
    });
    return formatter.format(new Date(dateStr));
  }, [dateStr, isRetired]);

  return (
    <>
      <div className="flex flex-col justify-center md:justify-start md:flex-row gap-12">
        <div className="aspect-square relative w-64 2xl:w-80 flex-shrink-0 mx-auto">
          <ContentfulImage image={image} alt={name} />
        </div>
        <div className="text-center md:text-left space-y-4 xl:max-w-sm">
          <h2 className="text-4xl font-bold">{name}</h2>
          <div>
            <span className="font-bold">
              <span className="text-grey">{date}</span>
              {team && (
                <>
                  {' '}
                  -{' '}
                  <Link
                    href={{
                      pathname: '/people/team',
                      hash: team.fields.isInactive ? null : team.fields.slug,
                    }}
                    scroll={true}
                  >
                    <a>
                      {team.fields.icon}{' '}
                      <span style={{ color: team.fields.color }}>
                        {team.fields.name}
                      </span>
                    </a>
                  </Link>
                </>
              )}
            </span>
          </div>
          <div className="text-lg">
            <RichText document={description} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
            <DarkButton href={url} capitalize={false} className="text-center">
              Visit
            </DarkButton>
            <ShareButton
              shareInfo={shareInfo}
              openAndInitiateShareDialog={openDialog}
            />
          </div>
        </div>
      </div>
      <ShareDialog
        open={shareDialogOpen}
        shareInfo={shareInfo}
        onClose={() => {
          setShareDialogOpen(false);
        }}
      />
    </>
  );
};

const FeaturedProjects = ({ featuredProjects }: FeaturedProjectsProps) => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="relative w-full overflow-hidden text-xl bg-grey-background">
        <div className="relative px-5 py-20 mx-auto gap-y-8">
          <SectionHeader className="mb-2" header={['Featured', 'PROJECTS']}>
            <p className="text-xl">
              Here are just a few of the projects we’ve built for the movement
              and in collaboration with other partners.
            </p>
          </SectionHeader>
          <ul className="grid xl:grid-cols-2 gap-y-20 gap-x-14 mx-auto justify-center">
            {featuredProjects.map((project) => (
              <li
                key={project.sys.id}
                className="mx-auto lg:even:mr-auto lg:odd:ml-auto"
              >
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Sprite image={pig} pixelsLeft={1} pixelsRight={0} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default FeaturedProjects;
