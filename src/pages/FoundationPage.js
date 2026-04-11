import React from "react";

const FoundationPage = () => {
  return (
    <main className="min-h-screen bg-background text-primary pt-24 md:pt-28 lg:pt-32 pb-16">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Our Foundation
          </h1>
          <p className="text-2xl text-text-secondary max-w-4xl mx-auto">
            Not built on trends. Built on what almost disappeared.
          </p>
        </div>

        {/* OUR STORY */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/30 rounded-2xl p-8 md:p-12">
            <div className="mx-auto max-w-4xl space-y-6 text-lg leading-8 text-text-secondary">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
                Our Story
              </h2>

              <p className="text-xl text-primary font-semibold text-center">
                We do not sell products.{" "}
                <span className="text-accent">We pass on proof.</span>
              </p>

              <p>
                Every piece tells a story? <strong>No.</strong> That is what
                every brand says.
              </p>

              <p>
                <strong>Here is what we mean:</strong>
              </p>

              <p>
                Our artisans are not "creators."{" "}
                <strong>They are custodians</strong>; born into a skill their
                great-grandmother learned at an age when most children cannot
                tie their own shoes.
              </p>

              <p>
                They do not choose this craft. <strong>It chooses them.</strong>{" "}
                And it almost died. Twice.
              </p>

              <p>
                Once when factories arrived. Again when the world decided{" "}
                <strong>cheap was better.</strong>
              </p>

              <p>
                You buy from Indikaara, you are not "supporting a legacy".
                <strong>
                  {" "}
                  You are paying the school fee for a weaver's daughter.
                </strong>
              </p>

              <p>
                You are keeping a <strong>70-year-old potter</strong> from
                closing his wheel for good.
              </p>

              <p>
                We do not travel to find "warmth and character."
                <strong> We travel to find the last hands</strong> who still
                remember how to knot, carve, and cast the old way.
              </p>

              <p>
                Our collection is not handpicked for your joy.
                <br />
                <strong>It is handpicked for your responsibility.</strong>
              </p>

              <p>You want a home that feels uniquely yours? Fine.</p>

              <p className="text-primary font-semibold">
                But first, let it feel like a home that did not erase anyone to
                exist.
              </p>
            </div>
          </div>
        </section>

        {/* FOUNDATION CARDS (Rewritten tone) */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Vision
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                A world where craft is not replaced by machines, and skill is
                not erased by convenience. Where heritage is lived—not archived.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Mission
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                To make sure the last hands that know these crafts are not the
                last. Every product we place is a decision to keep something
                alive.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Values
              </h3>
              <div className="text-text-secondary space-y-3 text-lg">
                <p>• Craft over convenience</p>
                <p>• People over margins</p>
                <p>• Truth over storytelling</p>
                <p>• Responsibility over aesthetics</p>
              </div>
            </div>
          </div>
        </section>

        {/* REPLACED: Waste + Heritage → ONE STRONG SECTION */}
        <section className="bg-gray-800/50 mb-20 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">
            What We Actually Do
          </h2>

          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            We do not optimize for scale. We optimize for survival.
          </p>

          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            No middle layers. No dilution of value. No race to the lowest price.
          </p>

          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            Just direct relationships with artisans, fair compensation, and work
            that respects the time it takes to be made right.
          </p>

          <p className="text-primary font-semibold text-lg">
            If it cannot be made with integrity, we do not make it.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center py-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              This Is Not Just Shopping
            </h2>

            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Every piece you choose decides whether a craft survives or
              disappears.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/catalogue"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90"
              >
                Explore Collection
              </a>

              <a
                href="/artisans"
                className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white"
              >
                Meet Artisans
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FoundationPage;
