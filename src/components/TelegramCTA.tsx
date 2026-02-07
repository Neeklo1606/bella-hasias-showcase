import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const TelegramCTA = () => {
  return (
    <section className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
      
      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-8"
          >
            <Send className="w-9 h-9 text-primary-foreground" />
          </motion.div>

          {/* Header */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4"
          >
            Telegram-канал
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-h2 text-foreground mb-10"
          >
            Больше работ и жизни
          </motion.h2>

          {/* CTA Button */}
          <motion.a
            href="https://t.me/bellahasias"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-luxury inline-flex items-center gap-3 text-base py-4 px-10"
          >
            <Send className="w-5 h-5" />
            Подписаться на канал
          </motion.a>

          {/* Channel handle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-sans text-sm text-muted-foreground mt-6"
          >
            @bellahasias
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TelegramCTA;
