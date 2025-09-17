import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Shield,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  Package,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SEO from "../components/SEO";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
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

  // Mock product data - in production, this would be fetched from MongoDB
  const productsData = {
    "1": {
      id: "1",
      name: "Premium Basmati Rice ST24/ST25",
      category: "Rice",
      images: [
        "/images/jasmine-rice.jpg",
        "/images/rice.jpeg",
        "/images/white-rice.jpg",
      ],
      description:
        "Premium long-grain basmati rice with exceptional aroma and taste, perfect for international markets. Our ST24 variety is carefully selected from the finest paddy fields and processed using advanced technology to maintain its natural fragrance and nutritional value.",
      longDescription: `Our Premium Basmati Rice ST24 represents the pinnacle of rice cultivation excellence. Grown in the fertile plains of Punjab, this rice variety is renowned for its exceptional grain length, distinctive aroma, and superior cooking qualities.

    The ST24 variety undergoes rigorous quality control processes, from field selection to final packaging. Each grain is carefully inspected to ensure uniformity in size, color, and quality. Our advanced processing facilities maintain the rice's natural properties while ensuring food safety standards.

    This premium rice is ideal for high-end restaurants, luxury hotels, and discerning consumers worldwide who appreciate authentic basmati rice quality.`,
      certifications: ["APEDA", "FSSAI", "ISO 22000", "Organic", "HACCP"],
      specifications: {
        "Grain Length": "6.5-7.0 mm",
        "Moisture Content": "12-14%",
        "Broken Grains": "<5%",
        Admixture: "<1%",
        "Shelf Life": "24 months",
        Packaging: "5kg, 10kg, 25kg, 50kg bags",
      },
      nutritionalInfo: {
        Energy: "345 kcal/100g",
        Protein: "8.5g/100g",
        Carbohydrates: "78g/100g",
        Fat: "0.8g/100g",
        Fiber: "2.3g/100g",
        Sodium: "5mg/100g",
      },
      origin: "Punjab, India",
      minimumOrder: "1000 kg",
      packaging: "Customizable packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from direct sunlight",
      popularity: 95,
      features: [
        "Extra-long grain length (6.5-7.0mm)",
        "Distinctive natural aroma",
        "Non-sticky texture when cooked",
        "High nutritional value",
        "Zero pesticide residue",
        "Export quality packaging",
      ],
    },
    "2": {
      id: "2",
      name: "Natural Jaggery Blocks",
      category: "Sweeteners",
      images: [
        "/images/pure-jaggery.jpg",
        "/images/jaggery-powder.jpg",
        "/images/pure jaggery webp.webp",
      ],
      description:
        "Pure, chemical-free jaggery in small and large blocks, perfect for health-conscious consumers. Made from pure sugarcane juice using traditional methods.",
      longDescription: `Our Natural Jaggery Blocks are crafted using traditional methods that have been passed down through generations. Made from pure sugarcane juice without any chemical additives, our jaggery maintains its natural sweetness and nutritional benefits.

      The jaggery is processed in small batches to ensure quality and consistency. Each block is carefully shaped and dried to maintain its natural texture and flavor. Rich in iron, calcium, and other essential minerals, it's a healthier alternative to refined sugar.

      Perfect for traditional Indian sweets, beverages, and as a natural sweetener in various culinary applications.`,
      certifications: ["Organic", "FSSAI", "Natural", "Chemical-Free"],
      specifications: {
        "Sugar Content": "70-80%",
        "Moisture Content": "8-12%",
        "Ash Content": "<2%",
        "Shelf Life": "12 months",
        Packaging: "500g, 1kg, 5kg blocks",
        Color: "Golden Brown",
      },
      nutritionalInfo: {
        Energy: "383 kcal/100g",
        Protein: "0.4g/100g",
        Carbohydrates: "98g/100g",
        Fat: "0.1g/100g",
        Iron: "11mg/100g",
        Calcium: "40mg/100g",
      },
      origin: "Uttar Pradesh, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "12 months",
      storageConditions: "Store in cool, dry place away from moisture",
      popularity: 88,
      features: [
        "100% Natural and Chemical-free",
        "Rich in Iron and Calcium",
        "Traditional Processing Method",
        "Versatile Culinary Use",
        "Healthier Sugar Alternative",
        "Export Quality Standards",
      ],
    },
    "3": {
      id: "3",
      name: "Fresh Garlic & Onion",
      category: "Vegetables",
      images: ["/images/onion_garlic.jpeg", "/images/oniongarlic.jpeg"],
      description:
        "Premium quality fresh garlic and onions for global markets with extended shelf life. Carefully selected and processed to maintain freshness.",
      longDescription: `Our Fresh Garlic & Onion collection features premium quality produce sourced directly from trusted farmers. Each batch undergoes rigorous quality checks to ensure freshness, size consistency, and extended shelf life.

      The garlic is known for its strong aroma and flavor, while the onions are selected for their size, color, and storage properties. Both are processed using modern techniques while maintaining their natural characteristics.

      Perfect for international markets where quality and freshness are paramount.`,
      certifications: ["Fresh", "APEDA", "Export Quality", "FSSAI"],
      specifications: {
        "Garlic Size": "3-4 cm diameter",
        "Onion Size": "5-7 cm diameter",
        "Moisture Content": "65-70%",
        "Shelf Life": "6-8 months",
        Packaging: "Mesh bags, 10kg, 25kg",
        Storage: "Cool, dry, well-ventilated",
      },
      nutritionalInfo: {
        "Garlic - Energy": "149 kcal/100g",
        "Garlic - Protein": "6.4g/100g",
        "Onion - Energy": "40 kcal/100g",
        "Onion - Protein": "1.1g/100g",
        "Vitamin C": "31mg/100g",
        Fiber: "2.1g/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "1000 kg",
      packaging: "Export-grade mesh bags",
      shelfLife: "6-8 months",
      storageConditions: "Cool, dry, well-ventilated storage",
      popularity: 82,
      features: [
        "Premium Quality Selection",
        "Extended Shelf Life",
        "Strong Aroma and Flavor",
        "Export Quality Standards",
        "Consistent Size and Color",
        "Fresh Harvest Processing",
      ],
    },
    "4": {
      id: "4",
      name: "Premium Spices Collection",
      category: "Spices",
      images: ["/images/premium_spices.jpg", "/images/lentils.jpg"],
      description:
        "Cumin, Fenugreek, and authentic Indian spices with rich aroma and flavor. Carefully sourced and processed to maintain their natural properties.",
      longDescription: `Our Premium Spices Collection brings together the finest Indian spices, each carefully selected for their aroma, flavor, and quality. From the aromatic cumin seeds to the distinctive fenugreek, each spice is processed using traditional methods while meeting modern quality standards.

      These spices are sourced directly from spice-growing regions across India, ensuring authenticity and freshness. Each spice undergoes rigorous quality testing for purity, aroma, and flavor profile.

      Perfect for both home cooking and commercial food production, these spices add authentic Indian flavors to any dish.`,
      certifications: ["FSSAI", "ISO", "Premium Grade", "Pure"],
      specifications: {
        "Cumin Purity": "99.5%",
        "Fenugreek Purity": "99%",
        "Moisture Content": "<10%",
        "Shelf Life": "24 months",
        Packaging: "Food-grade bags, 1kg, 5kg, 25kg",
        Processing: "Sun-dried, cleaned",
      },
      nutritionalInfo: {
        "Cumin - Energy": "375 kcal/100g",
        "Cumin - Protein": "17.8g/100g",
        "Fenugreek - Energy": "323 kcal/100g",
        "Fenugreek - Protein": "23g/100g",
        Iron: "66mg/100g",
        Fiber: "25g/100g",
      },
      origin: "Rajasthan & Gujarat, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging",
      shelfLife: "24 months",
      storageConditions: "Cool, dry place away from sunlight",
      popularity: 92,
      features: [
        "Authentic Indian Spices",
        "Rich Aroma and Flavor",
        "Premium Quality Grade",
        "Traditional Processing",
        "Export Quality Standards",
        "Versatile Culinary Use",
      ],
    },
    "5": {
      id: "5",
      name: "Makhana & Millets",
      category: "Grains",
      images: ["/images/Makhana.jpg", "/images/lentils.jpg"],
      description:
        "Nutritious pearl millets, sorghum, and premium makhana for health food markets. Rich in nutrients and perfect for health-conscious consumers.",
      longDescription: `Our Makhana & Millets collection features premium quality grains that are not only nutritious but also versatile in culinary applications. Makhana (fox nuts) are known for their health benefits and are a popular snack in India.

      The millets include pearl millet, sorghum, and other ancient grains that are gaining popularity worldwide for their nutritional value. Each grain is carefully processed to maintain its natural nutrients and flavor.

      Perfect for health food markets, organic stores, and consumers looking for nutritious alternatives to traditional grains.`,
      certifications: ["Organic", "Nutritious", "Premium", "Natural"],
      specifications: {
        "Makhana Size": "8-12mm diameter",
        "Moisture Content": "<12%",
        "Protein Content": "9-12%",
        "Shelf Life": "18 months",
        Packaging: "Food-grade bags, 1kg, 5kg, 10kg",
        Processing: "Sun-dried, cleaned",
      },
      nutritionalInfo: {
        "Makhana - Energy": "347 kcal/100g",
        "Makhana - Protein": "9.7g/100g",
        "Millets - Energy": "378 kcal/100g",
        "Millets - Protein": "11g/100g",
        Fiber: "8g/100g",
        Iron: "3mg/100g",
      },
      origin: "Bihar & Madhya Pradesh, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging",
      shelfLife: "18 months",
      storageConditions: "Cool, dry place away from moisture",
      popularity: 85,
      features: [
        "High Nutritional Value",
        "Gluten-Free Options",
        "Rich in Protein and Fiber",
        "Health Food Market Ready",
        "Organic Processing",
        "Versatile Culinary Use",
      ],
    },
    "6": {
      id: "6",
      name: "Scented Candles Collection",
      category: "Lifestyle",
      images: ["/images/scented candles.webp", "/images/fragrance-candles.jpg"],
      description:
        "Premium lifestyle scented candles for global markets with exotic fragrances. Handcrafted with natural ingredients for a luxurious experience.",
      longDescription: `Our Scented Candles Collection features handcrafted candles made with natural ingredients and exotic fragrances. Each candle is carefully crafted to provide a luxurious and aromatic experience.

      The collection includes various fragrances inspired by Indian traditions and global trends. Made with natural waxes and essential oils, these candles are perfect for creating ambiance in homes, hotels, and commercial spaces.

      Each candle is hand-poured and finished with attention to detail, making them perfect gifts and luxury lifestyle products.`,
      certifications: ["Premium", "Handmade", "Quality", "Natural"],
      specifications: {
        "Burn Time": "40-50 hours",
        "Wax Type": "Natural Soy Wax",
        Fragrance: "Essential Oils",
        Size: "Various sizes available",
        Packaging: "Gift boxes, 6-12 pieces",
        Color: "Natural and colored options",
      },
      nutritionalInfo: {
        Material: "Natural Soy Wax",
        Fragrance: "Essential Oils",
        Wick: "Cotton Wick",
        Container: "Glass Jar",
        Weight: "200g-500g",
        Dimensions: "Various sizes",
      },
      origin: "Handcrafted in India",
      minimumOrder: "100 pieces",
      packaging: "Gift packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place",
      popularity: 78,
      features: [
        "Handcrafted Quality",
        "Natural Ingredients",
        "Exotic Fragrances",
        "Long Burn Time",
        "Luxury Packaging",
        "Perfect for Gifting",
      ],
    },
    "7": {
      id: "7",
      name: "Fenugreek Seeds",
      category: "Spices",
      images: ["/images/fenugreek seeds.jpg"],
      description:
        "Premium quality fenugreek seeds with rich aroma and nutritional benefits, perfect for culinary and medicinal use. Sourced from the finest farms in India.",
      longDescription: `Our Fenugreek Seeds are carefully selected from premium farms across India, known for producing the highest quality fenugreek. These seeds are rich in essential nutrients and have been used in traditional Indian cuisine and Ayurvedic medicine for centuries.

      Fenugreek seeds are known for their distinctive bitter-sweet taste and aromatic properties. They are an essential ingredient in Indian spice blends and are also valued for their medicinal properties, including blood sugar regulation and digestive health benefits.

      Our fenugreek seeds are processed using traditional methods to preserve their natural aroma and nutritional value, making them perfect for both culinary and health applications.`,
      certifications: ["FSSAI", "Organic", "Premium Grade", "Traditional"],
      specifications: {
        Purity: "99.5%",
        "Moisture Content": "<8%",
        "Foreign Matter": "<0.5%",
        "Shelf Life": "24 months",
        Packaging: "25kg, 50kg bags",
        Color: "Yellowish-brown",
      },
      nutritionalInfo: {
        Energy: "323 kcal/100g",
        Protein: "23g/100g",
        Carbohydrates: "58g/100g",
        Fat: "6.4g/100g",
        Fiber: "25g/100g",
        Iron: "33mg/100g",
      },
      origin: "Rajasthan, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from moisture",
      popularity: 82,
      features: [
        "Rich Aroma and Flavor",
        "High Nutritional Value",
        "Traditional Processing",
        "Medicinal Properties",
        "Culinary Versatility",
        "Export Quality Standards",
      ],
    },
    "8": {
      id: "8",
      name: "Pearl Millets",
      category: "Grains",
      images: ["/images/Pearl millets.webp"],
      description:
        "Nutritious pearl millets with high protein content and gluten-free properties, ideal for health-conscious consumers and sustainable agriculture.",
      longDescription: `Our Pearl Millets are sourced from sustainable farms and are known for their exceptional nutritional profile and drought-resistant properties. These ancient grains have been a staple in Indian diets for centuries and are now gaining global recognition for their health benefits.

      Pearl millets are naturally gluten-free and rich in protein, fiber, and essential minerals. They are particularly high in iron, magnesium, and phosphorus, making them an excellent choice for health-conscious consumers and those with dietary restrictions.

      Our millets are processed using modern techniques while maintaining their natural nutritional value, making them perfect for various culinary applications including bread, porridge, and traditional Indian dishes.`,
      certifications: ["Organic", "Gluten-Free", "High Protein", "Sustainable"],
      specifications: {
        "Protein Content": "11-12%",
        "Moisture Content": "<12%",
        "Foreign Matter": "<1%",
        "Shelf Life": "12 months",
        Packaging: "25kg, 50kg bags",
        Color: "Pearl white to light yellow",
      },
      nutritionalInfo: {
        Energy: "378 kcal/100g",
        Protein: "11g/100g",
        Carbohydrates: "73g/100g",
        Fat: "4.2g/100g",
        Fiber: "8.5g/100g",
        Iron: "8mg/100g",
      },
      origin: "Rajasthan, India",
      minimumOrder: "1000 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "12 months",
      storageConditions: "Store in cool, dry place away from pests",
      popularity: 75,
      features: [
        "Gluten-Free",
        "High Protein Content",
        "Rich in Minerals",
        "Drought-Resistant",
        "Sustainable Agriculture",
        "Versatile Culinary Use",
      ],
    },
    "9": {
      id: "9",
      name: "Sorghum Seeds (Jowar)",
      category: "Grains",
      images: ["/images/sorghum seeds.webp"],
      description:
        "Premium sorghum seeds with excellent nutritional profile and drought-resistant properties for sustainable agriculture and health food markets.",
      longDescription: `Our Sorghum Seeds (Jowar) are carefully selected from the finest farms and are known for their exceptional drought-resistant properties and nutritional benefits. Sorghum is one of the most sustainable crops, requiring minimal water and providing maximum nutrition.

      These seeds are rich in antioxidants, protein, and fiber, making them an excellent choice for health-conscious consumers. Sorghum is naturally gluten-free and has a mild, nutty flavor that works well in various culinary applications.

      Our sorghum seeds are processed using traditional methods to preserve their natural nutritional value and are perfect for making flour, porridge, and other healthy food products.`,
      certifications: [
        "Organic",
        "Drought-Resistant",
        "High Nutrition",
        "Sustainable",
      ],
      specifications: {
        "Protein Content": "10-11%",
        "Moisture Content": "<12%",
        "Foreign Matter": "<1%",
        "Shelf Life": "12 months",
        Packaging: "25kg, 50kg bags",
        Color: "White to cream",
      },
      nutritionalInfo: {
        Energy: "339 kcal/100g",
        Protein: "10g/100g",
        Carbohydrates: "75g/100g",
        Fat: "3.4g/100g",
        Fiber: "6.3g/100g",
        Iron: "4.4mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "1000 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "12 months",
      storageConditions: "Store in cool, dry place away from pests",
      popularity: 70,
      features: [
        "Drought-Resistant",
        "High Nutritional Value",
        "Gluten-Free",
        "Sustainable Agriculture",
        "Rich in Antioxidants",
        "Versatile Processing",
      ],
    },
    "10": {
      id: "10",
      name: "Jeera (Cumin Seeds)",
      category: "Spices",
      images: ["/images/Jeera.jpg"],
      description:
        "Premium cumin seeds with distinctive aroma and flavor, essential for authentic Indian and international cuisines. Sourced from the finest spice-growing regions.",
      longDescription: `Our Jeera (Cumin Seeds) are sourced from the premium spice-growing regions of India, known for producing the most aromatic and flavorful cumin seeds. These seeds are an essential ingredient in Indian cuisine and are highly valued in international markets.

      Cumin seeds are known for their distinctive warm, earthy aroma and slightly bitter taste. They are rich in essential oils and have been used for centuries in traditional medicine for their digestive and health benefits.

      Our cumin seeds are carefully processed to maintain their natural aroma and flavor profile, making them perfect for spice blends, tempering, and various culinary applications. They are also valued for their medicinal properties and are used in traditional Ayurvedic preparations.`,
      certifications: ["FSSAI", "Premium Grade", "Authentic", "Traditional"],
      specifications: {
        Purity: "99.5%",
        "Moisture Content": "<8%",
        "Foreign Matter": "<0.5%",
        "Shelf Life": "24 months",
        Packaging: "25kg, 50kg bags",
        Color: "Brown to dark brown",
      },
      nutritionalInfo: {
        Energy: "375 kcal/100g",
        Protein: "18g/100g",
        Carbohydrates: "44g/100g",
        Fat: "22g/100g",
        Fiber: "11g/100g",
        Iron: "66mg/100g",
      },
      origin: "Gujarat, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from light",
      popularity: 90,
      features: [
        "Distinctive Aroma",
        "Authentic Flavor",
        "Premium Grade Quality",
        "Rich in Essential Oils",
        "Medicinal Properties",
        "Culinary Versatility",
      ],
    },
  };

  const product =
    productsData[id as keyof typeof productsData] || productsData["1"];

  const relatedProducts = [
    {
      id: "2",
      name: "Natural Jaggery Blocks",
      image: "/images/pure-jaggery.jpg",
      category: "Sweeteners",
    },
    {
      id: "3",
      name: "Fresh Garlic & Onion",
      image: "/images/onion_garlic.jpeg",
      category: "Vegetables",
    },
    {
      id: "4",
      name: "Premium Spices Collection",
      image: "/images/premium_spices.jpg",
      category: "Spices",
    },
    {
      id: "5",
      name: "Makhana & Millets",
      image: "/images/Makhana.jpg",
      category: "Grains",
    },
    {
      id: "6",
      name: "Scented Candles Collection",
      image: "/images/scented candles.webp",
      category: "Lifestyle",
    },
  ]
    .filter((relatedProduct) => relatedProduct.id !== id)
    .slice(0, 3);

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

    // Product validation
    if (!quoteFormData.product.trim()) {
      newErrors.product = "Product is required";
    }

    // Quantity validation
    if (!quoteFormData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
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

    setQuoteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuoteInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
          product: product.name,
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

  return (
    <>
      <SEO
        title={`${
          product?.name || "Product"
        } | The 11 Exim Overseas | Premium Agricultural Export`}
        description={`${
          product?.description || "Premium agricultural product"
        } from The 11 Exim Overseas. Export quality ${
          product?.category?.toLowerCase() || "agricultural product"
        } with full certifications and global delivery.`}
        keywords={`The 11 Exim Overseas, 11 Exim Overseas, Exim Overseas India, ${
          product?.name || "product"
        }, ${
          product?.category?.toLowerCase() || "agricultural product"
        }, export quality, premium agricultural products, India exports, global trade`}
        url={`https://the11eximoverseas.com/products/${id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product?.name || "Agricultural Product",
          description: product?.description || "Premium agricultural product",
          category: product?.category || "Agricultural Products",
          brand: {
            "@type": "Brand",
            name: "The 11 Exim Overseas",
          },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
            seller: {
              "@type": "Organization",
              name: "The 11 Exim Overseas",
            },
          },
        }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-primary-600">
                Home
              </Link>
              <span>/</span>
              <Link to="/products" className="hover:text-primary-600">
                Products
              </Link>
              <span>/</span>
              <span className="text-gray-900">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-8 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={`${product.name} by The 11 Exim Overseas - Premium ${product.category} for Global Export`}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      product.images[selectedImage] || product.images[0]
                    );
                    e.currentTarget.src = product.images[0];
                  }}
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary-600"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} by The 11 Exim Overseas - Image ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                        onError={() => {
                          console.error(
                            "Thumbnail image failed to load:",
                            image
                          );
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {product.popularity}% Popular
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-3 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <Shield className="h-4 w-4" />
                      <span>{cert}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Origin</div>
                      <div className="font-medium">{product.origin}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Min. Order</div>
                      <div className="font-medium">{product.minimumOrder}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Shelf Life</div>
                      <div className="font-medium">{product.shelfLife}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Packaging</div>
                      <div className="font-medium">Customizable</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setQuoteFormData((prev) => ({
                      ...prev,
                      product: product.name,
                    }));
                    setShowQuoteForm(true);
                  }}
                  className="flex-1 bg-primary-600 text-white py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
                >
                  Request Quote
                </button>
                <Link
                  to="/contact"
                  className="flex-1 border-2 border-primary-600 text-primary-600 py-4 px-6 rounded-lg hover:bg-primary-50 transition-colors font-semibold text-lg text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Specifications */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Specifications
                </h3>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nutritional Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nutritional Info
                </h3>
                <div className="space-y-4">
                  {Object.entries(product.nutritionalInfo).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Storage & Handling */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                  <Package className="h-5 w-5 text-primary-600 mr-2" />
                  Storage & Handling
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      Storage Conditions
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.storageConditions}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      Packaging Options
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.packaging}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      Quality Assurance
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Regular quality checks and third-party testing ensure
                      consistent quality standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={`${relatedProduct.name} by The 11 Exim Overseas - Premium ${relatedProduct.category} for Global Export`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-medium mb-2">
                      {relatedProduct.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {relatedProduct.name}
                    </h3>
                    <Link
                      to={`/products/${relatedProduct.id}`}
                      className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
                    <p className="text-red-800 font-medium">
                      Submission failed
                    </p>
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
                    value={quoteFormData.product || product.name}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      quoteErrors.product ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Product name"
                  />
                  {quoteErrors.product && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.product}
                    </p>
                  )}
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
                      quoteErrors.quantity
                        ? "border-red-500"
                        : "border-gray-200"
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
      </div>
    </>
  );
};

export default ProductDetail;
