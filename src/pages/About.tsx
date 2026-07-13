import Layout from "@/components/Layout";
import loftImage from "@/assets/loft-interior.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* Header */}
      <section id="about" className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="finish-line h-px bg-primary w-24 mb-8" />
          <h1 className="release-up font-display text-3xl md:text-5xl tracking-wider uppercase text-foreground">
            About FM Loft
          </h1>
          <p className="release-up-delay-1 font-body text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            The story of a loft built on passion, guided by mentorship, and driven by the
            pursuit of racing excellence.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border border-primary/30 overflow-hidden">
              <img
                src={loftImage}
                alt="FM Loft interior"
                className="w-full h-72 lg:h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  FM Loft was established in 2026 in Lahore, Pakistan by Faisal Mahmood. What
                  began as a personal passion for racing pigeons has grown into a dedicated
                  facility focused on breeding high-quality birds and competing in Pakistan's
                  racing pigeon circuit.
                </p>
                <p>
                  The loft operates on principles of careful genetic selection, rigorous training
                  regimens, and an deep respect for the centuries-old tradition of pigeon racing.
                  Every aspect of the operation — from nutrition to flight conditioning — is
                  calibrated for peak performance.
                </p>
                <p>
                  Under the ownership of Faisal Mahmood, FM Loft continues to grow its reputation
                  in the competitive racing pigeon community of Lahore and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lineage / Mentors */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground mb-12 text-center">
            Lineage & Mentorship
          </h2>

          {/* Pedigree-style layout */}
          <div className="max-w-4xl mx-auto">
            {/* FM Loft center */}
            <div className="flex justify-center mb-8">
              <div className="border border-primary px-8 py-6 text-center">
                <p className="font-display text-xl tracking-widest uppercase text-primary">
                  FM Loft
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Faisal Mahmood · Est. 2026
                </p>
              </div>
            </div>

            {/* Connecting lines */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-12 bg-primary" />
            </div>

            <div className="flex justify-center mb-8">
              <div className="w-64 md:w-96 h-px bg-primary relative">
                <div className="absolute left-0 top-0 w-px h-12 bg-primary" />
                <div className="absolute right-0 top-0 w-px h-12 bg-primary" />
              </div>
            </div>

            {/* Mentor lofts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="border border-primary/50 p-6 md:p-8">
                <p className="font-display text-lg tracking-widest uppercase text-primary mb-2">
                  Rajowal Loft
                </p>
                <p className="font-body text-sm text-foreground mb-3">Riaz Mahmood</p>
                <div className="h-px bg-primary/30 mb-3" />
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  A respected and accomplished racing pigeon fancier. Rajowal Loft has been
                  instrumental in guiding FM Loft from its earliest days, sharing decades of
                  knowledge in breeding, training, and competitive strategy.
                </p>
              </div>

              <div className="border border-primary/50 p-6 md:p-8">
                <p className="font-display text-lg tracking-widest uppercase text-primary mb-2">
                  HHH Loft
                </p>
                <p className="font-body text-sm text-foreground mb-3">Faheem Sadiq</p>
                <div className="h-px bg-primary/30 mb-3" />
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  A valued supporter and fellow racing pigeon enthusiast. HHH Loft has provided
                  continuous encouragement and support, playing a key role in FM Loft's development
                  within the competitive racing community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-5">


        <Link
          to="/gallery"
          className="inline-block border border-primary text-primary px-8 py-3 font-body text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors text-center"
        >
          View Gallery
        </Link>
      </div>
    </>
  );
};

export default About;
