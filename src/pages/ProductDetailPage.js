import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import Breadcrumb from '../components/Breadcrumb';
import ProductInfoSection from '../components/ProductInfoSection';
import Button from '../components/Button';
import dataService from '../data/dataService';

/**
 * ProductDetailPage Component - Detailed product view with images, description, and purchase option
 * Features: Image gallery, breadcrumb navigation, product details, cultural context, artisan story
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load product data
  useEffect(() => {
    const loadProduct = () => {
      setLoading(true);
      
      try {
        // Get product from dataService
        const productData = dataService.getProductById(parseInt(id));
        
        if (productData) {
          // Transform product data to match component expectations
          const transformedProduct = {
            id: productData.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            originalPrice: productData.originalPrice,
            images: productData.images,
            category: productData.category,
            subcategory: productData.category,
            region: productData.region,
            rating: productData.rating,
            reviews: productData.reviews,
            inStock: productData.inStock,
            features: productData.features,
            tags: productData.tags,
            artisan: {
              name: productData.artisan,
              location: productData.region,
              experience: '20+ years',
              story: `Meet ${productData.artisan.split(' ')[0]}, a master artisan from ${productData.region}. With over 20 years of experience in ${productData.category.toLowerCase()}, they bring exceptional skill and passion to every piece they create.`
            },
            culturalContext: `This ${productData.name.toLowerCase()} represents the rich cultural heritage of ${productData.region}. Each piece is crafted using traditional techniques passed down through generations, embodying the artistic traditions of the region.`,
            craftingTechnique: `The creation of this masterpiece involves traditional techniques specific to ${productData.region}. Master artisans carefully select the finest materials and employ time-honored methods to ensure authenticity and quality.`,
            specifications: productData.specifications || {
              material: 'Traditional materials',
              careInstructions: 'Handle with care'
            }
          };

          setProduct(transformedProduct);
          
          // Load related products
          const related = dataService.getRelatedProducts(parseInt(id), 4);
          setRelatedProducts(related);
          
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product details');
      }
      
      setLoading(false);
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // Generate breadcrumb items dynamically
  const breadcrumbItems = product ? [
    { label: 'Home', path: '/' },
    { label: 'Catalogue', path: '/catalogue' },
    { label: product.category, path: `/categories/${product.category.toLowerCase()}` },
    { label: product.name, path: '' }
  ] : [
    { label: 'Home', path: '/' },
    { label: 'Catalogue', path: '/catalogue' }
  ];

  // Handle purchase action
  const handlePurchase = () => {
    console.log('Purchase clicked for product:', product?.name);
    // Future: Implement purchase logic (add to cart, navigate to checkout, etc.)
  };

  // Handle navigation back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-6xl" role="main">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary">Loading product details...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-6xl" role="main">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Product Not Found</h2>
          <p className="text-secondary mb-6">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={handleGoBack}>
              Go Back
            </Button>
            <Button variant="primary" onClick={() => navigate('/catalogue')}>
              Browse Catalogue
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl" role="main">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Information */}
        <div className="space-y-8">
          {/* Product Header */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-secondary leading-relaxed mb-4">
              {product.description}
            </p>
            {product.price && (
              <div className="text-xl md:text-2xl font-bold text-[var(--accent-color)]">
                ₹ {product.price.toLocaleString()}
              </div>
            )}
          </div>

          {/* Product Details Sections */}
          <div className="space-y-6">
            {/* Cultural Context */}
            <ProductInfoSection
              title="Cultural Context"
              content={product.culturalContext}
            />

            {/* Artisan's Story */}
            <ProductInfoSection
              title="Artisan's Story"
              content={product.artisan.story}
            />

            {/* Crafting Technique */}
            <ProductInfoSection
              title="Crafting Technique"
              content={product.craftingTechnique}
            />

            {/* Product Specifications */}
            {product.specifications && (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-[var(--accent-color)]">
                  Specifications
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Purchase Button */}
          <div className="pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handlePurchase}
              className="w-full text-gray-900 hover:bg-[var(--secondary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50"
              aria-label={`Purchase ${product.name}`}
            >
              Own a piece of tradition
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => console.log('Add to wishlist')}
              className="flex-1"
            >
              Add to Wishlist
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => console.log('Share product')}
              className="flex-1"
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Product Information */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Artisan Info Card */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">Meet the Artisan</h3>
          <div className="space-y-2">
            <p className="text-secondary">
              <span className="font-medium">Name:</span> {product.artisan.name}
            </p>
            <p className="text-secondary">
              <span className="font-medium">Location:</span> {product.artisan.location}
            </p>
            <p className="text-secondary">
              <span className="font-medium">Experience:</span> {product.artisan.experience}
            </p>
          </div>
        </div>

        {/* Region Info Card */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">Origin</h3>
          <div className="space-y-2">
            <p className="text-secondary">
              <span className="font-medium">Region:</span> {product.region}
            </p>
            <p className="text-secondary">
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p className="text-secondary">
              <span className="font-medium">Type:</span> {product.subcategory}
            </p>
          </div>
        </div>

        {/* Care Instructions Card */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">Care Instructions</h3>
          <div className="space-y-2">
            <p className="text-secondary">
              {product.specifications?.careInstructions || 'Handle with care'}
            </p>
            <p className="text-sm text-secondary opacity-75">
              Proper care ensures longevity of this handcrafted piece.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
