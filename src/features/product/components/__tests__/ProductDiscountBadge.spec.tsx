import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { ProductDiscountBadge } from '../ProductDiscountBadge';

describe('ProductDiscountBadge', () => {
  test('should render the discount rate correctly', () => {
    render(<ProductDiscountBadge discountRate='20%' />);

    const badgeElement = screen.getByTestId('product-discount');

    expect(badgeElement).toHaveTextContent('20%');
  });

  test('should apply default styles', () => {
    render(<ProductDiscountBadge discountRate='20%' />);

    const badgeElement = screen.getByTestId('product-discount');

    expect(badgeElement).toHaveClass(
      'bg-black',
      'px-2',
      'py-1',
      'text-xs',
      'text-white'
    );
  });

  test('should apply custom classNames when provided', () => {
    const customClassNames = { badge: 'badge-class', base: 'base-class' };

    render(
      <ProductDiscountBadge classNames={customClassNames} discountRate='20%' />
    );

    const badgeElement = screen.getByTestId('product-discount');

    expect(badgeElement).toHaveClass('badge-class');
  });
});
