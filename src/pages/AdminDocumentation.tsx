import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const documentation = `
# BELLA HASIAS — Проектная Документация
## High-End Minimalist Portfolio (v2.0)

---

## 🎨 ДИЗАЙН-СИСТЕМА

### Философия
- **Стиль:** High-End Minimalist Portfolio
- **Вдохновение:** Awwwards 2025, Apple, Airbnb
- **Принципы:** Много воздуха, мягкие формы, приглушённые тона

### Цветовая Палитра (HSL)
\`\`\`css
:root {
  /* Основные */
  --background: 210 20% 99%;      /* Ultra-light gray #FDFDFD */
  --foreground: 215 25% 15%;      /* Deep Slate #1E293B */
  
  /* Акценты */
  --primary: 243 75% 59%;         /* Muted Indigo #4338CA */
  --primary-foreground: 0 0% 100%;
  
  /* Нейтральные */
  --secondary: 210 20% 96%;       /* Soft gray #F1F5F9 */
  --muted: 210 16% 93%;
  --muted-foreground: 215 16% 47%;
  
  /* Границы */
  --border: 214 32% 91%;          /* #E2E8F0 */
  
  /* Радиус */
  --radius: 1.25rem;              /* 20px */
}
\`\`\`

### Типографика
\`\`\`
ЗАГОЛОВКИ:
- Шрифт: 'Playfair Display', Georgia, serif
- Вес: 500 (Medium)
- H1: clamp(2.5rem, 8vw, 5rem)
- H2: clamp(2rem, 5vw, 3.5rem)
- H3: clamp(1.25rem, 3vw, 1.75rem)
- Letter-spacing: -0.02em
- Line-height: 1.1-1.15

BODY TEXT:
- Шрифт: 'Inter', system-ui, sans-serif
- Вес: 400
- Размер: 14-16px
- Line-height: 1.75
- Цвет: hsl(var(--muted-foreground))

LABELS:
- Шрифт: 'Inter', sans-serif
- Вес: 500-600
- Размер: 11-12px
- Text-transform: uppercase
- Letter-spacing: 0.15-0.2em
\`\`\`

### Компоненты UI

**Кнопки:**
\`\`\`css
.btn-premium {
  background: hsl(var(--primary));
  color: white;
  border-radius: 20px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.btn-premium:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -6px hsl(var(--primary) / 0.4);
}
\`\`\`

**Карточки:**
\`\`\`css
.card-premium {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-premium:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}
\`\`\`

**Glassmorphism:**
\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
\`\`\`

**Inputs:**
\`\`\`css
.input-premium {
  padding: 16px 20px;
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  background: white;
}

.input-premium:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
}
\`\`\`

---

## 📁 СТРУКТУРА ПРОЕКТА

\`\`\`
src/
├── assets/
│   ├── hero/           # Hero images
│   └── portfolio/      # Portfolio works
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Sticky nav with blur
│   ├── HeroMasonry.tsx # Hero + masonry grid
│   ├── Services.tsx    # Bento grid services
│   ├── Portfolio.tsx   # Portfolio section
│   ├── LeadForm.tsx    # Contact form
│   └── Footer.tsx      # Footer
├── pages/
│   ├── Index.tsx
│   ├── ServiceStylist.tsx
│   ├── ServiceUgc.tsx
│   ├── ServicePhotographer.tsx
│   └── AdminDocumentation.tsx
└── index.css           # Design tokens + utilities
\`\`\`

---

## 🧩 КОМПОНЕНТЫ

### Navigation.tsx
**Особенности:**
- Sticky with backdrop blur on scroll
- Mobile menu: full-screen с blur overlay
- Анимированное появление ссылок
- Стиль: serif логотип, sans-serif links

### HeroMasonry.tsx
**Структура:**
1. Hero name: "Bella" + "Hasias" (accent color)
2. Subtitle: "Стилист · UGC Креатор · Контент-Фотограф"
3. Masonry Grid: 12 images

**Grid:**
- Mobile: 1 col
- SM: 2 cols
- MD: 3 cols  
- LG: 4 cols
- Gap: 16-24px
- Border-radius: 16px

**Hover:** scale-105, dark overlay, centered number

### Services.tsx
**Стиль:** Bento Grid Cards

**Карточка:**
- Image with glassmorphism price badge
- Title + arrow icon
- Description
- Hover: translateY(-8px), shadow

### LeadForm.tsx
**Layout:** 2 columns (form + contact info)

**Form fields:**
- Name, Email (required)
- Phone, Service dropdown
- Message textarea
- Submit button (full-width)

**Contact info:**
- Icons in rounded primary/10 bg
- Social links as rounded buttons

---

## 🎯 АНИМАЦИИ

\`\`\`css
/* Fade In Up */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Timing */
transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Delay classes */
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
...
\`\`\`

---

## 📱 RESPONSIVE

\`\`\`
Breakpoints (Tailwind):
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

Section padding:
.section-padding {
  padding: 80px 24px (mobile)
  padding: 112px 40px (tablet)
  padding: 128px 64px (desktop)
}

Max-width: 7xl (1280px)
\`\`\`

---

## 🔧 ТЕХНОЛОГИИ

- React 18 + TypeScript
- Tailwind CSS (semantic tokens)
- shadcn/ui
- React Router v6
- Lucide Icons
- Vite

---

## 📝 ПРАВИЛА ДЛЯ ПРОМТОВ

1. **Цвета:** Используй CSS variables (--primary, --foreground, etc.)
2. **Шрифты:** Playfair Display для заголовков, Inter для body
3. **Border-radius:** 20px для карточек, 12px для inputs
4. **Hover:** translateY(-8px) + shadow, без резких границ
5. **Transitions:** cubic-bezier(0.25, 0.46, 0.45, 0.94)
6. **Воздух:** Много white space, section-padding

---

## 🚀 ПРИМЕР ПРОМТА

"Создай секцию [название] для сайта Bella Hasias.
Используй:
- Заголовок: Playfair Display, clamp(), foreground color
- Акцент: primary (Indigo)
- Карточки: card-premium стиль, 20px radius, soft shadows
- Кнопки: btn-premium, 20px radius
- Анимации: fade-in-up с задержками
- Grid: 1→2→3 columns responsive"
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
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-3">
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
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-sans font-medium text-sm transition-all duration-300 ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'btn-premium'
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
        <div className="card-premium p-0 overflow-hidden">
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
          Версия 2.0 — High-End Minimalist • Обновлено: {new Date().toLocaleDateString('ru-RU', { 
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
