import { describe, expect, test } from 'vitest';

import { productDetailMapper } from '../detail.mapper';
import { productDetailStub } from '../stub';

describe('productDetailMapper', () => {
  test('should map raw product detail response to the desired format', () => {
    const result = productDetailMapper(productDetailStub());

    expect(result).toMatchSnapshot();
  });
});
