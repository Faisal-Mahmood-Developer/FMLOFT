import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/#about" },
  { label: "Pedigree", path: "/birds" },
  { label: "Racing & Training", path: "/racing" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/30">
      <div className="finish-line absolute top-0 left-0 right-0 h-px bg-primary" />
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-xl md:text-2xl tracking-widest text-primary uppercase">
          FM Loft
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
         {navLinks.map((link) => (
  <li key={link.path}>
    {link.label === "About" ? (
      <a
        href="/#about"
        className="font-body text-sm tracking-wider uppercase text-foreground hover:text-primary transition-colors duration-200"
      >
        {link.label}
      </a>
    ) : (
      <Link
        to={link.path}
        className={`font-body text-sm tracking-wider uppercase transition-colors duration-200 ${
          location.pathname === link.path
            ? "text-primary"
            : "text-foreground hover:text-primary"
        }`}
      >
        {link.label}
      </Link>
    )}
  </li>
))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-primary/30">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 font-body text-sm tracking-wider uppercase transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-muted"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
