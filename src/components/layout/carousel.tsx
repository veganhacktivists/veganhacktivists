import type { Asset } from 'contentful';
import type { CarouselProps as ReactCarouselProps } from 'react-responsive-carousel';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import useWindowBreakpoint from '../../hooks/useWindowBreakpoint';
import useWindowSize from '../../hooks/useWindowSize';
import ContentfulImage from './contentfulImage';

interface CarouselProps
  extends Pick<ReactCarouselProps, 'autoFocus' | 'dynamicHeight'> {
  images: Asset[];
  onChangeItem: (index: number) => void;
  selectedItemIndex: number;
  onClickItem?: () => void;
  imageClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  selectedItemIndex,
  onChangeItem,
  onClickItem,
  imageClassName,
  ...props
}) => {
  const mdSize = useWindowBreakpoint('sm');
  const { width } = useWindowSize();
  const isMobile = (width || 0) < mdSize;

  return (
    <ReactCarousel
      autoPlay={false}
      selectedItem={selectedItemIndex}
      onChange={onChangeItem}
      showStatus={false}
      showThumbs={false}
      useKeyboardArrows
      onClickItem={onClickItem}
      className="relative"
      {...props}
    >
      {images.map((image, i) => (
        <div className={imageClassName} key={i}>
          <ContentfulImage
            objectFit={isMobile ? 'cover' : undefined}
            objectPosition={isMobile ? 'top' : undefined}
            alt=""
            image={image}
          />
        </div>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
