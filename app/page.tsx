import { getAllInvestors } from "@/lib/investors";
import InvestorCard from "@/components/investor-card";

const investorPhilosophies: Record<string, string> = {
  "warren-buffett":
    "Buy quality businesses at a discount and hold them forever",
  "charlie-munger":
    "Invest at intersection of low price and high quality with a margin of safety",
  "benjamin-graham":
    "A stock is part of a business, not just a ticker symbol",
  "peter-lynch":
    "Invest in what you know and buy growth at a reasonable price",
  "george-soros":
    "Market prices reflect current expectations, not reality",
  "stanley-druckenmiller":
    "Combine macro thinking with bottom-up stock selection",
  "jim-simons":
    "Patterns in markets can be identified and exploited through data",
  "howard-marks":
    "Risk is what happens when you do not know what you are doing",
  "seth-klarman":
    "Buy assets when they trade at a meaningful discount to intrinsic value",
  "john-templeton":
    "Buy at the point of maximum pessimism and sell at maximum optimism",
  "philip-fisher":
    "Growth at a reasonable price beats value or growth alone",
  "ray-dalio":
    "Radical transparency and idea meritocracy lead to better decisions",
  "john-maynard-keynes":
    "Markets can remain irrational longer than you can remain solvent",
  "jesse-livermore":
    "Trend is your friend, but profits are taken when momentum changes",
  "jack-bogle":
    "Low-cost index investing beats active management for most investors",
  "joel-greenblatt":
    "Buy great businesses at good prices using a simple quantitative approach",
};

export default async function Home() {
  const investors = await getAllInvestors();

  // Map investors to card data
  const investorCards = investors.slice(0, 12).map((investor) => {
    const slug = investor.slug;
    const philosophy = investorPhilosophies[slug] || "Investment wisdom from legend";

    // Map slug to image
    const imageUrl = `/investors/${slug}.png`;

    return {
      name: investor.name,
      slug,
      philosophy,
      imageUrl,
    };
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="text-center space-y-8 mb-20">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Investment Wisdom <span className="block">from Legends</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Explore investment philosophies, greatest trades, mental models, and learnings from 27+ legendary investors across centuries.
          </p>
          <div className="pt-4">
            <p className="text-sm text-accent font-semibold uppercase tracking-widest">
              Hover to flip. Click to explore.
            </p>
          </div>
        </div>
      </section>

      {/* Investor Grid */}
      <section className="px-4 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investorCards.map((card) => (
            <InvestorCard
              key={card.slug}
              name={card.name}
              slug={card.slug}
              philosophy={card.philosophy}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>

        {/* More Coming */}
        <div className="mt-20 text-center">
          <p className="text-sm text-foreground/50 uppercase tracking-widest">
            More investors coming soon
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-foreground/50">
            A curated collection of investment wisdom from public markets legends.
          </p>
        </div>
      </footer>
    </main>
  );
}
