import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Product } from '../../types';
import { ProductPrice } from '../ProductPrice';

describe('ProductPrice', () => {
  const price: Product['price'] = {
    currency: '$',
    value: 100.0,
  };

  const salePrice: Product['salePrice'] = {
    currency: '$',
    value: 80.0,
  };

  test('should render the regular price when no sale price is provided', () => {
    render(<ProductPrice price={price} salePrice={null} />);

    const priceElement = screen.getByTestId('product-price');

    expect(priceElement).not.toHaveClass('line-through');

    const salePriceElement = screen.queryByTestId('product-sale-price');

    expect(salePriceElement).not.toBeInTheDocument();
  });

  test('should render both sale price and regular price when a sale price is provided', () => {
    render(<ProductPrice price={price} salePrice={salePrice} />);

    const salePriceElement = screen.getByTestId('product-sale-price');

    expect(salePriceElement).toHaveClass('font-bold');

    const priceElement = screen.getByTestId('product-price');

    expect(priceElement).toHaveClass('line-through');
  });
});
