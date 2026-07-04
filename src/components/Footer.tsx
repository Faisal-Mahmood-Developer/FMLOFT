import { Link } from "react-router-dom";
import { Phone, MapPin, Facebook, Youtube } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/30">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Brand */}
          <div>
            <h3 className="font-display text-xl tracking-widest text-primary uppercase mb-4">
              FM Loft
            </h3>

            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              Racing Pigeon Loft in Lahore, Pakistan. Established 2018. Dedicated to breeding
              and racing high-quality pigeons.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 text-primary text-lg">

              <a
                href="https://wa.me/923083470930"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://web.facebook.com/profile.php?id=61585824973927"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition"
              >
                <Youtube size={18} />
              </a>

              <a
                href="https://www.tiktok.com/@fm.loft?_r=1&_t=ZS-94nZmbCKfMS"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaTiktok />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-primary uppercase mb-4">
              Navigate
            </h4>

            <ul className="space-y-2">
              {["Home", "About", "Gallery", "Racing & Training", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : item === "Racing & Training" ? "/racing" : `/${item.toLowerCase()}`}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-primary uppercase mb-4">
              Contact
            </h4>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={14} className="text-primary" />
                <span>+92 308 3470930</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-primary/20 mt-10 pt-6 text-center">
          <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
            FM Loft © 2018 – Racing Pigeon Loft | Lahore, Pakistan | Phone: +92 308 3470930
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;