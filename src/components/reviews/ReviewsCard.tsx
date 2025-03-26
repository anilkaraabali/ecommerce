import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { FC, useMemo, useState } from 'react';
import ReactStars from 'react-stars';

import { Review } from './types';

interface ReviewCardProps {
  disableToggle?: boolean;
  maxLength?: number;
  review: Review;
}

const DEFAULT_MAX_LENGTH = 128;

const ReviewCard: FC<ReviewCardProps> = ({
  disableToggle = false,
  maxLength = DEFAULT_MAX_LENGTH,
  review,
}) => {
  const t = useTranslations('Common');

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    if (!disableToggle) {
      setIsExpanded((prev) => !prev);
    }
  };

  // If disableToggle is true, we want to show the full content, else we crop based on maxLength
  const contentToShow = useMemo(() => {
    if (disableToggle || isExpanded) {
      return review.content;
    } else if (review.content.length > maxLength) {
      return review.content.substring(0, maxLength) + '...';
    }

    return review.content;
  }, [disableToggle, isExpanded, review.content, maxLength]);

  return (
    <div className='flex flex-col items-start gap-4' data-testid='reviews-card'>
      <div className='flex w-full items-center justify-between gap-3'>
        <ReactStars edit={false} value={review.rating} />
        <p className='text-sm'>
          {dayjs(review.createdAt).format('DD MMM YYYY')}
        </p>
      </div>
      <p className='text-sm'> {contentToShow}</p>
      {review.content.length > maxLength && !disableToggle && (
        <button
          className='text-sm uppercase text-foreground underline'
          data-testid='reviews-card-toggle'
          onClick={toggleContent}
        >
          {isExpanded ? t('cta.showLess') : t('cta.showMore')}
        </button>
      )}
    </div>
  );
};

export type { ReviewCardProps };
export { ReviewCard };
