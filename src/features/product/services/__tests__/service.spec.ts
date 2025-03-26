import { apiFetcher } from '@/services/api-fetcher';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { productService } from '../service';
import { productListingStub } from '../stub';

vi.mock('@/services/api-fetcher', () => ({
  apiFetcher: vi.fn(),
}));

describe('ProductService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getInstance', () => {
    test('should return the same instance', () => {
      const instance1 = productService;
      const instance2 = productService;

      expect(instance1).toBe(instance2);
    });
  });

  describe('fetchProductById', () => {
    test('should call apiFetcher with correct parameters', async () => {
      vi.mocked(apiFetcher).mockResolvedValue({
        data: productListingStub(),
        ok: true,
      });

      await productService.fetchProductById('123');

      expect(apiFetcher).toHaveBeenCalledWith({
        mapper: expect.any(Function),
        url: '/123',
      });
    });

    test('should throw an error if apiFetcher fails', async () => {
      vi.mocked(apiFetcher).mockRejectedValue(new Error('API Error'));

      await expect(productService.fetchProductById('123')).rejects.toThrow(
        'API Error'
      );
    });
  });

  describe('fetchProducts', () => {
    test('should call apiFetcher with correct parameters', async () => {
      vi.mocked(apiFetcher).mockResolvedValue({
        data: productListingStub(),
        ok: true,
      });

      await productService.fetchProducts('/index');

      expect(apiFetcher).toHaveBeenCalledWith({
        mapper: expect.any(Function),
        url: '/index',
      });
    });

    test('should throw an error if apiFetcher fails', async () => {
      vi.mocked(apiFetcher).mockRejectedValue(new Error('API Error'));

      await expect(productService.fetchProducts('/index')).rejects.toThrow(
        'API Error'
      );
    });
  });
});
