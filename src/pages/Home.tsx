import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Users,
  Award,
  Leaf,
} from "lucide-react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState({
    countries: 0,
    experience: 0,
    clients: 0,
    success: 0,
  });

  const heroSlides = [
    {
      title:
        "Connecting India's Finest Agricultural Products to Global Markets",
      subtitle:
        "Excellence, Sustainability, and Unwavering Commitment to Quality",
      image: "/src/assets/images/globalfoods.jpg",
      cta1: "Explore Products",
      cta2: "Partner With Us",
    },
    {
      title: "Premium Export Quality from Farm to Your Doorstep",
      subtitle:
        "ISO Certified • Global Excellence • Sustainable Trade Solutions",
      image: "/src/assets/images/jasmine-rice.jpg",
      cta1: "View Products",
      cta2: "Get Quote",
    },
    {
      title: "Trusted by Importers Worldwide",
      subtitle: "25+ Years of Excellence in International Trade",
      image: "/src/assets/images/Middle-East-Map.jpg",
      cta1: "Global Markets",
      cta2: "Join Us",
    },
  ];

  const achievements = [
    { label: "Countries Served", value: 15, suffix: "+", icon: Globe },
    { label: "Years Experience", value: 25, suffix: "+", icon: Award },
    { label: "Happy Clients", value: 100, suffix: "+", icon: Users },
    { label: "Success Rate", value: 95, suffix: "%", icon: TrendingUp },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Superior Quality",
      description:
        "Premium international-standard products with rigorous quality control and certifications.",
      features: ["ISO Certified", "FSSAI Approved", "International Standards"],
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "Reliable logistics network ensuring your products reach global destinations on schedule.",
      features: ["Global Logistics", "Real-time Tracking", "On-time Guarantee"],
    },
    {
      icon: Star,
      title: "Global Satisfaction",
      description:
        "Trusted by importers worldwide with a proven track record of excellence.",
      features: ["95% Success Rate", "Worldwide Trust", "Customer Support"],
    },
  ];

  const featuredProducts = [
    {
      name: "Premium Basmati Rice ST24/ST25",
      category: "Rice",
      image: "/src/assets/images/jasmine-rice.jpg",
      description:
        "Export quality premium basmati rice varieties with superior taste and distinctive aroma",
      certifications: ["APEDA", "FSSAI", "ISO"],
      href: "/products?category=rice",
    },
    {
      name: "Natural Jaggery Blocks",
      category: "Sweeteners",
      image: "/src/assets/images/pure-jaggery.jpg",
      description: "Pure, chemical-free jaggery in small and large blocks",
      certifications: ["Organic", "FSSAI", "Natural"],
      href: "/products?product=jaggery",
    },
    {
      name: "Fresh Garlic & Onion",
      category: "Vegetables",
      image: "/src/assets/images/onion_garlic.jpeg",
      description: "Premium quality fresh garlic and onions for global markets",
      certifications: ["Fresh", "APEDA", "Export Quality"],
      href: "/products?category=vegetables",
    },
    {
      name: "Premium Spices Collection",
      category: "Spices",
      image: "/src/assets/images/premium_spices.jpg",
      description: "Cumin, Fenugreek, and authentic Indian spices",
      certifications: ["Pure", "FSSAI", "Traditional"],
      href: "/products?category=spices",
    },
    {
      name: "Makhana & Millets",
      category: "Seeds & Grains",
      image: "/src/assets/images/Makhana.jpg",
      description: "Nutritious pearl millets, sorghum, and premium makhana",
      certifications: ["Nutritious", "Natural", "Premium"],
      href: "/products?category=seeds",
    },
    {
      name: "Scented Candles Collection",
      category: "Lifestyle",
      image: "/src/assets/images/scented candles.webp",
      description: "Premium lifestyle scented candles for global markets",
      certifications: ["Handcrafted", "Premium", "Export"],
      href: "/products?category=lifestyle",
    },
  ];

  const sustainabilityStats = [
    { value: "5,000+", label: "Farmers Supported", icon: Users },
    { value: "100%", label: "Chemical-Free Sourcing", icon: Leaf },
    { value: "15+", label: "Global Certifications", icon: Award },
    { value: "25+", label: "Years of Excellence", icon: Star },
  ];

  // Counter animation
  useEffect(() => {
    const animateCounter = (target: number, key: keyof typeof counters) => {
      let start = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounters((prev: typeof counters) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounters((prev: typeof counters) => ({
            ...prev,
            [key]: Math.floor(start),
          }));
        }
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(15, "countries");
          animateCounter(25, "experience");
          animateCounter(100, "clients");
          animateCounter(95, "success");
        }
      });
    });

    const achievementsSection = document.getElementById("achievements");
    if (achievementsSection) {
      observer.observe(achievementsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <SEO
        title="The11EximOverSeas - Premium Agricultural Products Export"
        description="Connecting India's finest agricultural products to global markets with excellence, sustainability, and unwavering commitment to quality. Premium rice, spices, jaggery, and more."
        keywords="agricultural exports, premium rice, spices, jaggery, global trade, India exports, agricultural products, international trade, basmati rice, organic products"
      />
      <div className="relative">
        {/* Hero Section with Carousel */}
        <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden flex items-center">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex items-center">
                <div className="container-custom text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 lg:mb-8 leading-tight text-balance">
                      {slide.title}
                    </h1>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto text-balance"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                      <Link
                        to="/products"
                        className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2 group"
                      >
                        <span>{slide.cta1}</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/partnerships"
                        className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        {slide.cta2}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white shadow-glow scale-125"
                    : "bg-white/50 hover:bg-white/70 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section
          id="achievements"
          className="section-padding gradient-bg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50"></div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-110">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-5xl lg:text-6xl font-display font-bold text-gradient mb-3">
                      {achievement.label === "Countries Served"
                        ? counters.countries
                        : achievement.label === "Years Experience"
                        ? counters.experience
                        : achievement.label === "Happy Clients"
                        ? counters.clients
                        : counters.success}
                      <span className="text-3xl lg:text-4xl">
                        {achievement.suffix}
                      </span>
                    </div>
                    <div className="text-neutral-700 font-semibold text-lg">
                      {achievement.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-white relative">
          <div className="container-custom">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-gradient mb-8 text-balance">
                  Why Choose The11EximOverSeas?
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed text-balance">
                  We combine decades of experience with cutting-edge technology
                  to deliver exceptional agricultural products to global
                  markets.
                </p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="card-premium p-8 h-full hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-glow">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                      {item.description}
                    </p>
                    <ul className="space-y-3">
                      {item.features.map((feature, fIndex) => (
                        <li
                          key={fIndex}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                          <span className="text-neutral-700 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our premium range of agricultural and lifestyle
                products, carefully selected and quality-assured for global
                markets.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.certifications.map((cert, cIndex) => (
                        <span
                          key={cIndex}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        to={product.href}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                      >
                        View Details
                      </Link>
                      <Link
                        to="/contact"
                        className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
              >
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Global Market Presence */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Global Market Presence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Serving premium agricultural products to key international
                markets across the Middle East and Europe.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Markets
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">UAE</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        United Arab Emirates
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Rice, Jaggery, Premium Agro Products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">SA</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Saudi Arabia
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Strong Basmati & Spices Demand
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">QA</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Qatar</h4>
                      <p className="text-gray-600 text-sm">
                        Luxury Food Segment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">KW</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Kuwait</h4>
                      <p className="text-gray-600 text-sm">
                        Traditional Indian Staples
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/globalfoods.jpg"
                  alt="Global Trade"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-primary-600/20 rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Strategic Trade Route
                    </h4>
                    <p className="text-gray-600 text-sm">
                      India → Middle East → Europe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability & Ethics */}
        <section className="py-20 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Sustainability & Ethics
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Committed to ethical sourcing, sustainable practices, and
                supporting farming communities for a better tomorrow.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {sustainabilityStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-700 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-center">
              <div className="inline-flex items-center space-x-8 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    100% Ethical Sourcing
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    Zero Harmful Chemicals
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    Fair Trade Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Explore Global Trade Opportunities?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join hands with India's trusted export partner and take your
              business to new international heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                Request a Quote
              </Link>
              <Link
                to="/partnerships"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
