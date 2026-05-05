import type { Product } from '../types/product.types'

export const CATEGORIES = ['Men', 'Women', 'Kids', 'Accessories']
export const BRANDS = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Levi\'s', 'Uniqlo', 'Gap']
export const COLORS = [
  { label: 'Black', value: 'black', hex: '#1a1a1a' },
  { label: 'White', value: 'white', hex: '#f5f5f5' },
  { label: 'Red', value: 'red', hex: '#ef4444' },
  { label: 'Blue', value: 'blue', hex: '#3b82f6' },
  { label: 'Green', value: 'green', hex: '#22c55e' },
  { label: 'Yellow', value: 'yellow', hex: '#eab308' },
  { label: 'Purple', value: 'purple', hex: '#a855f7' },
  { label: 'Pink', value: 'pink', hex: '#ec4899' },
  { label: 'Gray', value: 'gray', hex: '#6b7280' },
  { label: 'Brown', value: 'brown', hex: '#92400e' },
]
export const PRICE_MIN = 0
export const PRICE_MAX = 5000

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'Classic White Sneakers', brand: 'Nike', category: 'Men', price: 2999, originalPrice: 4499, discountPercent: 33, rating: 4.5, reviewCount: 128, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', colors: ['white', 'black'], inStock: true, isNew: false },
  { id: '2', title: 'Floral Summer Dress', brand: 'Zara', category: 'Women', price: 1799, originalPrice: 2499, discountPercent: 28, rating: 4.2, reviewCount: 86, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop', colors: ['pink', 'yellow'], inStock: true, isNew: true },
  { id: '3', title: 'Slim Fit Chinos', brand: 'H&M', category: 'Men', price: 1299, originalPrice: 1799, discountPercent: 28, rating: 3.8, reviewCount: 54, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop', colors: ['gray', 'brown', 'black'], inStock: true, isNew: false },
  { id: '4', title: 'Kids Cartoon Tee', brand: 'Gap', category: 'Kids', price: 599, originalPrice: 899, discountPercent: 33, rating: 4.7, reviewCount: 203, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop', colors: ['red', 'blue', 'yellow'], inStock: false, isNew: false },
  { id: '5', title: 'Leather Crossbody Bag', brand: 'Zara', category: 'Accessories', price: 3499, originalPrice: 4999, discountPercent: 30, rating: 4.6, reviewCount: 91, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', colors: ['black', 'brown'], inStock: true, isNew: true },
  { id: '6', title: 'Running Shorts', brand: 'Adidas', category: 'Men', price: 899, originalPrice: 1299, discountPercent: 31, rating: 4.1, reviewCount: 67, image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&h=400&fit=crop', colors: ['black', 'blue'], inStock: true, isNew: false },
  { id: '7', title: 'Yoga Leggings', brand: 'Puma', category: 'Women', price: 1499, originalPrice: 1999, discountPercent: 25, rating: 4.8, reviewCount: 312, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop', colors: ['black', 'purple', 'gray'], inStock: true, isNew: false },
  { id: '8', title: 'Denim Jacket', brand: 'Levi\'s', category: 'Men', price: 3999, originalPrice: 5499, discountPercent: 27, rating: 4.4, reviewCount: 145, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop', colors: ['blue', 'black'], inStock: true, isNew: false },
  { id: '9', title: 'Casual Linen Shirt', brand: 'Uniqlo', category: 'Men', price: 1199, originalPrice: 1599, discountPercent: 25, rating: 4.3, reviewCount: 78, image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=400&fit=crop', colors: ['white', 'blue', 'gray'], inStock: true, isNew: false },
  { id: '10', title: 'Kids Rain Boots', brand: 'Gap', category: 'Kids', price: 799, originalPrice: 1199, discountPercent: 33, rating: 4.5, reviewCount: 59, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop', colors: ['red', 'yellow'], inStock: true, isNew: true },
  { id: '11', title: 'Oversized Hoodie', brand: 'H&M', category: 'Women', price: 1699, originalPrice: 2199, discountPercent: 23, rating: 4.0, reviewCount: 143, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop', colors: ['gray', 'white', 'pink'], inStock: true, isNew: false },
  { id: '12', title: 'Sporty Sunglasses', brand: 'Adidas', category: 'Accessories', price: 2199, originalPrice: 2999, discountPercent: 27, rating: 4.2, reviewCount: 37, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', colors: ['black', 'red'], inStock: false, isNew: false },
  { id: '13', title: 'Ankle Strap Heels', brand: 'Zara', category: 'Women', price: 2799, originalPrice: 3999, discountPercent: 30, rating: 3.9, reviewCount: 62, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop', colors: ['black', 'brown'], inStock: true, isNew: false },
  { id: '14', title: 'Performance Track Jacket', brand: 'Nike', category: 'Men', price: 3299, originalPrice: 4499, discountPercent: 27, rating: 4.6, reviewCount: 188, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', colors: ['black', 'blue', 'gray'], inStock: true, isNew: true },
  { id: '15', title: 'Woven Belt', brand: 'Levi\'s', category: 'Accessories', price: 499, originalPrice: 699, discountPercent: 29, rating: 4.1, reviewCount: 29, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', colors: ['black', 'brown'], inStock: true, isNew: false },
  { id: '16', title: 'Tie-Dye Co-ord Set', brand: 'H&M', category: 'Women', price: 2299, originalPrice: 2999, discountPercent: 23, rating: 4.4, reviewCount: 95, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4a9a?w=400&h=400&fit=crop', colors: ['purple', 'pink', 'yellow'], inStock: true, isNew: true },
]
