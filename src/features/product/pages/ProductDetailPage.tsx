import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProductDetail } from "@/features/product/hooks/useProduct";
import type { ProductColor } from "@/features/product/types/productDetail.types";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useAddToCart } from "@/features/cart/hooks/useCartHooks";
import { useAuthStore } from "@/features/Auth/store/authStore";
import {
    useWishlistQuery,
    useAddToWishlist,
    useRemoveFromWishlist,
} from "@/features/wishlist/hooks/useWishlistHooks";
import { ProductImageGallery } from "@/features/product/components/ProductImageGallery";
import { ProductInfo } from "@/features/product/components/ProductInfo";
import { ProductTabs } from "@/features/product/components/ProductTabs";
import { RelatedProducts } from "@/features/product/components/RelatedProducts";
import { StickyCartBar } from "@/features/product/components/StickyCartBar";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading, isError } = useProductDetail(Number(id));
    const addItem = useCartStore((s) => s.addItem);
    const { mutate: addToCartApi } = useAddToCart();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const { data: wishlistData } = useWishlistQuery();
    const { mutate: addToWishlistApi } = useAddToWishlist();
    const { mutate: removeFromWishlistApi } = useRemoveFromWishlist();

    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
        null,
    );
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showStickyBar, setShowStickyBar] = useState(false);

    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors[0] ?? null);
            setSelectedSize(product.sizes[0] ?? "");
        }
    }, [product]);

    // Sticky bar on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowStickyBar(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAddToCart = () => {
        if (!product) return;

        if (isAuthenticated) {
            addItem({
                id: product.id,
                cartItemId: null,
                name: product.title,
                brand: product.brand,
                price: product.price,
                originalPrice: product.originalPrice,
                discountPercentage: product.discountPercentage,
                image: product.images[0] ?? "",
                color: selectedColor?.name ?? null,
                size: selectedSize || null,
                inStock: product.inStock,
                quantity,
            });
            addToCartApi({ productId: product.id, quantity });
            toast.success("Added to cart!", {
                description: `${product.title} × ${quantity}`,
                action: {
                    label: "View Cart",
                    onClick: () => window.location.assign("/cart"),
                },
            });
        } else {
            toast.error("Sign in to add to cart");
        }
    };

    const handleBuyNow = () => {
        if (!product) return;

        if (isAuthenticated) {
            addItem({
                id: product.id,
                cartItemId: null,
                name: product.title,
                brand: product.brand,
                price: product.price,
                originalPrice: product.originalPrice,
                discountPercentage: product.discountPercentage,
                image: product.images[0] ?? "",
                color: selectedColor?.name ?? null,
                size: selectedSize || null,
                inStock: product.inStock,
                quantity,
            });
            addToCartApi({ productId: product.id, quantity });
            window.location.assign("/checkout");
        } else {
            toast.error("Sign in to buy now");
        }
    };

    const wishlistItem = wishlistData?.items.find(
        (i) => i.productId === product?.id,
    );
    const wishlisted = !!wishlistItem;

    const handleWishlist = () => {
        if (!isAuthenticated) {
            toast.error("Sign in to save to wishlist");
            return;
        }
        if (wishlisted && wishlistItem) {
            removeFromWishlistApi(wishlistItem.id, {
                onSuccess: () => toast.success("Removed from wishlist"),
                onError: () => toast.error("Failed to remove from wishlist"),
            });
        } else if (product) {
            addToWishlistApi(
                { productId: product.id },
                {
                    onSuccess: () => toast.success("Added to wishlist!"),
                    onError: () => toast.error("Failed to add to wishlist"),
                },
            );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading product...</p>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-destructive">
                        Failed to load product details. Please try again.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const scrollToReviews = () => {
        document
            .getElementById("reviews-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-background max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 md:px-8">
            {/* Breadcrumb */}
            <div className="bg-muted/20">
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
                    <ProductImageGallery
                        images={product.images}
                        title={product.title}
                        isNew={product.isNew}
                        discountPercentage={product.discountPercentage}
                    />
                    <ProductInfo
                        product={product}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        wishlisted={wishlisted}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        onWishlist={handleWishlist}
                        onScrollToReviews={scrollToReviews}
                    />
                </div>

                <ProductTabs product={product} />
                <RelatedProducts />
            </div>

            <StickyCartBar
                show={showStickyBar}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
            />
        </div>
    );
}
