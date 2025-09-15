import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Star,
  ArrowRight,
  Package,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Grid,
  List,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../services/api";
import SEO from "../components/SEO";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    quantity: "",
    requirements: "",
  });
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteErrors, setQuoteErrors] = useState<Record<string, string>>({});
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteSubmitError, setQuoteSubmitError] = useState<string>("");

  const validateQuoteForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!quoteFormData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (quoteFormData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!quoteFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteFormData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (required)
    if (!quoteFormData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(quoteFormData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Company validation (required)
    if (!quoteFormData.company.trim()) {
      newErrors.company = "Company name is required";
    } else if (quoteFormData.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

    // Product validation
    if (!quoteFormData.product.trim()) {
      newErrors.product = "Product is required";
    }

    // Quantity validation
    if (!quoteFormData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    }

    setQuoteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuoteInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuoteFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (quoteErrors[name]) {
      setQuoteErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleGetQuote = (product: any) => {
    setSelectedProduct(product);
    setQuoteFormData((prev) => ({
      ...prev,
      product: product.name,
    }));
    setShowQuoteForm(true);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors and success state
    setQuoteErrors({});
    setQuoteSubmitError("");
    setQuoteSuccess(false);

    // Validate form before submission
    if (!validateQuoteForm()) {
      return;
    }

    setIsSubmittingQuote(true);

    try {
      const response = await api.submitQuote(quoteFormData);

      if (response.success) {
        setQuoteSuccess(true);
        toast.success(
          "Quote request submitted successfully! We'll get back to you within 24 hours.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Reset form
        setQuoteFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          product: selectedProduct?.name || "",
          quantity: "",
          requirements: "",
        });

        // Close form after 3 seconds
        setTimeout(() => {
          setShowQuoteForm(false);
          setQuoteSuccess(false);
        }, 3000);
      } else {
        const errorMessage =
          response.error || "Failed to submit quote request. Please try again.";
        setQuoteSubmitError(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      setQuoteSubmitError(
        "Network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice ST24/ST25",
      description:
        "Export quality premium basmati rice varieties with superior taste, texture, and distinctive aroma",
      image: "/images/jasmine-rice.jpg",
      category: "Rice",
      certifications: ["APEDA", "FSSAI", "ISO 9001"],
      rating: 4.9,
      features: ["Export Quality", "Premium Grade", "Long Grain"],
      tags: ["Organic", "Non-GMO", "Premium"],
    },
    {
      id: 2,
      name: "Natural Jaggery Blocks",
      description:
        "Pure, chemical-free jaggery in small and large blocks, perfect for health-conscious consumers",
      image: "/images/pure-jaggery.jpg",
      category: "Sweeteners",
      certifications: ["Organic", "FSSAI", "Natural"],
      rating: 4.8,
      features: ["100% Natural", "Chemical-Free", "Traditional Process"],
      tags: ["Organic", "Natural", "Healthy"],
    },
    {
      id: 3,
      name: "Fresh Garlic & Onion",
      description:
        "Premium quality fresh garlic and onions for global markets with extended shelf life",
      image: "/images/onion_garlic.jpeg",
      category: "Vegetables",
      certifications: ["Fresh", "APEDA", "Export Quality"],
      rating: 4.7,
      features: ["Fresh Harvest", "Long Shelf Life", "Premium Quality"],
      tags: ["Fresh", "Premium", "Export"],
    },
    {
      id: 4,
      name: "Premium Spices Collection",
      description:
        "Cumin, Fenugreek, and authentic Indian spices with rich aroma and flavor",
      image: "/images/premium_spices.jpg",
      category: "Spices",
      certifications: ["FSSAI", "ISO", "Premium Grade"],
      rating: 4.9,
      features: ["Rich Aroma", "Authentic Flavor", "Premium Grade"],
      tags: ["Premium", "Authentic", "Aromatic"],
    },
    {
      id: 5,
      name: "Makhana & Millets",
      description:
        "Nutritious pearl millets, sorghum, and premium makhana for health food markets",
      image: "/images/Makhana.jpg",
      category: "Grains",
      certifications: ["Organic", "Nutritious", "Premium"],
      rating: 4.6,
      features: ["High Nutrition", "Organic", "Premium Quality"],
      tags: ["Organic", "Nutritious", "Premium"],
    },
    {
      id: 6,
      name: "Scented Candles Collection",
      description:
        "Premium lifestyle scented candles for global markets with exotic fragrances",
      image: "/images/scented candles.webp",
      category: "Lifestyle",
      certifications: ["Premium", "Handmade", "Quality"],
      rating: 4.8,
      features: ["Handmade", "Exotic Fragrances", "Premium Quality"],
      tags: ["Handmade", "Premium", "Lifestyle"],
    },
  ];

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    {
      id: "Rice",
      name: "Rice",
      count: products.filter((p) => p.category === "Rice").length,
    },
    {
      id: "Sweeteners",
      name: "Sweeteners",
      count: products.filter((p) => p.category === "Sweeteners").length,
    },
    {
      id: "Vegetables",
      name: "Vegetables",
      count: products.filter((p) => p.category === "Vegetables").length,
    },
    {
      id: "Spices",
      name: "Spices",
      count: products.filter((p) => p.category === "Spices").length,
    },
    {
      id: "Grains",
      name: "Grains",
      count: products.filter((p) => p.category === "Grains").length,
    },
    {
      id: "Lifestyle",
      name: "Lifestyle",
      count: products.filter((p) => p.category === "Lifestyle").length,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch =
      searchLower === "" ||
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.certifications.some((cert) =>
        cert.toLowerCase().includes(searchLower)
      );
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO
        title="Premium Agricultural Products - The11EximOverSeas"
        description="Explore our comprehensive range of premium agricultural products including rice, spices, jaggery, vegetables, and lifestyle products. Quality-assured for global markets."
        keywords="agricultural products, premium rice, spices, jaggery, vegetables, lifestyle products, export quality, global markets, India agricultural exports"
      />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent-600/5"></div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-gradient mb-8 text-balance">
                Premium Product Portfolio
              </h1>
              <p className="text-xl text-neutral-600 mb-12 leading-relaxed text-balance">
                Discover our carefully curated selection of premium agricultural
                and lifestyle products, each handpicked for quality,
                sustainability, and global market excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 lg:py-12 bg-white/80 backdrop-blur-sm border-b border-neutral-200/50">
          <div className="container-custom">
            <div className="flex flex-col gap-6">
              {/* Search Bar - Full width on mobile */}
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 lg:py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 shadow-soft text-sm lg:text-base"
                />
              </div>

              {/* Controls Row */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Category Filter - Scrollable on mobile */}
                <div className="flex gap-3 overflow-x-auto pb-2 w-full sm:w-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        selectedCategory === category.id
                          ? "bg-primary-600 text-white shadow-glow"
                          : "bg-white text-neutral-700 hover:bg-primary-50 border border-neutral-200"
                      }`}
                    >
                      <span className="text-sm lg:text-base">
                        {category.name}
                      </span>
                      <span className="ml-1 text-xs lg:text-sm opacity-75">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-white rounded-xl border border-neutral-200 p-1 flex-shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 lg:p-3 rounded-lg transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-primary-600 text-white"
                        : "text-neutral-600 hover:bg-primary-50"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 lg:p-3 rounded-lg transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-primary-600 text-white"
                        : "text-neutral-600 hover:bg-primary-50"
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4 lg:h-5 lg:w-5" />
                  </button>
                </div>
              </div>

              {/* Search Results Count */}
              {searchTerm && (
                <div className="text-sm text-neutral-600">
                  Found {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} for "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container-custom">
            <div
              className={`grid gap-6 lg:gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group ${viewMode === "list" ? "flex gap-6" : ""}`}
                >
                  <div className="card-premium p-6 h-full hover:scale-105 transition-all duration-500">
                    {/* Product Image */}
                    <div
                      className={`relative overflow-hidden rounded-2xl mb-6 ${
                        viewMode === "list"
                          ? "w-64 h-48 flex-shrink-0"
                          : "aspect-square"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Certifications */}
                      <div className="flex flex-wrap gap-2">
                        {product.certifications.map((cert, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 text-sm text-neutral-600"
                          >
                            <CheckCircle className="h-4 w-4 text-primary-600" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Link
                          to={`/products/${product.id}`}
                          className="flex-1 btn-primary text-center inline-flex items-center justify-center gap-2"
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleGetQuote(product)}
                          className="btn-secondary px-6"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                  No products found
                </h3>
                <p className="text-neutral-500">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Why Choose Our Products?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                We ensure every product meets the highest standards of quality,
                sustainability, and excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Premium Quality",
                  description:
                    "Rigorous quality control and international certifications ensure superior products.",
                },
                {
                  icon: Truck,
                  title: "Global Shipping",
                  description:
                    "Efficient logistics network delivering products worldwide with real-time tracking.",
                },
                {
                  icon: Clock,
                  title: "Timely Delivery",
                  description:
                    "Reliable supply chain ensuring your products reach destinations on schedule.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Request Quote
            </h3>

            {/* Success Message */}
            {quoteSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">
                    Quote request submitted successfully!
                  </p>
                  <p className="text-green-600 text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {quoteSubmitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Submission failed</p>
                  <p className="text-red-600 text-sm">{quoteSubmitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product *
                </label>
                <input
                  type="text"
                  name="product"
                  value={quoteFormData.product}
                  onChange={handleQuoteInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity Required *
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={quoteFormData.quantity}
                  onChange={handleQuoteInputChange}
                  placeholder="e.g., 5000 kg"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    quoteErrors.quantity ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {quoteErrors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {quoteErrors.quantity}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={quoteFormData.name}
                  onChange={handleQuoteInputChange}
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    quoteErrors.name ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {quoteErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {quoteErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={quoteFormData.email}
                  onChange={handleQuoteInputChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    quoteErrors.email ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {quoteErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {quoteErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={quoteFormData.phone}
                  onChange={handleQuoteInputChange}
                  placeholder="+91 9876543210"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    quoteErrors.phone ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {quoteErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {quoteErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={quoteFormData.company}
                  onChange={handleQuoteInputChange}
                  placeholder="Company Name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    quoteErrors.company ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {quoteErrors.company && (
                  <p className="text-red-500 text-sm mt-1">
                    {quoteErrors.company}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="requirements"
                  value={quoteFormData.requirements}
                  onChange={handleQuoteInputChange}
                  placeholder="Any specific requirements or details..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuoteForm(false);
                    setQuoteErrors({});
                    setQuoteSubmitError("");
                    setQuoteSuccess(false);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  disabled={isSubmittingQuote}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingQuote || quoteSuccess}
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmittingQuote ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : quoteSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Submitted!</span>
                    </>
                  ) : (
                    "Submit Quote"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Products;
