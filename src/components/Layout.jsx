import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Activity,
  Home,
  Clock,
  Info,
  LogOut,
  User,
  Users,
} from "lucide-react";
// import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const { user } = useAuth();

  // useEffect(() => {
  // if (Cookies.get("auth_token")) {
  // const res = await axios.get()
  // }
  // Fetch user data if token exists
  // This is a placeholder, replace with actual user fetching logic
  // setUser({ name: "John Doe", email: "
  // }), []);

  const navigation = [
    { name: "Home", href: "/", icon: Home, public: true },
    { name: "Diagnosis", href: "/diagnosis", icon: Activity, protected: true },
    { name: "Find Doctors", href: "/doctors", icon: Users, protected: true },
    { name: "About", href: "/about", icon: Info, public: true },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleLogout = async () => {
    Cookies.remove("auth_token");
    toast.success("Logged out successfully");
    setShowUserMenu(false);
    navigate("/");
  };

  // Filter navigation based on authentication status
  const visibleNavigation = navigation.filter(
    (item) => item.public || (item.protected && Cookies.get("auth_token"))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Pneumonia Detection
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {visibleNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.href)
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* User Menu */}
              {Cookies.get("auth_token") ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <User className="w-4 h-4" />
                    <span>Dr. {Cookies.get("username") || "User"}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b ">
                        <div className="font-medium">
                          Dr. {Cookies.get("username")}
                        </div>
                        <div className="text-gray-500">
                          {Cookies.get("email")}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {visibleNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActivePath(item.href)
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile User Menu */}
              {Cookies.get("auth_token") ? (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="px-3 py-2">
                    <div className="text-base font-medium text-gray-800">
                      Dr. {Cookies.get("username")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Cookies.get("email")}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md mx-3"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              © 2025 Chest Pneumonia Detection System. Built for medical
              professionals.
            </p>
            <p className="mt-1">Powered by AI and Machine Learning</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
