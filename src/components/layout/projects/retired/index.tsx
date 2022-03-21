import classNames from 'classnames';
import { useMemo, useState } from 'react';
import type {
  IProjectFields,
  IRetiredProjectInfo,
} from '../../../../types/generated/contentful';
import { DarkButton } from '../../../decoration/buttons';
import RichText from '../../../decoration/richText';
import Carousel from '../../carousel';
import ContentfulImage from '../../contentfulImage';
import Modal from '../../modal';

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

  const [openModal, setOpenModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <>
      <div className="px-20 py-10 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-0 cursor-pointer group">
          <div className="h-80 aspect-square">
            <Carousel
              onClickItem={() => {
                setOpenModal(true);
              }}
              images={[image, ...retiredInfo.fields.screenshots]}
              selectedItemIndex={carouselIndex}
              onChangeItem={setCarouselIndex}
            />
          </div>
          <DarkButton
            onClick={() => {
              setOpenModal(true);
            }}
            className="-mt-1"
          >
            View Screenshots
          </DarkButton>
        </div>
        {openModal && (
          <Modal
            className="bg-white px-10"
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <div className="aspect-square">
              <Carousel
                images={[image, ...retiredInfo.fields.screenshots]}
                selectedItemIndex={carouselIndex}
                onChangeItem={setCarouselIndex}
              />
            </div>
          </Modal>
        )}
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
