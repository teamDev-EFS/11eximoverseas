import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Globe, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const productCategories = [
    { name: "Rice Portfolio", href: "/products?category=rice" },
    { name: "Spices", href: "/products?category=spices" },
    { name: "Sweeteners", href: "/products?category=sweeteners" },
    { name: "Seeds & Grains", href: "/products?category=seeds" },
    { name: "Lifestyle Products", href: "/products?category=lifestyle" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full">
      {/* Top Contact Bar */}
      <div className="hidden lg:block premium-gradient text-white py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-accent-600/90"></div>
        <div className="container-custom flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 group">
              <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">+91 9617270009</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">yawal@the11eximoverseas.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 group">
              <Globe className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-white shadow-2xl border-b-2 border-primary-200/60 ring-1 ring-primary-100/50"
            : "bg-white shadow-sm border-b border-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center h-28">
            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <div className="relative">
                <div className="w-22 h-18 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 rounded-lg bg-white/50 p-2 shadow-sm">
                  <img
                    src="/src/assets/images/11eximoverseas-logo.svg"
                    alt="The11EximOverSeas Logo"
                    className="h-18 w-22 max-w-none"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center ml-8">
              <Link
                to="/"
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === "/"
                    ? "text-primary-600 bg-primary-50 shadow-soft"
                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                Home
              </Link>

              <div className="relative dropdown-container">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "products" ? null : "products"
                    )
                  }
                  className={`flex items-center space-x-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    location.pathname.startsWith("/products")
                      ? "text-primary-600 bg-primary-50 shadow-soft"
                      : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50"
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === "products" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "products" && (
                  <div className="absolute top-full left-0 mt-2 w-72 card-premium py-3 animate-slide-down z-50">
                    {productCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 hover:translate-x-2"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/global-markets"
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === "/global-markets"
                    ? "text-primary-600 bg-primary-50 shadow-soft"
                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                Global Markets
              </Link>
              <Link
                to="/partnerships"
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === "/partnerships"
                    ? "text-primary-600 bg-primary-50 shadow-soft"
                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                Partnerships
              </Link>
              <Link
                to="/team"
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === "/team"
                    ? "text-primary-600 bg-primary-50 shadow-soft"
                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                Team
              </Link>
              <Link
                to="/documents"
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === "/documents"
                    ? "text-primary-600 bg-primary-50 shadow-soft"
                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                Documents
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === "/contact"
                    ? "text-primary-600 bg-primary-50 shadow-soft"
                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <Link
                to="/products"
                className="px-4 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 text-sm"
              >
                Explore Products
              </Link>
              <Link
                to="/partnerships"
                className="px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-medium text-sm"
              >
                Partner With Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 ml-2 flex-shrink-0"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-neutral-200/50 py-6 animate-slide-down max-h-[80vh] overflow-y-auto bg-white">
              <div className="container-custom">
                <nav className="flex flex-col space-y-2">
                  <Link
                    to="/"
                    className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/global-markets"
                    className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Global Markets
                  </Link>
                  <Link
                    to="/partnerships"
                    className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Partnerships
                  </Link>
                  <Link
                    to="/team"
                    className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Team
                  </Link>
                  <Link
                    to="/documents"
                    className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Documents
                  </Link>
                  <Link
                    to="/contact"
                    className="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <div className="pt-6 border-t border-neutral-200/50 flex flex-col space-y-3">
                    <Link
                      to="/products"
                      className="btn-secondary text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Explore Products
                    </Link>
                    <Link
                      to="/partnerships"
                      className="btn-primary text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Partner With Us
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
