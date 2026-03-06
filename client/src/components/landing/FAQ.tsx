import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Who can post a problem on GiveWave?',
    answer: 'Anyone can post a problem — individuals, families, NGOs, schools or community groups. You just need to register, verify your identity and submit your campaign with supporting documents.'
  },
  {
    question: 'How does GiveWave verify campaigns?',
    answer: 'Every campaign goes through a verification process where our team checks identity proof, supporting documents and legitimacy of the problem. Verified campaigns get a trust badge that increases donor confidence.'
  },
  {
    question: 'How is the donated money handled?',
    answer: 'All donations are held securely and released to campaign creators in tranches as they upload proof of usage — bills, photos and updates. This ensures complete transparency and accountability.'
  },
  {
    question: 'Can I volunteer without donating money?',
    answer: 'Absolutely! You can volunteer your time, skills and effort for campaigns near your location. Simply click "I want to volunteer" on any campaign, fill a short form and wait for the manager to approve you.'
  },
  {
    question: 'What happens if a campaign does not reach its goal?',
    answer: 'If a campaign does not reach its goal by the deadline, donors are given the option to either get a full refund or redirect their donation to a similar active campaign.'
  },
  {
    question: 'Is GiveWave free to use?',
    answer: 'Yes! GiveWave is completely free for donors and volunteers. Campaign creators pay a small platform fee only when their campaign is successfully funded.'
  },
  {
    question: 'Can companies use GiveWave for CSR?',
    answer: 'Yes! We have a dedicated Corporate CSR Portal where companies can discover verified causes, donate in bulk, match employee donations and receive detailed impact reports for compliance.'
  },
  {
    question: 'How do I track where my donation went?',
    answer: 'Every donor gets a personal impact dashboard showing exactly how their money was used — with bills, photos and updates uploaded by the campaign creator.'
  },
]

const FAQItem = ({ faq, index }: { faq: typeof faqs[0], index: number }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
        open
          ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30'
          : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className={`font-semibold text-base pr-8 ${
          open
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-gray-900 dark:text-white'
        }`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          open
            ? 'bg-emerald-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
        }`}>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-6 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-6 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background design - Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-25" />
      </div>
      <div className="relative z-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-semibold text-sm uppercase tracking-widest"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4"
          >
            Questions we
            <span className="text-emerald-500"> always get</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg"
          >
            Everything you need to know before you donate, volunteer or post a problem.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16 p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700"
        >
          <p className="text-gray-900 dark:text-white font-bold text-xl mb-2">
            Still have questions?
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Our team is here to help you anytime.
          </p>
          <a
            href="mailto:support@givewave.in"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-all"
          >
            Contact Support →
          </a>
        </motion.div>

      </div>
      </div>
    </section>
  )
}

export default FAQ