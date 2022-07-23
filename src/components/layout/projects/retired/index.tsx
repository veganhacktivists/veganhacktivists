import { useMemo } from 'react';

import { GreyButton } from '../../../decoration/buttons';
import GreyBox from '../../../decoration/greyBox';
import RichText from '../../../decoration/richText';
import ContentfulImage from '../../contentfulImage';

import type {
  IProjectFields,
  IRetiredProjectInfo,
} from '../../../../types/generated/contentful';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  year: 'numeric',
});

const RetiredProject: React.FC<
  IProjectFields & { retiredInfo: IRetiredProjectInfo }
> = ({ name, date, image, retiredInfo, description, repoUrl }) => {
  const createdDate = useMemo(
    () => dateFormatter.format(new Date(date)),
    [date]
  );

  const retiredDate = useMemo(
    () => dateFormatter.format(new Date(retiredInfo.fields.retireDate)),
    [retiredInfo.fields.retireDate]
  );

  return (
    <>
      <div className="flex flex-col gap-10 px-10 py-10 md:px-20 lg:flex-row">
        <div>
          <div className="max-h-80 aspect-square" style={{ width: 280 }}>
            <ContentfulImage image={image} alt={`${name} logo`} />
          </div>
        </div>
        <div className="flex flex-col gap-3 text-left">
          <div className="text-3xl font-bold">{name}</div>
          <div className="text-xl">
            <RichText document={description} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <GreyBox title="Release date">{createdDate}</GreyBox>
          <GreyBox title="Retired date">{retiredDate}</GreyBox>
          <div className="flex flex-col gap-3 md:flex-row">
            {retiredInfo.fields.archiveUrl && (
              <GreyButton
                className="md:w-fit"
                href={encodeURI(retiredInfo.fields.archiveUrl)}
              >
                Archive
              </GreyButton>
            )}
            {repoUrl && (
              <GreyButton className="md:w-fit" href={repoUrl}>
                GitHub
              </GreyButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RetiredProject;
