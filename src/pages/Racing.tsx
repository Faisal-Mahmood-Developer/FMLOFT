import Layout from "@/components/Layout";
import { Clock, Wind, MapPin, Target } from "lucide-react";

const trainingMethods = [
  {
    icon: Clock,
    title: "Progressive Distance Training",
    description:
      "Begin with short 5-10 km tosses and gradually increase distance over weeks. Consistency is key — birds must build endurance incrementally to develop reliable homing instincts over hundreds of kilometers.",
  },
  {
    icon: Wind,
    title: "Weather Conditioning",
    description:
      "Train birds in varying weather conditions to build resilience. Controlled exposure to crosswinds, light rain, and shifting temperatures prepares them for the unpredictable conditions of race day.",
  },
  {
    icon: MapPin,
    title: "Route Familiarization",
    description:
      "Regular tosses along competition corridors allow birds to memorize landmarks, magnetic field patterns, and sun positions. Familiarity with the route dramatically improves return times.",
  },
  {
    icon: Target,
    title: "Trap Training & Motivation",
    description:
      "Fast trapping — entering the loft quickly upon return — can win or lose a race. Use controlled feeding schedules and mate motivation to ensure birds enter the trap without hesitation.",
  },
];

const tips = [
  "Maintain strict hygiene in the loft to prevent respiratory diseases that affect flight performance.",
  "Implement a balanced diet of grains, seeds, and supplements tailored to training vs. rest periods.",
  "Monitor weight carefully — an overweight bird loses speed; an underweight bird lacks stamina.",
  "Rest is as critical as training. Overworked birds develop stress and lose competitive edge.",
  "Study wind patterns and weather forecasts before every training toss and competition.",
  "Keep detailed records of each bird's performance to identify your strongest racers.",
];

const Racing = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="finish-line h-px bg-primary w-24 mb-8" />
          <h1 className="release-up font-display text-3xl md:text-5xl tracking-wider uppercase text-foreground">
            Racing & Training
          </h1>
          <p className="release-up-delay-1 font-body text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            The science and discipline behind preparing elite racing pigeons for competition.
            From progressive distance training to race-day strategy.
          </p>
        </div>
      </section>

      {/* About Racing */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground mb-6">
              The Sport of Kings
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                Pigeon racing is one of the oldest competitive sports in the world, with roots
                tracing back to ancient Persia and Rome. Birds are released from a designated
                point and must navigate back to their home loft using an extraordinary combination
                of magnetic field sensing, sun compass orientation, and visual landmark memory.
              </p>
              <p>
                Races can span distances from 100 km to over 1,000 km. Speed is measured in
                meters per minute, with elite birds averaging 1,200–1,500 m/min in favorable
                conditions. The fastest bird to return to its loft wins.
              </p>
              <p>
                At FM Loft, we combine traditional knowledge with modern conditioning techniques
                to develop birds that are fast, resilient, and mentally sharp for long-distance
                competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Methods */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground mb-12">
            Training Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/30">
            {trainingMethods.map((method, i) => (
              <div
                key={i}
                className="bg-background p-8 md:p-10 border border-primary/30"
              >
                <method.icon size={20} className="text-primary mb-4" />
                <h3 className="font-display text-lg tracking-wider uppercase text-foreground mb-3">
                  {method.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground mb-12">
            Tips for Long-Distance Racing
          </h2>
          <div className="max-w-3xl space-y-0 divide-y divide-primary/30 border-y border-primary/30">
            {tips.map((tip, i) => (
              <div key={i} className="py-6 flex gap-4 items-start">
                <span className="font-display text-sm text-primary mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Racing;
