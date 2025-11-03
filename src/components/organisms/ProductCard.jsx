import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import RatingDisplay from "@/components/molecules/RatingDisplay";

const ProductCard = ({ 
  product, 
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      productId: product.Id.toString(),
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      size: product.sizes?.[0] || "M",
      color: product.colors?.[0] || "Default"
    };
    
    onAddToCart(cartItem);
    toast.success(`${product.title} added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
const wishlistItem = {
      productId: product.Id.toString(),
      title: product.title_c,
      image: product.images_c ? product.images_c.split(',')[0] : '',
      price: product.price_c,
      discount: product.discount_c
    };
    
    onToggleWishlist(wishlistItem);
    
if (isWishlisted) {
      toast.info(`${product.title_c} removed from wishlist`);
    } else {
      toast.success(`${product.title_c} added to wishlist!`);
    }
  };

const discountPercentage = product.originalPrice_c > product.price_c 
    ? Math.round(((product.originalPrice_c - product.price_c) / product.originalPrice_c) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.Id}`} className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
{!imageError && product.images && product.images[0] ? (
<img
                src={product.images_c ? product.images_c.split(',')[0] : ''}
                alt={product.title_c}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <ApperIcon name="ImageOff" size={48} className="text-gray-400" />
              </div>
            )}

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Badge
                variant="discount"
                className="absolute top-2 left-2 shadow-sm"
              >
                {discountPercentage}% OFF
              </Badge>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ApperIcon 
                name="Heart" 
                size={16} 
                className={isWishlisted ? "fill-primary text-primary" : "text-gray-600"} 
              />
            </motion.button>

            {/* Quick Add Button - Visible on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-2 left-2 right-2"
            >
              <button
                onClick={handleAddToCart}
                className="w-full bg-white/90 backdrop-blur-sm text-secondary py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors"
              >
                Quick Add
              </button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-medium text-secondary line-clamp-2 mb-1">
{product.title_c}
              </h3>
<p className="text-sm text-gray-500 mb-2">{product.brand_c}</p>
            </div>

            <div className="mb-2">
              <PriceDisplay
price={product.price_c}
                originalPrice={product.originalPrice_c}
                discount={discountPercentage}
              />
            </div>

{product.rating_c && (
              <RatingDisplay
                rating={product.rating_c}
                reviewCount={product.reviewCount_c}
              />
            )}
{/* Size Options Preview */}
            {product.sizes_c && (
              <div className="flex gap-1 mt-2">
                {product.sizes_c.split(',').slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="text-xs border border-gray-300 px-1.5 py-0.5 rounded"
                  >
                    {size.trim()}
                  </span>
                ))}
                {product.sizes_c.split(',').length > 4 && (
                  <span className="text-xs text-gray-500">+{product.sizes_c.split(',').length - 4}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;