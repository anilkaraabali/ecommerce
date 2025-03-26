import Image from 'next/image';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Product } from '../types';

interface ProductGalleryCarouselProps {
  classNames?: {
    image?: string;
    root?: string;
  };
  images: Product['images'];
  onImageClick: (index: number) => void;
}

const ProductGalleryCarousel: FC<ProductGalleryCarouselProps> = ({
  classNames,
  images,
  onImageClick,
}) => (
  <Carousel className={classNames?.root} showThumbs={false}>
    {images.map((image, index) => (
      <button key={image.url} onClick={() => onImageClick(index)}>
        <Image
          alt={image.alt}
          className={classNames?.image}
          height={image.height}
          priority={index === 0}
          sizes='(max-width: 768px) 100vw, 50vw'
          src={image.url}
          width={image.width}
        />
      </button>
    ))}
  </Carousel>
);

export type { ProductGalleryCarouselProps };
export { ProductGalleryCarousel };
