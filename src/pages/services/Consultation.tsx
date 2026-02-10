import ServicePageLayout from '@/components/ServicePageLayout';
import serviceWardrobe from '@/assets/service-wardrobe.jpg';

const Consultation = () => {
  return (
    <ServicePageLayout
      title="Консультация"
      metaTitle="Консультация по стилю"
      metaDescription="Экспресс-консультация по стилю и образу: разбираем задачи, подбираем решения и план действий."
      metaKeywords="консультация стилиста, стиль, образ, гардероб"
      ogImage={serviceWardrobe}
      heroImage={serviceWardrobe}
      heroImageAlt="Консультация по стилю"
      intro="Быстро и по делу: определяем задачи, разбираем стиль и создаём понятные рекомендации, с которыми легко работать дальше."
      caseBlocks={[
        "Формат подойдёт, если нужен взгляд стилиста и чёткий план: что менять, что оставить и как собрать цельные образы.",
        "Разбираем гардероб, силуэты, цветовую палитру и особенности фигуры, чтобы рекомендации были точными и практичными.",
        "Вы получаете конкретный чек-лист и варианты образов, которые можно сразу применять.",
      ]}
    />
  );
};

export default Consultation;
