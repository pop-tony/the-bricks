import React from 'react'
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brick-white px-8 py-32 text-brick-charcoal">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Legal</p>
          <h1 className="font-serif text-5xl text-6xl text-brick-black">Privacy Policy</h1>
          <p className="mt-4 text-sm text-brick-muted">Last updated: June 4, 2026</p>
        </motion.div>

        <div className="mt-16 space-y-12 text-brick-charcoal">
          {[
            {
              num: '01',
              title: 'Information We Collect',
              content: (
                <>
                  <p className="mb-4 leading-relaxed">When you engage with The Bricks Properties, we collect:</p>
                  <ul className="space-y-2 text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="text-brick-gold">—</span><span><span className="font-medium">Personal Information:</span> Name, email, phone, property preferences</span></li>
                    <li className="flex gap-3"><span className="text-brick-gold">—</span><span><span className="font-medium">Payment Information:</span> Processed securely by Paystack. We do not store card details</span></li>
                    <li className="flex gap-3"><span className="text-brick-gold">—</span><span><span className="font-medium">Inquiry History:</span> Properties viewed, viewing appointments, offers submitted</span></li>
                    <li className="flex gap-3"><span className="text-brick-gold">—</span><span><span className="font-medium">Usage Data:</span> Pages visited, search criteria, time on site</span></li>
                  </ul>
                </>
              )
            },
            {
              num: '02',
              title: 'How We Use Your Information',
              content: (
                <ul className="space-y-2 text-sm leading-relaxed">
                  {['Arrange property viewings and respond to inquiries', 'Process offers and coordinate with sellers', 'Send property alerts matching your criteria', 'Improve our website and service offerings', 'Send market insights only if you opt in — unsubscribe anytime'].map(item => (
                    <li key={item} className="flex gap-3"><span className="text-brick-gold">—</span><span>{item}</span></li>
                  ))}
                </ul>
              )
            },
            {
              num: '03',
              title: 'Data Sharing',
              content: (
                <>
                  <p className="mb-4 leading-relaxed">We never sell your personal data. We share information only with:</p>
                  <ul className="space-y-2 text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="text-brick-gold">—</span><span><span className="font-medium">Paystack:</span> To process viewing fees securely</span></li>
                    <li className="flex gap-3"><span className="text-brick-gold">—</span><span><span className="font-medium">Property Sellers:</span> To coordinate viewings you request</span></li>
                    <li className="flex gap-3"><span className="text-brick-gold">—</span><span><span className="font-medium">Legal Requirements:</span> If required by Ghanaian law</span></li>
                  </ul>
                </>
              )
            },
            {
              num: '04',
              title: 'Cookies & Tracking',
              content: <p className="text-sm leading-relaxed">We use cookies to maintain your session, remember saved properties, and analyze site traffic. You can disable cookies in your browser, but some features may not function properly.</p>
            },
            {
              num: '05',
              title: 'Data Security',
              content: <p className="text-sm leading-relaxed">We use industry-standard encryption and secure servers to protect your data. However, no method of transmission over the internet is 100% secure. Use strong passwords and keep your account details confidential.</p>
            },
            {
              num: '06',
              title: 'Your Rights',
              content: (
                <>
                  <p className="mb-4 text-sm leading-relaxed">You have the right to:</p>
                  <ul className="space-y-2 text-sm leading-relaxed">
                    {['Access the personal data we hold about you', 'Request correction of inaccurate data', 'Request deletion of your account and data', 'Opt out of marketing communications'].map(item => (
                      <li key={item} className="flex gap-3"><span className="text-brick-gold">—</span><span>{item}</span></li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed">To exercise these rights, email <span className="font-medium text-brick-black">privacy@thebricks.com</span>.</p>
                </>
              )
            },
            {
              num: '07',
              title: "Children's Privacy",
              content: <p className="text-sm leading-relaxed">Our services are not directed to individuals under 18. We do not knowingly collect data from children. If you believe we have, contact us immediately.</p>
            },
            {
              num: '08',
              title: 'Changes to This Policy',
              content: <p className="text-sm leading-relaxed">We may update this policy periodically. Changes will be posted on this page with an updated "Last updated" date. Continued use after changes constitutes acceptance.</p>
            },
            {
              num: '09',
              title: 'Contact Us',
              content: (
                <p className="text-sm leading-relaxed">
                  For privacy questions or requests, contact: <br />
                  <span className="font-medium text-brick-black">Email:</span> privacy@thebricks.com <br />
                  <span className="font-medium text-brick-black">Address:</span> East Legon, Accra, Ghana
                </p>
              )
            }
          ].map((section, i) => (
            <motion.section
              key={section.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="border-t border-brick-subtle pt-8"
            >
              <div className="flex gap-6">
                <span className="font-serif text-sm text-brick-gold">{section.num}</span>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-brick-black mb-4">{section.title}</h2>
                  {section.content}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}