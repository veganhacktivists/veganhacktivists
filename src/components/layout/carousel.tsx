import type { Asset } from 'contentful';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import ContentfulImage from './contentfulImage';

interface CarouselProps {
  images: Asset[];
  onChangeItem: (index: number) => void;
  selectedItemIndex: number;
  onClickItem?: () => void;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  selectedItemIndex,
  onChangeItem,
  onClickItem,
}) => {
  return (
    <ReactCarousel
      autoPlay={false}
      selectedItem={selectedItemIndex}
      onChange={onChangeItem}
      showStatus={false}
      onClickItem={onClickItem}
    >
      {images.map((image, i) => (
        <div key={i}>
          <ContentfulImage alt="" image={image} />
        </div>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
