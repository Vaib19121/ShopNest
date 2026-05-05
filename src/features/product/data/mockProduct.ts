import { Gift, ShieldCheck, Truck } from 'lucide-react'

export const mockProduct = {
  id: '1',
  brand: 'Premium Fashion',
  title: 'Classic Cotton Blend Casual Shirt - Slim Fit',
  rating: 4.5,
  reviewCount: 1247,
  originalPrice: 1999,
  price: 1299,
  discount: 35,
  description:
    'Elevate your casual wardrobe with this premium cotton blend shirt. Designed for comfort and style, featuring a modern slim fit cut that flatters all body types.',
  images: [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    'https://images.unsplash.com/photo-1598032895397-b9af2f0e0e8c?w=600&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
  ],
  colors: [
    { name: 'Navy Blue', hex: '#1e3a8a', available: true },
    { name: 'White', hex: '#ffffff', available: true },
    { name: 'Black', hex: '#000000', available: true },
    { name: 'Gray', hex: '#6b7280', available: false },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  isNew: true,
  estimatedDelivery: 'Thu, 8 May',
  freeShipping: true,
  seller: {
    name: 'Fashion Hub Store',
    rating: 4.7,
    id: 'seller123',
  },
  offers: [
    {
      icon: Gift,
      title: 'Bank Offer',
      description: '10% instant discount on HDFC Bank Cards',
    },
    {
      icon: ShieldCheck,
      title: 'No Cost EMI',
      description: 'Available on orders above ₹3000',
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'On orders above ₹500',
    },
  ],
  specifications: [
    { label: 'Material', value: '60% Cotton, 40% Polyester' },
    { label: 'Pattern', value: 'Solid' },
    { label: 'Fit', value: 'Slim Fit' },
    { label: 'Sleeve', value: 'Full Sleeve' },
    { label: 'Collar', value: 'Spread Collar' },
    { label: 'Weight', value: '280g' },
    { label: 'SKU', value: 'SHT-2024-NAVY-M' },
    { label: 'Country of Origin', value: 'India' },
  ],
  reviews: [
    {
      id: '1',
      name: 'Rajesh Kumar',
      avatar: 'RK',
      rating: 5,
      date: '15 Apr 2026',
      comment:
        'Excellent quality shirt! The fabric is soft and breathable. Perfect fit and the color is exactly as shown. Highly recommended!',
      helpful: 24,
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatar: 'PS',
      rating: 4,
      date: '10 Apr 2026',
      comment:
        'Good product overall. The material is nice but I found the sizing a bit off. Ordered L but fits more like M. Quality is great though.',
      helpful: 15,
    },
    {
      id: '3',
      name: 'Amit Patel',
      avatar: 'AP',
      rating: 5,
      date: '5 Apr 2026',
      comment:
        'Amazing value for money! Been wearing it for 2 weeks and it still looks brand new. The slim fit is perfect and very comfortable.',
      helpful: 32,
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 4,
      date: '1 Apr 2026',
      comment:
        'Nice shirt, good fabric quality. Delivery was quick. Only issue is the color is slightly darker than the picture.',
      helpful: 8,
    },
  ],
  ratingDistribution: [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ],
  qna: [
    {
      id: '1',
      question: 'Is this shirt suitable for formal occasions?',
      answer:
        'This shirt is designed for casual wear, but can work for smart-casual settings. For formal occasions, we recommend checking our formal shirt collection.',
      askedBy: 'Vikram M.',
      answeredDate: '20 Apr 2026',
    },
    {
      id: '2',
      question: 'Does it shrink after wash?',
      answer:
        'Minimal shrinkage expected (1-2%). We recommend washing in cold water and air drying for best results.',
      askedBy: 'Neha R.',
      answeredDate: '18 Apr 2026',
    },
    {
      id: '3',
      question: 'What is the return policy?',
      answer:
        '30-day easy returns. If you are not satisfied with the product, you can return it within 30 days of delivery for a full refund.',
      askedBy: 'Karan S.',
      answeredDate: '15 Apr 2026',
    },
  ],
}

export const relatedProducts = [
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&q=80',
    title: 'Denim Casual Shirt',
    price: 1499,
    rating: 4.3,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=80',
    title: 'Checkered Formal Shirt',
    price: 1799,
    rating: 4.6,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&q=80',
    title: 'Linen Summer Shirt',
    price: 1899,
    rating: 4.4,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=300&q=80',
    title: 'Oxford Button Down',
    price: 1699,
    rating: 4.7,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1603252109360-909fbb60ca3b?w=300&q=80',
    title: 'Polo Casual Shirt',
    price: 1299,
    rating: 4.2,
  },
]
