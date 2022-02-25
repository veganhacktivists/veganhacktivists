import { useMemo } from 'react';
import type {
  IProjectFields,
  IRetiredProjectInfo,
} from '../../../../types/generated/contentful';
import RichText from '../../../decoration/richText';
import ContentfulImage from '../../contentfulImage';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  year: 'numeric',
});

const RetiredProject: React.FC<
  IProjectFields & { retiredInfo: IRetiredProjectInfo }
> = ({ name, date, image, retiredInfo, description }) => {
  const createdDate = useMemo(
    () => dateFormatter.format(new Date(date)),
    [date]
  );

  const retiredDate = useMemo(
    () =>
      dateFormatter.format(
        new Date(
          // retiredInfo.fields.retireDate
          '2022-02-22'
        )
      ),
    [date]
  );

  return (
    <div className="p-40 flex flex-col md:flex-row gap-10">
      <div>
        <div className="aspect-square w-80">
          <ContentfulImage image={image} alt="" />
        </div>
      </div>
      <div className="flex flex-col text-left">
        <div className="font-bold text-3xl">{name}</div>
        <div className="text-grey">
          <b>Created:</b> {createdDate}
          <div className="mx-2 inline-block bg-grey-light w-1 h-1 align-middle" />
          <b>Retired:</b> {retiredDate}
        </div>
        <div>
          <RichText document={description} />
        </div>
      </div>
    </div>
  );
};

export default RetiredProject;
