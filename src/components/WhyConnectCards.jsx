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
      description: `We do not curate pretty things. <strong><em>We protect living legacies.</em></strong><br/><br/>

Every creation in Indikaara's collection began as something else; a skill passed from a grandmother's hands to a granddaughter's, a weaving technique that survived empires, a carving style that outlived machines.<br/><br/>

Take the rug you see here.<br/><br/>

Before it reached you, its yarn was spun by a woman in a village that has no atlas marker. Her mother taught her. Her mother's mother taught her. That thread holds 70 years of muscle memory, patience, and pride. Then a master weaver spent 47 days, not hours, knotting it by hand. <strong><em>Not because it's efficient. Because efficiency was never the point.</em></strong><br/><br/>

We choose every texture, every weave, every stroke not for trend—but for truth.<br/><br/>

<strong><em>That is our quality standard:</em></strong><br/>
If it does not carry a story, it does not carry our name.<br/><br/>

Indikaara's promise is not perfection. Perfection is sterile. <strong><em>Our promise is <b>presence - timeless, breathing, unapologetically alive.Art that does not fade when fashion moves on. Art that dares you to ask: Who made this? And then gives you an honest answer.</b></em></strong><br/><br/>

<b>You don't own an Indikaara piece.You become its next custodian.</b>`,
    },

    {
      icon: Public,
      title: "Global Reach",
      description: `We do not ship products. <strong><em>We send proof that India still creates.</em></strong><br/><br/>

A block-printed textile from a dusty lane in Bagru does not arrive at a London flat by accident. A brass bell from a Tamil Nadu village does not find its way to a Kyoto café through luck.<br/><br/>

<strong><em>It travels because we refuse to let geography silence craftsmanship.</em></strong><br/><br/>

Every handcrafted treasure we export is not a souvenir.<br/>
<strong><em><b>It is a declaration: This tradition is still alive. And it belongs to the world.</b></em></strong><br/><br/>

<b>Let them call it global reach.<br/>
<strong><em>We call it dignity in motion.</em></strong><br/><br/>

<b>No border stops a story worth telling.</b><br />
<b>No ocean is too wide for a craft that has already survived centuries.</b><br /><br />
<b>Indikaara does not connect hearts through pretty things.</b></b><br />
<b>We connect them through unbroken lines of human skill; one village, one knot, one ocean at a time.</b>`,
    },

    {
      icon: Handshake,
      title: "Fair Partnership",
      description: `<strong><em><b>We do not have vendors. We have vows.</b></em></strong><br/><br/>

Behind every Indikaara creation stands an artisan who has been told their skill is priceless—but paid like it's worthless. By middlemen. By an industry that extracts heritage and leaves poverty.<br/><br/>

<strong><em>We refuse to be that story.</em></strong><br/><br/>

We do not negotiate down to the last rupee. <strong><em>We ask: What does your family need to thrive? Then we pay it and more.</em></strong><br/><br/>

<strong>Our model is simple:</strong><br/><br/>
<strong><em>No middlemen taking 60%</em></strong><br/><br/>
<strong><em>Advance payments before work begins</em></strong><br/><br/>
<strong><em>Every purchase tracked to the village it uplifted</em></strong><br/><br/>

You buy an Indikaara rug.<br/>
A child in that weaver's village goes to school.<br/>
A grandmother teaches the next generation; because the craft finally pays enough to keep them home.<br/><br/>

We do not ask you to feel good.<br/>
We ask you to know exactly where your money slept last night.<br/><br/>
<strong><em>This is not a partnership of convenience. This is a pact for survival of art.</em></strong>`,
    },

    {
      icon: Palette,
      title: "Living Heritage",
      description: `<strong><em><b>We do not restore antiques. We refuse to let them die.</b></em></strong><br/><br/>

A 400-year-old weaving technique is not "inspiration." <strong><em> It is a living language; spoken by hands that refuse to forget.
</em></strong><br/><br/>

At Indikaara, we do not slap ancient motifs onto modern shapes and call it fusion. We ask the artisan: How would your ancestors have wanted this to evolve? Then we listen.<br/><br/>

Old patterns. New forms.<br/>
<strong><em>Tradition without a museum cage.</em></strong><br/><br/>

Every product carries a whisper of something that almost disappeared; a festival song, a wedding dowry design, a dream first painted in indigo three centuries ago.<br/><br/>

<strong><em>This is not nostalgia. This is rebellion.</em></strong><br/><br/>

We do not preserve heritage in glass cases. We weave it into sofas, hang it on walls, and walk on it every single day.<br/><br/>
<strong><em>Because a tradition you live with - does not die.</em></strong>`,
    },

    {
      icon: Recycling,
      title: "Sustainability",
      description: `<strong><em><b>We do not call ourselves sustainable. We earn it.</b></em></strong><br/><br/>

<strong><em>Beauty at the earth's expense is not beauty. It is theft.</em></strong><br/><br/>

At Indikaara, an artisan does not reach for synthetic fiber because it is cheaper. They reach for natural cotton, wool, and jute; because their ancestors taught them:<b> The earth gives. You do not poison it in return.</b><br/><br/>
We use natural cotton, wool, and jute.<br/><br/>

We do not use "ethical materials" as a marketing badge. We use them because waste has no place in a craft meant to outlive us.<br/><br/>

<strong><em>Every stitch is intentional. Every carving respects the tree it came from.</em></strong><br/><br/>

<strong><em><b>Sustainability is not our philosophy. It is our debt.</b></em></strong><br /><br/>

We do not create with a gentle rhythm. We create with quiet fury; against an industry that calls plastic "innovation" and disposable "convenience".<br/><br/>
You want greenwashing? Go elsewhere.<br /><br />
You want a rug made by hands that still remember how to thank the earth before they cut it? You are here.
`,
    },

    {
      icon: SwapHoriz,
      title: "Easy Returns & Exchanges",
      description: `<strong><em><b>We don't hide behind fine print.</b></em></strong><br/><br/>

If a piece doesn't feel right, send it back. No hoops. No hostility. Just a return as graceful as the craft itself.</em></strong><br/><br/>

<strong><em>Your trust is not a transaction. It's the only thing we don't exchange.</em></strong>`,
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
                  className={`flex-1 text-[0.78rem] font-semibold tracking-tight ${
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

            {/* ✅ FIXED HERE */}
            <div
              className="text-[0.78rem] leading-7 text-gray-700"
              dangerouslySetInnerHTML={{ __html: selectedItem.description }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.article>
    </section>
  );
};
