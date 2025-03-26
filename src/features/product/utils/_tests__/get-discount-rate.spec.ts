import { describe, expect, test } from 'vitest';

import { productGetDiscountRate } from '../get-discount-rate';

describe('productGetDiscountRate', () => {
  const price = { currency: '$', value: 100 };

  test('should return null when there is no sale price', () => {
    const result = productGetDiscountRate(price, null);

    expect(result).toBeNull();
  });

  test('should return null if the discount is 0%', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 100 });

    expect(result).toBeNull();
  });

  test('should return a discount percentage when there is a valid discount', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 75 });

    expect(result).toBe('-25%');
  });

  test('should return a discount percentage rounded down', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 85 });

    expect(result).toBe('-15%');
  });

  test('should handle case where sale price is greater than price', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 120 });

    expect(result).toBeNull();
  });
});
