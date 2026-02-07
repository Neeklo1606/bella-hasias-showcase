import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Instagram, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contacts" className="section-luxury bg-secondary/30">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
          >
            <MessageCircle className="w-7 h-7 text-primary" />
          </motion.div>
          <h2 className="font-display text-h2 text-foreground mb-4">
            Контакты
          </h2>
          <p className="font-sans text-muted-foreground max-w-lg mx-auto">
            Готова обсудить ваш проект и создать что-то особенное
          </p>
        </motion.div>

        {/* Contact Cards - Only Telegram and Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12"
        >
          {/* Telegram */}
          <a
            href="https://t.me/Bella_hasias"
            target="_blank"
            rel="noopener noreferrer"
            className="card-luxury p-8 text-center group hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <Send className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Telegram</h3>
            <p className="font-sans text-sm text-muted-foreground">@Bella_hasias</p>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/bellahasias"
            target="_blank"
            rel="noopener noreferrer"
            className="card-luxury p-8 text-center group hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <Instagram className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Instagram</h3>
            <p className="font-sans text-sm text-muted-foreground">@bellahasias</p>
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/contacts"
            className="btn-luxury inline-flex items-center"
          >
            Оставить заявку
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
