import { motion } from 'framer-motion';
import { Send, Instagram, Sparkles } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contacts" className="section-luxury bg-secondary/30">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-left mb-16"
        >
          <h2 className="font-display text-h2 text-foreground">
            Контакты
          </h2>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
        >
          <a
            href="https://t.me/Bella_hasias"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury w-full h-14 px-4 justify-start"
          >
            <span className="inline-flex items-center gap-3">
              <Send className="w-4 h-4" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-sm font-semibold">TG</span>
                <span className="text-[11px] opacity-70">написать в тг</span>
              </span>
            </span>
          </a>
          <a
            href="https://t.me/bellahasias"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-luxury w-full h-14 px-4 justify-start"
          >
            <span className="inline-flex items-center gap-3">
              <Sparkles className="w-4 h-4" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-sm font-semibold">Канал</span>
                <span className="text-[11px] opacity-70">TG канал</span>
              </span>
            </span>
          </a>
          <a
            href="https://www.instagram.com/bellahasias/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-luxury w-full h-14 px-4 justify-start"
          >
            <span className="inline-flex items-center gap-3">
              <Instagram className="w-4 h-4" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-sm font-semibold">Insta</span>
                <span className="text-[11px] opacity-70">meta</span>
              </span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
