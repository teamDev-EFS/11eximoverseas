import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const topProducts = [
    {
      name: "Premium Rice Portfolio",
      emoji: "🌾",
      href: "/products?category=rice",
    },
    { name: "Fresh Onion", emoji: "🧅", href: "/products?product=onion" },
    { name: "Quality Garlic", emoji: "🧄", href: "/products?product=garlic" },
    { name: "Makhana", emoji: "⭐", href: "/products?product=makhana" },
    {
      name: "Cumin Seeds (Jeera)",
      emoji: "🌿",
      href: "/products?product=jeera",
    },
    {
      name: "Fenugreek Seeds",
      emoji: "🌱",
      href: "/products?product=fenugreek",
    },
    {
      name: "Pearl Millets",
      emoji: "🌾",
      href: "/products?product=pearl-millets",
    },
    {
      name: "Sorghum Seeds (Jowar)",
      emoji: "🌿",
      href: "/products?product=jowar",
    },
    { name: "Scented Candles", emoji: "🕯️", href: "/products?product=candles" },
  ];

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-neutral-900 to-accent-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

      {/* Main Footer */}
      <div className="container-custom py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className="w-20 h-16 flex items-center justify-center">
                  <img
                    src="/images/11eximoverseas-logo.svg"
                    alt="The11EximOverSeas Logo"
                    className="h-16 w-auto"
                  />
                </div>
              </div>
            </div>
            <p className="text-neutral-300 mb-8 leading-relaxed text-lg">
              Connecting India's finest agricultural products to global markets
              with excellence, sustainability, and unwavering commitment to
              quality.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-12 h-12 bg-neutral-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:scale-110 transition-all duration-300 border border-neutral-700/50"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-neutral-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:scale-110 transition-all duration-300 border border-neutral-700/50"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-neutral-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:scale-110 transition-all duration-300 border border-neutral-700/50"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-neutral-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:scale-110 transition-all duration-300 border border-neutral-700/50"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block text-gray-300 hover:text-primary-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-gray-300 hover:text-primary-400 transition-colors"
              >
                Products
              </Link>
              <Link
                to="/global-markets"
                className="block text-gray-300 hover:text-primary-400 transition-colors"
              >
                Global Markets
              </Link>
              <Link
                to="/team"
                className="block text-gray-300 hover:text-primary-400 transition-colors"
              >
                Our Team
              </Link>
              <Link
                to="/partnerships"
                className="block text-gray-300 hover:text-primary-400 transition-colors"
              >
                Partnerships
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-primary-400 transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Top Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Top Products</h4>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <Link
                  key={index}
                  to={product.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors group"
                >
                  <span className="text-sm">{product.emoji}</span>
                  <span className="text-sm">{product.name}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    81, Vishwakarma Nagar
                    <br />
                    Indore, Madhya Pradesh
                    <br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <a
                  href="tel:+919617270009"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  +91 9617270009
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <a
                  href="mailto:the11eximoverseas@gmail.com"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  the11eximoverseas@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h5 className="font-semibold text-primary-400 mb-4">Follow Us</h5>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.instagram.com/the11exim/?utm_source=qr&igsh=NXFjc2wybzZvZXBr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/the-exim-overseas-3a726635a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@THE11EXIMOVERSEAS-t1n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/the11eximoverseas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-4 bg-primary-600/20 rounded-lg border border-primary-600/30">
              <h5 className="font-semibold text-primary-400 mb-2">
                Ready to explore global trade?
              </h5>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/contact"
                  className="text-sm bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors text-center"
                >
                  Request Quote
                </Link>
                <Link
                  to="/partnerships"
                  className="text-sm border border-primary-600 text-primary-400 px-4 py-2 rounded hover:bg-primary-600/10 transition-colors text-center"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} The11EximOverSeas Ventures. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/documents"
                className="hover:text-primary-400 transition-colors"
              >
                Certifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
