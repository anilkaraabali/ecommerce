import { fireEvent, render, screen } from '@testing-library/react';
import { useLocalStorage } from 'usehooks-ts';
import { describe, expect, test, vi } from 'vitest';

import { ProductListingData } from '../../types';
import { ProductCard } from '../ProductCard';

vi.mock('usehooks-ts', () => ({
  useLocalStorage: vi.fn(() => [[], vi.fn()]),
}));

const mockProduct: ProductListingData['data']['products'][0] = {
  id: '123',
  image: {
    alt: 'Sample Product Image',
    height: 300,
    url: '/images/sample.jpg',
    width: 300,
  },
  limitedEdition: true,
  newArrival: false,
  outOfStock: false,
  price: {
    currency: '$',
    value: 100,
  },
  salePrice: {
    currency: '$',
    value: 80,
  },
  title: 'Sample Product',
  url: '/product/sample',
  variants: {
    colors: [
      { name: 'Red', url: '/product/sample/red', value: '#FF0000' },
      { name: 'Blue', url: '/product/sample/blue', value: '#0000FF' },
    ],
  },
};

describe('ProductCard', () => {
  test('should render the product card with correct details', () => {
    render(<ProductCard index={0} product={mockProduct} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sample product/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toHaveTextContent('$100');
    expect(screen.getByTestId('product-sale-price')).toHaveTextContent('$80');
    expect(screen.getByTestId('product-discount')).toBeInTheDocument();
  });

  test('should display the limited edition label when applicable', () => {
    render(<ProductCard index={0} product={mockProduct} />);

    expect(screen.getByText('limitedEdition')).toBeInTheDocument();
  });

  test('should display the out of stock label when the product is out of stock', () => {
    render(
      <ProductCard index={0} product={{ ...mockProduct, outOfStock: true }} />
    );

    expect(screen.getByText('outOfStock')).toBeInTheDocument();
  });

  test('should render color variants when available', () => {
    render(<ProductCard index={0} product={mockProduct} />);

    expect(screen.getAllByRole('link', { name: /red|blue/i })).toHaveLength(2);
  });

  test('should toggle the favorite button state when clicked', () => {
    const setUserFavoritesMock = vi.fn();

    vi.mocked(useLocalStorage).mockReturnValue([
      [],
      setUserFavoritesMock,
      vi.fn,
    ]);

    render(<ProductCard index={0} product={mockProduct} />);

    const favoriteButton = screen.getByTestId('product-card-favorite');

    fireEvent.click(favoriteButton);

    expect(setUserFavoritesMock).toHaveBeenCalled();

    fireEvent.click(favoriteButton);

    expect(setUserFavoritesMock).toHaveBeenCalledWith(
      expect.not.arrayContaining([mockProduct.id])
    );
  });
});
