import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import RatingDisplay from "@/components/molecules/RatingDisplay";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(parseInt(id));
      setProduct(data);
      
      // Set default selections
if (data.sizes_c) {
        const sizesArray = data.sizes_c.split(',');
        if (sizesArray.length > 0) {
          setSelectedSize(sizesArray[0].trim());
        }
      }
      if (data.colors_c) {
        const colorsArray = data.colors_c.split(',');
        if (colorsArray.length > 0) {
          setSelectedColor(colorsArray[0].trim());
        }
      }
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
if (product.sizes_c && product.sizes_c.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const cartItem = {
productId: product.Id.toString(),
      title: product.title_c,
      image: product.images_c ? product.images_c.split(',')[0] : '',
      price: product.price_c,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    };
    
    addToCart(cartItem);
toast.success(`${product.title_c} added to cart!`);
  };

  const handleToggleWishlist = () => {
const wishlistItem = {
      productId: product.Id.toString(),
      title: product.title_c,
      image: product.images_c ? product.images_c.split(',')[0] : '',
      price: product.price_c,
      discount: product.discount_c
    };
    
    toggleWishlist(wishlistItem);
    
if (isInWishlist(product.Id.toString())) {
      toast.info(`${product.title_c} removed from wishlist`);
    } else {
      toast.success(`${product.title_c} added to wishlist!`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <Loading />;
  
  if (error) return <Error message={error} onRetry={loadProduct} />;
  
  if (!product) return <Error message="Product not found" />;

const discountPercentage = product.originalPrice_c > product.price_c 
    ? Math.round(((product.originalPrice_c - product.price_c) / product.originalPrice_c) * 100)
    : 0;

  const isWishlisted = isInWishlist(product.Id.toString());

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => navigate("/")} className="hover:text-primary">Home</button>
            <ApperIcon name="ChevronRight" size={16} />
<button onClick={() => navigate(`/category/${product.category_c.toLowerCase()}`)} className="hover:text-primary">
              {product.category_c}
            </button>
            <ApperIcon name="ChevronRight" size={16} />
<span className="text-secondary">{product.title_c}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
            >
              <img
src={product.images_c ? product.images_c.split(',')[selectedImage] : ''}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
<div className="flex gap-2 overflow-x-auto">
                {product.images_c && product.images_c.split(',').map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image.trim()}
                      alt={`${product.title_c} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
<p className="text-gray-600 mb-2">{product.brand_c}</p>
              <h1 className="text-3xl font-display font-bold text-secondary mb-4">
{product.title_c}
              </h1>
              
              {product.rating && (
<RatingDisplay
                  rating={product.rating_c}
                  reviewCount={product.reviewCount_c}
                  size="md"
                />
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <PriceDisplay
price={product.price_c}
                originalPrice={product.originalPrice_c}
                discount={discountPercentage}
                size="xl"
              />
              {discountPercentage > 0 && (
                <Badge variant="discount">
Save ₹{(product.originalPrice_c - product.price_c).toLocaleString()}
                </Badge>
              )}
            </div>

            {/* Size Selection */}
{product.sizes_c && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
{product.sizes_c.split(',').map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size.trim())}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size.trim()
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size.trim()}
                    </button>
                  ))}
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
{product.colors_c && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Color: {selectedColor}</h3>
                <div className="flex flex-wrap gap-2">
{product.colors_c.split(',').map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color.trim())}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color.trim() ? 'border-primary scale-110' : 'border-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: color.trim().toLowerCase() === 'white' ? '#fff' : 
                                        color.trim().toLowerCase() === 'black' ? '#000' :
                                        color.trim().toLowerCase() === 'gray' ? '#6b7280' :
                                        color.trim().toLowerCase() === 'red' ? '#ef4444' :
                                        color.trim().toLowerCase() === 'blue' ? '#3b82f6' :
                                        color.trim().toLowerCase() === 'green' ? '#10b981' :
                                        color.trim().toLowerCase() === 'pink' ? '#ec4899' :
                                        color.trim().toLowerCase() === 'yellow' ? '#f59e0b' :
                                        '#9ca3af'
                      }}
                      title={color.trim()}
                    />
                  ))}
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedColor === color
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-secondary mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="Minus" size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="Plus" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  icon="ShoppingCart"
disabled={!product.inStock_c}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  icon="Heart"
                  className={isWishlisted ? "text-primary border-primary" : ""}
                >
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
              </div>
              
              <Button
                onClick={handleBuyNow}
                size="lg"
                className="w-full"
disabled={!product.inStock_c}
              >
                Buy Now
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
{product.inStock_c ? (
                <>
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-success font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <ApperIcon name="X" size={16} className="text-error" />
                  <span className="text-error font-medium">Out of Stock</span>
                </>
              )}
            </div>

{/* Product Description */}
            {product.description_c && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description_c}
                </p>
              </div>
            )}

            {/* Product Tags */}
            {product.tags_c && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags_c.split(',').map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;