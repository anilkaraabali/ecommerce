import { describe, expect, test } from 'vitest';

import { productListingMapper } from '../listing.mapper';
import { productListingStub } from '../stub';

describe('productListingMapper', () => {
  test('should map raw product listing response to the desired format', () => {
    const result = productListingMapper(productListingStub());

    expect(result).toMatchSnapshot();
  });

  test('should correctly mark a product as in stock if any size is available', () => {
    const rawData = productListingStub();

    rawData.data.products = rawData.data.products.map((product) => ({
      ...product,
      variants: {
        ...product.variants,
        colors: product.variants.colors.map((color) => ({
          ...color,
          sizes: color.sizes.map((size) => ({ ...size, count: 0 })),
        })),
      },
    }));

    const result = productListingMapper(rawData);

    expect(result.data.products[0].outOfStock).toBeTruthy();
  });
});
