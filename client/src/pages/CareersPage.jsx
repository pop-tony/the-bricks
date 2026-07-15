export default function CareersPage() {
  return (
    <div className="min-h-screen bg-brick-white pt-32">
      <div className="mx-auto max-w-4xl px-8">
        <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-6">Careers</p>
        <h1 className="font-serif text-5xl text-7xl text-brick-black mb-8">Join The Bricks</h1>
        <p className="text-base leading-relaxed text-brick-muted max-w-2xl">
          We're always looking for exceptional talent to join our team in Accra. 
          If you're passionate about real estate and client service, we'd love to hear from you.
        </p>
        <div className="mt-12 border-t border-brick-subtle pt-12">
          <p className="text-sm text-brick-charcoal">
            Send your CV to <a href="mailto:careers@thebricksgh.com" className="text-brick-gold hover:text-brick-black transition-luxe">careers@thebricksgh.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}