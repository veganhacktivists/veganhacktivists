import classNames from 'classnames';
import { useMemo } from 'react';
import type {
  IProjectFields,
  IRetiredProjectInfo,
} from '../../../../types/generated/contentful';
import { DarkButton } from '../../../decoration/buttons';
import RichText from '../../../decoration/richText';
import ContentfulImage from '../../contentfulImage';
import SimpleReactLightbox, {
  SRLWrapper,
  useLightbox,
} from 'simple-react-lightbox';

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
    [date]
  );

  const { openLightbox } = useLightbox();

  return (
    <>
      <div className="px-40 py-20 flex flex-col md:flex-row gap-10">
        <div
          className="flex flex-col gap-0 cursor-pointer group"
          // onClick={() => {
          //   openLightbox();
          // }}
        >
          <div className="h-80 w-80">
            <SRLWrapper>
              {retiredInfo.fields.screenshots.map((screenshot) => (
                <a key={screenshot.sys.id}>
                  <ContentfulImage alt="" image={screenshot} />
                </a>
              ))}
            </SRLWrapper>
          </div>
          <DarkButton
            onClick={() => {
              openLightbox(1);
            }}
            className="-mt-1"
          >
            View Screenshots
          </DarkButton>
        </div>
        <div className="flex flex-col gap-3 text-left">
          <div className="font-bold text-3xl">{name}</div>
          <div className="text-grey">
            <b>Created:</b> {createdDate}
            <div className="mx-2 inline-block bg-grey w-1 h-1 align-middle" />
            <b>Retired:</b> {retiredDate}
          </div>
          <div className="text-xl">
            <RichText document={description} />
          </div>
          <div className="flex flex-col md:flex-row mt-10 justify-start gap-10">
            {retiredInfo.fields.archiveUrl && (
              <DarkButton
                className="w-fit"
                href={encodeURI(retiredInfo.fields.archiveUrl)}
              >
                Archive
              </DarkButton>
            )}
            {repoUrl && (
              <DarkButton className="w-fit" href={repoUrl}>
                GitHub
              </DarkButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RetiredProject;
