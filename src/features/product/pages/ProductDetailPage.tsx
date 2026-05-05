import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Store,
  Ruler,
  ZoomIn,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { mockProduct, relatedProducts } from '@/features/product/data/mockProduct'

export default function ProductDetailPage() {
  useParams() // id available for future API integration
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0])
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  // Sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAddToCart = () => {
    toast.success('Added to cart!', {
      description: `${mockProduct.title} (${selectedSize}, ${selectedColor.name}) × ${quantity}`,
    })
  }

  const handleBuyNow = () => {
    toast.success('Proceeding to checkout...', {
      description: 'Redirecting you to the checkout page',
    })
  }

  const handleWishlist = () => {
    setWishlisted(!wishlisted)
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
  }

  const scrollToReviews = () => {
    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 md:px-8">
      {/* Breadcrumb */}
      <div className=" bg-muted/20">
        <div className="container py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Men's Clothing</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Shirts</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted group">
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.title}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-300',
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-110 cursor-zoom-in'
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              {mockProduct.isNew && (
                <Badge className="absolute top-4 left-4 bg-indigo-600 hover:bg-indigo-700">
                  New
                </Badge>
              )}
              {mockProduct.discount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-4 right-4 bg-red-600 hover:bg-red-700"
                >
                  -{mockProduct.discount}% OFF
                </Badge>
              )}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <ZoomIn className="w-3 h-3" />
                Click to zoom
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative aspect-square w-20 rounded-lg border-2 overflow-hidden transition-all',
                    selectedImage === index
                      ? 'border-indigo-600 ring-2 ring-indigo-200'
                      : 'border-muted hover:border-indigo-300'
                  )}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">{mockProduct.brand}</p>
              <h1 className="text-3xl font-bold text-foreground mb-3">{mockProduct.title}</h1>

              {/* Rating */}
              <button
                onClick={scrollToReviews}
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded">
                  <span className="font-semibold">{mockProduct.rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-muted-foreground">
                  {mockProduct.reviewCount.toLocaleString()} ratings & reviews
                </span>
              </button>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ₹{mockProduct.price.toLocaleString()}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{mockProduct.originalPrice.toLocaleString()}
                </span>
                <Badge variant="destructive" className="text-sm">
                  {mockProduct.discount}% OFF
                </Badge>
              </div>
              <p className="text-sm text-green-600 font-medium">
                You save ₹{(mockProduct.originalPrice - mockProduct.price).toLocaleString()}
              </p>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            <Separator />

            {/* Color Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">
                  Color: <span className="font-normal text-muted-foreground">{selectedColor.name}</span>
                </h3>
              </div>
              <div className="flex gap-3">
                {mockProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all relative',
                      selectedColor.name === color.name
                        ? 'border-indigo-600 ring-2 ring-indigo-200 scale-110'
                        : 'border-muted hover:border-indigo-300',
                      !color.available && 'opacity-50 cursor-not-allowed'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {!color.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Select Size</h3>
                <button className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {mockProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'w-14 h-12 rounded-lg border-2 font-medium text-sm transition-all',
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-muted hover:border-indigo-300'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">(Max 10 per order)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <Button
                  className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn('h-12 w-12', wishlisted && 'bg-red-50 border-red-200')}
                  onClick={handleWishlist}
                >
                  <Heart className={cn('w-5 h-5', wishlisted && 'fill-red-500 text-red-500')} />
                </Button>
              </div>
              <Button variant="outline" className="w-full h-12" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            <Separator />

            {/* Delivery Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    Delivery by <span className="text-green-600">{mockProduct.estimatedDelivery}</span>
                  </p>
                  {mockProduct.freeShipping && (
                    <p className="text-xs text-muted-foreground">Free shipping on this order</p>
                  )}
                </div>
              </div>
            </div>

            {/* Offers */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Available Offers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockProduct.offers.map((offer, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <offer.icon className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{offer.title}</p>
                      <p className="text-xs text-muted-foreground">{offer.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Seller Info */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Store className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{mockProduct.seller.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{mockProduct.seller.rating} rating</span>
                  </div>
                </div>
              </div>
              <Button variant="link" className="text-indigo-600 h-auto p-0" asChild>
                <Link to={`/seller/${mockProduct.seller.id}`}>View Store</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12" id="reviews-section">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
              <TabsTrigger value="description" className="text-base">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="text-base">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">
                Reviews ({mockProduct.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="qna" className="text-base">
                Q&A
              </TabsTrigger>
            </TabsList>

            {/* Description Tab */}
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{mockProduct.description}</p>
                <h4 className="text-base font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Premium cotton blend fabric for all-day comfort</li>
                  <li>• Slim fit design that flatters your physique</li>
                  <li>• Breathable material perfect for any season</li>
                  <li>• Easy care - machine washable</li>
                  <li>• Versatile style suitable for casual and smart-casual occasions</li>
                  <li>• Durable construction with reinforced stitching</li>
                </ul>
              </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specifications" className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Specification</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProduct.specifications.map((spec, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{spec.label}</TableCell>
                      <TableCell className="text-muted-foreground">{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rating Summary */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{mockProduct.rating}</div>
                        <div className="flex justify-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-5 h-5',
                                i < Math.floor(mockProduct.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on {mockProduct.reviewCount.toLocaleString()} reviews
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        {mockProduct.ratingDistribution.map((dist) => (
                          <div key={dist.stars} className="flex items-center gap-3">
                            <span className="text-sm w-8">{dist.stars} ★</span>
                            <Progress value={dist.percentage} className="flex-1 h-2" />
                            <span className="text-sm text-muted-foreground w-10 text-right">
                              {dist.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-4">
                  {mockProduct.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold">{review.name}</p>
                                <p className="text-xs text-muted-foreground">{review.date}</p>
                              </div>
                              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
                                <span className="font-semibold">{review.rating}</span>
                                <Star className="w-3 h-3 fill-white" />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Helpful ({review.helpful})
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Q&A Tab */}
            <TabsContent value="qna" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Questions & Answers</h3>
                  <Button variant="outline">Ask a Question</Button>
                </div>

                <div className="space-y-4">
                  {mockProduct.qna.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6 space-y-3">
                        <div>
                          <div className="flex items-start gap-2 mb-2">
                            <span className="font-semibold text-indigo-600 text-sm">Q:</span>
                            <p className="font-medium text-sm">{item.question}</p>
                          </div>
                          <p className="text-xs text-muted-foreground ml-5">
                            Asked by {item.askedBy}
                          </p>
                        </div>
                        <div className="ml-5 pl-4 border-l-2 border-indigo-200">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="font-semibold text-green-600 text-sm">A:</span>
                            <p className="text-sm text-muted-foreground">{item.answer}</p>
                          </div>
                          <p className="text-xs text-muted-foreground ml-5">
                            Answered on {item.answeredDate}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {relatedProducts.map((product) => (
                <Card key={product.id} className="w-60 shrink-0 group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                          <span className="font-semibold">{product.rating}</span>
                          <Star className="w-2.5 h-2.5 fill-white" />
                        </div>
                      </div>
                      <p className="text-lg font-bold">₹{product.price.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Sticky Add to Cart Bar (Mobile) */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg p-4 z-50 lg:hidden">
          <div className="flex gap-3">
            <Button
              className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1 h-12" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
