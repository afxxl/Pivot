import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";
type NavbarVariant = "landing" | "auth";
interface NavbarProps {
  variant?: NavbarVariant;
  authType?: "login" | "signup" | "forgot-password" | "reset-password";
}
export const Navbar = ({ variant = "landing", authType }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  if (variant === "landing") {
    return (
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <Logo size="md" showText={false} />
              <span className="text-xl font-bold text-gray-900">PIVOT</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
              >
                Testimonials
              </a>
              <Link
                to="/login"
                className="text-gray-900 hover:text-purple-600 text-sm font-medium transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
              >
                Start Free Trial
              </Link>
            </div>
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-purple-600 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
  return (
    <nav className="bg-white border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Logo size="md" showText={false} />
            <span className="text-xl font-bold text-gray-900">PIVOT</span>
          </Link>
          {/* Auth-specific right side */}
          <div className="flex items-center">
            {authType === "signup" && (
              <div className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-purple-600 hover:text-purple-700 transition"
                >
                  Sign In
                </Link>
              </div>
            )}
            {authType === "login" && (
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-purple-600 hover:text-purple-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {(authType === "forgot-password" ||
              authType === "reset-password") && (
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                ← Back to Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
