import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Mail, MapPin } from 'lucide-react';

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
          <p className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Контакты
          </p>
          <h2 className="font-display text-h2 text-foreground mb-4">
            Давайте работать вместе
          </h2>
          <p className="font-sans text-muted-foreground max-w-lg mx-auto">
            Готова обсудить ваш проект и создать что-то особенное
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {/* Telegram */}
          <a
            href="https://t.me/Bella_hasias"
            target="_blank"
            rel="noopener noreferrer"
            className="card-luxury p-8 text-center group hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <MessageCircle className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Telegram</h3>
            <p className="font-sans text-sm text-muted-foreground">@Bella_hasias</p>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@bellahasias.com"
            className="card-luxury p-8 text-center group hover:shadow-xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Email</h3>
            <p className="font-sans text-sm text-muted-foreground">hello@bellahasias.com</p>
          </a>

          {/* Location */}
          <div className="card-luxury p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Локация</h3>
            <p className="font-sans text-sm text-muted-foreground">Москва, Россия</p>
          </div>
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
