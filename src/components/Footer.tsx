
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TradeStratHub</h3>
            <p className="text-sm text-gray-300 mb-4">
              The premier marketplace for trading strategies. Connect with top creators and automate your trading.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:text-teal transition-colors">Browse Strategies</Link></li>
              <li><Link to="/marketplace?category=forex" className="hover:text-teal transition-colors">Forex</Link></li>
              <li><Link to="/marketplace?category=crypto" className="hover:text-teal transition-colors">Crypto</Link></li>
              <li><Link to="/marketplace?category=stocks" className="hover:text-teal transition-colors">Stocks</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-teal transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-teal transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-teal transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-teal transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-teal transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-teal transition-colors">FAQs</Link></li>
              <li><Link to="/support" className="hover:text-teal transition-colors">Support</Link></li>
              <li><Link to="/terms" className="hover:text-teal transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 TradeStratHub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
