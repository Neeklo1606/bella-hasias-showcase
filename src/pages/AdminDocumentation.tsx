import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const documentation = `
# BELLA HASIAS — Проектная Документация
## Modern Minimalist Luxury (v3.0)

---

## 🎨 ДИЗАЙН-СИСТЕМА

### Философия
- **Стиль:** Modern Minimalist Luxury
- **Вдохновение:** Awwwards 2025, Apple, Airbnb
- **Принципы:** Airy, expensive, smooth, mobile-first

### Шрифты (NO SERIFS)
\`\`\`
HEADLINES:
- Шрифт: 'Plus Jakarta Sans', sans-serif
- Вес: 600-700
- Letter-spacing: -0.04em
- Размер: clamp() для адаптивности

BODY:
- Шрифт: 'Inter', system-ui, sans-serif
- Вес: 400-500
- Размер: 14-16px
\`\`\`

### Цветовая Палитра (HSL)
\`\`\`css
:root {
  --background: 0 0% 98%;        /* Off-white #FAFAFA */
  --foreground: 220 15% 10%;     /* Deep Slate #1A1A1A */
  --primary: 239 84% 67%;        /* Modern Indigo #4F46E5 */
  --secondary: 220 14% 96%;      /* Light gray #F1F5F9 */
  --muted-foreground: 220 9% 46%;
  --border: 220 13% 91%;
  --radius: 1.5rem;              /* 24px */
}
\`\`\`

### Компоненты

**Карточки:**
\`\`\`css
.card-luxury {
  background: white;
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
}

.card-luxury:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.1);
}
\`\`\`

**Кнопки:**
\`\`\`css
.btn-luxury {
  background: hsl(var(--primary));
  color: white;
  border-radius: 9999px; /* pill */
  padding: 16px 32px;
}

.btn-luxury:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -6px hsl(var(--primary) / 0.5);
}
\`\`\`

**Inputs:**
\`\`\`css
.input-luxury {
  background: hsl(var(--secondary));
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
}

.input-luxury:focus {
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
}
\`\`\`

**Glassmorphism:**
\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
}
\`\`\`

---

## 📁 СТРУКТУРА

\`\`\`
src/
├── components/
│   ├── Hero.tsx          # Clean hero with one image
│   ├── FeaturedWorks.tsx # Curated 6 works grid
│   ├── Services.tsx      # Bento grid with glassmorphism
│   ├── Portfolio.tsx     # Full portfolio grid
│   ├── LeadForm.tsx      # Minimal contact form
│   ├── Navigation.tsx    # Blurry sticky header
│   └── Footer.tsx        # Clean footer
├── pages/
│   ├── Index.tsx
│   ├── ServiceStylist.tsx
│   ├── ServiceUgc.tsx
│   └── ServicePhotographer.tsx
└── index.css             # Design tokens
\`\`\`

---

## 🧩 КОМПОНЕНТЫ

### Hero
- Split layout: Typography left, Image right
- H1: "Bella Hasias" (Plus Jakarta Sans 700)
- Subtitle: "Стилист · UGC · Контент"
- Two CTAs: Primary + Ghost buttons
- Single vertical image (rounded-3xl)

### FeaturedWorks
- 6 curated projects in 3-column grid
- Hover: scale + blur + title reveal
- Framer Motion stagger animations

### Services (Bento)
- 3-column grid cards
- Glassmorphism price badges
- Arrow icon on hover

### Navigation
- Fixed top with glass effect on scroll
- Mobile: Full-screen overlay with blur

---

## 🎯 АНИМАЦИИ (Framer Motion)

\`\`\`tsx
// Container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Items
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Usage
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
\`\`\`

---

## 📱 MOBILE-FIRST

\`\`\`css
.section-luxury {
  padding: 80px 24px;    /* mobile */
  padding: 112px 40px;   /* md */
  padding: 128px 64px;   /* lg */
}

/* Grid: 1 col → 2 cols → 3 cols */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

/* Gap */
gap-6 md:gap-8
\`\`\`

---

## 📝 ПРАВИЛА

1. **Шрифты:** Plus Jakarta Sans для заголовков, Inter для body. БЕЗ ЗАСЕЧЕК!
2. **Цвета:** НЕТ КРАСНОГО. Только Indigo (#4F46E5) для акцентов
3. **Радиусы:** 24px для карточек, pill для кнопок, 12px для inputs
4. **Границы:** НЕТ ВИДИМЫХ ГРАНИЦ. Только тени
5. **Hover:** translateY(-8px) + мягкая тень
6. **Анимации:** Framer Motion fade-in-up при скролле

---

## 🚀 ПРИМЕР ПРОМТА

"Создай секцию для сайта Bella Hasias.
Используй:
- Шрифт: Plus Jakarta Sans 600 для заголовков
- Акцент: Indigo #4F46E5
- Карточки: rounded-3xl, no borders, shadow-soft
- Кнопки: pill-shaped, btn-luxury
- Анимации: Framer Motion whileInView
- Mobile-first: 1 → 2 → 3 columns"
`;

const AdminDocumentation = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">
            Документация проекта
          </h1>
          <p className="text-background/60 font-sans text-sm">
            Скопируй и отправь в ChatGPT для полного контекста проекта
          </p>
        </div>
      </div>

      {/* Copy Button */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-sans font-medium text-sm transition-all duration-300 ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'btn-luxury'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Скопировано!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Скопировать всю документацию
            </>
          )}
        </button>
      </div>

      {/* Documentation Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="card-luxury p-0 overflow-hidden">
          <pre 
            className="p-8 text-sm text-foreground whitespace-pre-wrap overflow-x-auto font-mono leading-relaxed"
          >
            {documentation}
          </pre>
        </div>
      </div>

      {/* Last Updated */}
      <div className="max-w-4xl mx-auto px-6 pb-10">
        <p className="font-sans text-xs text-muted-foreground">
          Версия 3.0 — Modern Minimalist Luxury • Обновлено: {new Date().toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default AdminDocumentation;
