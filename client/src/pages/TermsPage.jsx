import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function Terms() {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content: "By accessing The Bricks Properties website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our platform."
    },
    {
      title: "2. Property Listings & Accuracy",
      content: "All property information, including prices, specifications, and availability, is provided by sellers or their agents. While we verify listings, The Bricks does not guarantee absolute accuracy. Prices are listed in Ghana Cedis (₵) and subject to change. Buyers are advised to conduct independent due diligence."
    },
    {
      title: "3. Agent Services & Commissions",
      content: "Our agents act as intermediaries between buyers and sellers. Commission structures are disclosed prior to engagement and payable upon successful closing. The Bricks reserves the right to refuse service at our discretion."
    },
    {
      title: "4. Viewing Appointments",
      content: "Viewing fees of GHS 100 apply to secure appointments and are non-refundable. Fees are credited toward commission if a purchase is completed within 90 days through The Bricks. Cancellations must be made 24 hours in advance."
    },
    {
      title: "5. Intellectual Property",
      content: "All content on this site, including property photos, descriptions, logos, and branding, is property of The Bricks Properties and protected by copyright. Unauthorized reproduction is prohibited."
    },
    {
      title: "6. Limitation of Liability",
      content: "The Bricks is not liable for indirect or consequential damages arising from property transactions. Our total liability shall not exceed the commission received for the specific transaction."
    },
    {
      title: "7. Privacy & Data",
      content: "We collect personal information to facilitate transactions. Data is stored securely and never sold to third parties. See our Privacy Policy for full details."
    },
    {
      title: "8. Contact",
      content: "Questions regarding these Terms? Contact us at legal@thebricks.com or +233 XX XXX XXXX. Our office is located in East Legon, Accra."
    }
  ];

  return (
    <div className="min-h-screen bg-brick-white pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase">Legal</p>
          <h1 className="font-serif mt-3 text-5xl md:text-6xl text-brick-black">Terms of Service</h1>
          <p className="mt-6 text-sm text-brick-muted">Last updated: June 4, 2026</p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="border-b border-brick-subtle pb-12 last:border-0"
            >
              <h2 className="font-serif text-2xl text-brick-black mb-4">{section.title}</h2>
              <p className="text-sm leading-relaxed text-brick-muted">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}