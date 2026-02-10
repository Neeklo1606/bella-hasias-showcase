import ServicePageLayout from '@/components/ServicePageLayout';
import serviceUgc from '@/assets/service-ugc.jpg';

const StyleCollages = () => {
  return (
    <ServicePageLayout
      title="Стилизованные коллажи"
      metaTitle="Стилизованные коллажи"
      metaDescription="Подбор образов и стилизация в формате коллажей: наглядные решения под ваши задачи и гардероб."
      metaKeywords="стилизованные коллажи, подбор образов, стилизация"
      ogImage={serviceUgc}
      heroImage={serviceUgc}
      heroImageAlt="Стилизованные коллажи"
      intro="Наглядный формат, в котором легко увидеть, как сочетаются вещи и какие образы получатся в реальности."
      caseBlocks={[
        "Коллажи помогают быстро собирать готовые образы под сезон, событие или задачи гардероба.",
        "Я подбираю вещи, аксессуары и стилистические приёмы так, чтобы образы выглядели цельно и современно.",
        "Вы получаете понятные визуальные инструкции, с которыми легко повторить образ.",
      ]}
    />
  );
};

export default StyleCollages;
