import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircleOutline,
  Public,
  Handshake,
  Palette,
  Recycling,
  SwapHoriz,
} from "@mui/icons-material";

export const WhyConnectCards = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const items = [
    {
      icon: CheckCircleOutline,
      title: "Curated Quality",
      description:
        "Each creation in Indikaara’s collection is a labor of love — shaped by hands that carry generations of mastery. Every texture, weave, and stroke is chosen with care, ensuring every piece radiates authenticity and soul. Our promise is timeless quality that feels alive — art that endures long after trends fade.",
    },
    {
      icon: Public,
      title: "Global Reach",
      description:
        "Through Indikaara, the spirit of India journeys across oceans. From the deserts of Rajasthan to the coasts of Kerala, we bring the essence of our homeland to the world. Every handcrafted treasure becomes a silent storyteller — connecting distant hearts through artistry, culture, and the shared beauty of human creativity.",
    },
    {
      icon: Handshake,
      title: "Fair Partnerships",
      description:
        "Behind every creation stands an artisan whose dream we honor. We nurture fair partnerships built on respect, compassion, and shared growth. Every purchase uplifts a family, sustains a village, and breathes new life into traditional craft. Together, we weave a bond where art and humanity flourish hand in hand.",
    },
    {
      icon: Palette,
      title: "Living Heritage",
      description:
        "Our designs are poems of the past — echoing traditions reborn in modern form. At Indikaara, ancient motifs meet contemporary elegance, creating harmony between yesterday’s artistry and today’s vision. Each product celebrates India’s living heritage, carrying whispers of stories, festivals, and dreams once painted in the colors of time.",
    },
    {
      icon: Recycling,
      title: "Sustainable",
      description:
        "We believe beauty should never come at the earth’s expense. Our artisans craft with intention — using natural fibers, ethical materials, and mindful methods. Every stitch and carving reflects balance with nature. Sustainability for us is not a choice but a philosophy — a gentle rhythm guiding how we create and care.",
    },
    {
      icon: SwapHoriz, // or Loop, Cached
      title: "Easy Returns & Exchanges",
      description:
        "Your connection with Indikaara should feel effortless. If your chosen piece doesn’t feel right, our return and exchange process is graceful and seamless. We value your trust, ensuring every interaction reflects warmth and understanding — because true craftsmanship is not only in our art, but in the care we extend to you.",
    },
  ];

  const selectedItem = items[selectedIndex];
  const SelectedIcon = selectedItem.icon;

  return (
    <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.45fr)] lg:items-start">
      <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = selectedIndex === index;

            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setSelectedIndex(index)}
                whileTap={{ scale: 0.985 }}
                className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-250 ${
                  isActive
                    ? "border-primary bg-primary text-white ring-1 ring-primary/30 shadow-[0_10px_20px_rgba(172,31,35,0.28)]"
                    : "border-gray-200 bg-white hover:border-primary/35 hover:bg-primary/5"
                }`}
                aria-pressed={isActive}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-primary"
                  }`}
                >
                  <Icon style={{ fontSize: "1.1rem" }} />
                </div>
                <span
                  className={`flex-1 text-[0.78rem] font-semibold tracking-tight transition-colors ${
                    isActive ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.article
        layout
        className="h-full rounded-2xl border border-[#ac1f23]/25 bg-white p-5 sm:p-6 text-left shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ac1f23]/10 text-[#ac1f23]">
                <SelectedIcon style={{ fontSize: "1.2rem" }} />
              </div>
              <h3 className="text-[0.93rem] font-semibold tracking-tight text-gray-900">
                {selectedItem.title}
              </h3>
            </div>

            <p className="text-[0.78rem] leading-7 text-gray-700">
              {selectedItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.article>
    </section>
  );
};
