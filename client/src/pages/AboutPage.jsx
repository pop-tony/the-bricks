export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brick-navy pt-24">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-black text-white md:text-5xl">About The Bricks</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p className="text-lg text-zinc-300">
            Founded in 2015, The Bricks Properties is a GREDA-licensed real estate firm based in East Legon, Accra.
          </p>
          <p className="mt-4 text-zinc-400">
            We build, rent, sell, and manage modern residential and commercial properties across Ghana. 
            Our mission is to make property ownership transparent and accessible for Ghanaians at home and in the diaspora.
          </p>
          <h2 className="mt-12 text-2xl font-bold text-white">Why Choose Us</h2>
          <ul className="mt-4 space-y-2 text-zinc-400">
            <li>✓ All properties have verified titles</li>
            <li>✓ Flexible payment plans available</li>
            <li>✓ 10+ years serving Accra market</li>
            <li>✓ 200+ properties sold & managed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
