export default function Footer() {
  return (
    <footer className="bg-navy-light text-text-secondary py-8 border-t border-navy mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold font-bold text-xl">GS NET</span>
            </div>
            <p className="text-sm">
              Premium Mock Test platform for UGC NET and other competitive exams. Your success, our focus.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">All Tests</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">UGC NET Paper 1</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">UGC NET Paper 2</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Results</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@gsnet.in</li>
              <li>+91 98765 43210</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-navy text-sm text-center">
          <p>&copy; {new Date().getFullYear()} GS NET Mock Test Series. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
