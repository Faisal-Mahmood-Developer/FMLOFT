import Layout from "@/components/Layout";
import pigeonPortrait1 from "@/assets/pigeon-portrait-1.jpg";
import pigeonPortrait2 from "@/assets/pigeon-portrait-2.jpg";
import pigeonPortrait3 from "@/assets/pigeon-portrait-3.jpg";
import raceMoment1 from "@/assets/race-moment-1.jpg";
import raceMoment2 from "@/assets/race-moment-2.jpg";
import loftInterior from "@/assets/loft-interior.jpg";

const racingPigeons = [
  { src: pigeonPortrait1, alt: "Racing pigeon — Blue bar" },
  { src: pigeonPortrait2, alt: "Racing pigeon — White" },
  { src: pigeonPortrait3, alt: "Racing pigeon — Dark check" },
];

const raceMoments = [
  { src: raceMoment1, alt: "Race day release from basket" },
  { src: raceMoment2, alt: "Flock in formation against sunset" },
];

const loftPhotos = [
  { src: loftInterior, alt: "FM Loft interior with nesting boxes" },
];

const Gallery = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="finish-line h-px bg-primary w-24 mb-8" />
          <h1 className="release-up font-display text-3xl md:text-5xl tracking-wider uppercase text-foreground">
            Gallery
          </h1>
          <p className="release-up-delay-1 font-body text-muted-foreground mt-4 max-w-xl">
            A visual record of FM Loft's racing pigeons, competition moments, and facility.
          </p>
        </div>
      </section>

      {/* Racing Pigeons — portrait aspect ratio 4:5 */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="font-display text-xl md:text-2xl tracking-wider uppercase text-primary mb-8">
            Racing Pigeons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/30">
            {racingPigeons.map((img, i) => (
              <div
                key={i}
                className={`release-up-delay-${i + 1} bg-background border border-primary/30 overflow-hidden`}
              >
                <div className="aspect-[4/5]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 border-t border-primary/30">
                  <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Race Moments — cinematic 16:9 */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="font-display text-xl md:text-2xl tracking-wider uppercase text-primary mb-8">
            Race Moments
          </h2>
          <div className="space-y-px">
            {raceMoments.map((img, i) => (
              <div
                key={i}
                className="border border-primary/30 overflow-hidden release-up"
              >
                <div className="aspect-video">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 border-t border-primary/30">
                  <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loft Photos */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="font-display text-xl md:text-2xl tracking-wider uppercase text-primary mb-8">
            The Loft
          </h2>
          <div className="grid grid-cols-1 gap-px">
            {loftPhotos.map((img, i) => (
              <div key={i} className="border border-primary/30 overflow-hidden release-up">
                <div className="aspect-video md:aspect-[21/9]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 border-t border-primary/30">
                  <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
