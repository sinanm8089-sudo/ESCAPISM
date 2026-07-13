"use client";

export default function Footer() {
  return (
    <footer className="relative bg-dark-bg border-t border-gold/10 pt-20 pb-10 overflow-hidden">
      {/* Decorative top fog */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-6 inline-block">
              <img 
                src="/images/brand/logo.jpg" 
                alt="ESCAPISM Logo" 
                className="w-12 h-12 rounded-full object-cover border border-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
              />
              <span className="font-heading text-2xl text-gold font-semibold tracking-wider">
                ESCAPISM
              </span>
            </a>
            <p className="text-fog text-sm leading-relaxed mb-6">
              A premium travel memory platform. Escape the ordinary, explore the unknown, and remember every detail.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-cream font-semibold tracking-wider uppercase text-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#gallery" className="text-fog hover:text-gold transition-colors text-sm">Memory Gallery</a></li>
              <li><a href="#homestays" className="text-fog hover:text-gold transition-colors text-sm">Luxury Homestays</a></li>
              <li><a href="#timeline" className="text-fog hover:text-gold transition-colors text-sm">Trip Timelines</a></li>
              <li><a href="#community" className="text-fog hover:text-gold transition-colors text-sm">Community</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-cream font-semibold tracking-wider uppercase text-sm mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#upload" className="text-fog hover:text-gold transition-colors text-sm">Upload Photos</a></li>
              <li><a href="/admin" className="text-fog hover:text-gold transition-colors text-sm">Admin Dashboard</a></li>
              <li><a href="#" className="text-fog hover:text-gold transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-fog hover:text-gold transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-cream font-semibold tracking-wider uppercase text-sm mb-6">Newsletter</h4>
            <p className="text-fog text-sm mb-4">Join our community of explorers.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-dark-surface border border-gold/20 rounded-full py-3 px-5 text-sm text-cream placeholder:text-fog focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-gold text-dark-bg font-semibold rounded-full text-xs uppercase tracking-wider hover:bg-gold-light transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-fog text-xs uppercase tracking-widest">
            © 2025 ESCAPISM. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-fog hover:text-gold transition-colors text-sm">IG</a>
            <a href="#" className="text-fog hover:text-gold transition-colors text-sm">TW</a>
            <a href="#" className="text-fog hover:text-gold transition-colors text-sm">PT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
