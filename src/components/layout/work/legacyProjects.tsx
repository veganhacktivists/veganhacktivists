import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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
    [image, name, url],
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
      <div className='flex flex-col lg:max-xl:flex-row gap-4 md:justify-start'>
        <div className='aspect-square relative w-64 md:w-80 flex-shrink-0 text-center md:text-left mx-auto md:mr-auto'>
          <ContentfulImage image={image} alt={name} />
        </div>
        <div className='space-y-4 xl:max-w-sm'>
          <h2 className='text-4xl font-bold'>{name}</h2>
          <div>
            <span className='font-bold'>
              <span className='text-grey'>{date}</span>
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
                    {team.fields.icon}{' '}
                    <span style={{ color: team.fields.color }}>
                      {team.fields.name}
                    </span>
                  </Link>
                </>
              )}
            </span>
          </div>
          <div className='text-lg'>
            <RichText document={description} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-9'>
            <DarkButton href={url} capitalize={false} className='text-center'>
              <FormattedMessage
                id='page.our-work.section.featured-projects.section.button.visit-project-page.label'
                defaultMessage='Visit'
              />
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

const LegacyProjects = ({ featuredProjects }: FeaturedProjectsProps) => {
  const intl = useIntl();

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />

      <div className='relative w-full overflow-hidden text-xl bg-grey-background'>
        <div className='relative px-5 py-20 mx-auto gap-y-8'>
          <SectionHeader
            className='mb-2'
            header={intl.formatMessage({
              id: 'page.our-work.section.featured-projects.section-header.headline',
              defaultMessage: 'Legacy <b>PROJECTS</b>',
            })}
          >
            <p className='text-xl md:w-1/2 mx-auto'>
              <FormattedMessage
                id='page.our-work.section.featured-projects.section-header.content'
                defaultMessage='Since its inception, VH has continuously evolved to meet the movement’s needs. What began as a modest idea to leverage tech for animals soon grew into an organization exploring novel projects and ideas. Over time, that work became the foundation for who we are today: a trusted provider of high-tech services within the movement. These early legacy projects helped shape VH into what it is now.'
              />
            </p>
          </SectionHeader>
          <ul className='grid grid-cols-1 xl:grid-cols-3 mx-auto w-fit gap-20 gap-y-20'>
            {featuredProjects.map((project) => (
              <li
                key={project.sys.id}
                className='mx-auto lg:even:mr-auto lg:odd:ml-auto'
              >
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Sprite image={pig} pixelsLeft={1} pixelsRight={1} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className='hidden md:block'
      />
    </>
  );
};

export default LegacyProjects;
