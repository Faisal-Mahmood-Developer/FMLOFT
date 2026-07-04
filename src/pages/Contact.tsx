import { useState } from "react";
import Layout from "@/components/Layout";
import { Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="finish-line h-px bg-primary w-24 mb-8" />
          <h1 className="release-up font-display text-3xl md:text-5xl tracking-wider uppercase text-foreground">
            Contact
          </h1>
          <p className="release-up-delay-1 font-body text-muted-foreground mt-4 max-w-xl">
            Get in touch with FM Loft. We welcome inquiries about our birds, racing, and
            breeding program.
          </p>
        </div>
      </section>

      <section className="border-b border-primary/30">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-xl md:text-2xl tracking-wider uppercase text-foreground mb-8">
                Reach Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 border border-primary/30 p-6">
                  <Phone size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-display text-sm tracking-wider uppercase text-foreground mb-1">
                      Phone
                    </p>
                    <p className="font-body text-sm text-muted-foreground">+92 308 3470930</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border border-primary/30 p-6">
                  <MapPin size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-display text-sm tracking-wider uppercase text-foreground mb-1">
                      Location
                    </p>
                    <p className="font-body text-sm text-muted-foreground">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-surface text-surface-foreground p-8 md:p-10 border border-primary/30">
              <h2 className="font-display text-xl tracking-wider uppercase mb-6">
                Send a Message
              </h2>

              {submitted ? (
                <div className="py-12 text-center">
                  <p className="font-display text-lg tracking-wider uppercase text-primary mb-2">
                    Message Sent
                  </p>
                  <p className="font-body text-sm text-surface-foreground/70">
                    Thank you for reaching out. We will respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-body text-xs tracking-wider uppercase block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border border-primary/40 px-4 py-3 font-body text-sm text-surface-foreground placeholder:text-surface-foreground/40 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-wider uppercase block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border border-primary/40 px-4 py-3 font-body text-sm text-surface-foreground placeholder:text-surface-foreground/40 focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-wider uppercase block mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border border-primary/40 px-4 py-3 font-body text-sm text-surface-foreground placeholder:text-surface-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground border border-primary px-8 py-3 font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
                  >
                    <Send size={14} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
