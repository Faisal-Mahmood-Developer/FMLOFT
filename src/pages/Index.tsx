import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-pigeons.jpg";
import pigeonPortrait from "@/assets/coverpic.jpeg";
import About from "./About";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Racing pigeons in flight at dawn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="finish-line h-px bg-primary mb-8 w-24" />
            <h1 className="release-up font-display text-4xl md:text-6xl lg:text-7xl tracking-wider uppercase text-foreground leading-tight">
              FM Loft
            </h1>
            <p className="release-up-delay-1 font-display text-lg md:text-xl tracking-widest uppercase text-primary mt-2">
              Racing Pigeon Loft
            </p>
            <p className="release-up-delay-2 font-body text-base md:text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed">
              Racing Pigeon Loft in Lahore, Pakistan. Established 2026 by Faisal Mahmood —
              dedicated to breeding champions and competing at the highest level.
            </p>
            <div className="release-up-delay-3 flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/gallery"
                className="inline-block border border-primary bg-primary text-primary-foreground px-8 py-3 font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors text-center"
              >
                View Gallery
              </Link>
              <Link
                to="/contact"
                className="inline-block border border-primary text-primary px-8 py-3 font-body text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="border-t border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-px bg-primary w-16 mb-6" />
              <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground mb-6">
                The Pursuit of Excellence
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                FM Loft was founded in 2026 in Lahore, Pakistan by Faisal Mahmood with a singular
                vision: to breed and train racing pigeons capable of competing at the highest levels
                of the sport.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Every bird in our loft represents years of careful selection, meticulous training,
                and an unwavering commitment to the ancient art of pigeon racing — a tradition that
                spans centuries and continents.
              </p>
            </div>
            <div className="border border-primary/30 overflow-hidden">
              <img
                src={pigeonPortrait}
                alt="Racing pigeon portrait"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-primary/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary/30">
            {[
              { value: "2026", label: "Established" },
              { value: "Lahore", label: "Location" },
              { value: "Racing", label: "Discipline" },
              { value: "Elite", label: "Bloodlines" },
            ].map((stat) => (
              <div key={stat.label} className="py-12 md:py-16 text-center">
                <p className="font-display text-2xl md:text-3xl text-primary tracking-wider">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* about section  */}
      <About />
    </Layout>
  );
};

export default Index;
