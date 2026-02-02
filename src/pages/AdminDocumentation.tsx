import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const documentation = `
# BELLA HASIAS — Проектная Документация

## 🎨 ДИЗАЙН-СИСТЕМА

### Цветовая Палитра
\`\`\`
PRIMARY COLORS:
- Чёрный (основной): #1a1a1a
- Белый: #ffffff
- Светло-серый: #fafafa, #f5f5f5
- Серый текст: #666666
- Красный акцент: #FF3333
- Тёмно-красный (hover): #d40000

BORDERS:
- Светлый: #e8e8e8
- Средний: #e0e0e0
\`\`\`

### Типографика
\`\`\`
ЗАГОЛОВКИ (H1, H2):
- Шрифт: 'Montserrat', sans-serif
- Вес: 900 (Black)
- Размер H1: 120px (desktop) / 60px (mobile)
- Размер H2: 60-80px (desktop) / 40-50px (mobile)
- Letter-spacing: -0.02em
- Line-height: 0.95
- Text-transform: uppercase
- Цвет: #1a1a1a

ПОДЗАГОЛОВКИ (H3):
- Шрифт: 'Montserrat', sans-serif
- Вес: 600 (Semi-bold)
- Размер: 22px
- Цвет: #1a1a1a

BODY TEXT:
- Шрифт: 'Inter', sans-serif
- Вес: 400 (Regular)
- Размер: 14-16px
- Line-height: 1.7
- Цвет: #666666

LABELS / SMALL CAPS:
- Шрифт: 'Montserrat', sans-serif
- Вес: 600
- Размер: 11-14px
- Text-transform: uppercase
- Letter-spacing: 0.02em
\`\`\`

### Кнопки
\`\`\`
PRIMARY BUTTON (Красный):
- Background: #FF3333
- Color: #ffffff
- Border-radius: 32px
- Padding: 14px 36px
- Font-size: 14px
- Font-weight: 600
- Hover: background #d40000, translateY(-2px), shadow

OUTLINE BUTTON:
- Background: transparent
- Border: 1px solid #FF3333
- Color: #1a1a1a
- Border-radius: 32px
- Padding: 12px 28px
- Hover: background #FF3333, color #ffffff

GHOST BUTTON:
- Background: transparent
- Border: 1px solid #e8e8e8
- Hover: border-color #FF3333
\`\`\`

### Формы
\`\`\`
INPUT FIELDS:
- Padding: 12px 16px
- Border: 1px solid #e8e8e8
- Border-radius: 6px
- Font-size: 14px
- Background: #ffffff
- Focus: border-color #FF3333, box-shadow 0 0 0 3px rgba(255,51,51,0.1)
\`\`\`

---

## 📁 СТРУКТУРА ПРОЕКТА

\`\`\`
src/
├── assets/
│   ├── hero/           # Фото для hero-секции
│   │   ├── hero-center.jpg
│   │   ├── hero-left.jpg
│   │   ├── hero-right.jpg
│   │   └── photo-3.jpg
│   ├── portfolio/      # Портфолио работы
│   │   ├── work-1.jpg ... work-12.jpg
│   └── service-*.jpg   # Изображения услуг
├── components/
│   ├── ui/             # shadcn/ui компоненты
│   ├── Navigation.tsx  # Навигация сайта
│   ├── HeroMasonry.tsx # Hero + Masonry Grid
│   ├── Services.tsx    # Секция услуг
│   ├── Portfolio.tsx   # Портфолио (отдельная секция)
│   ├── LeadForm.tsx    # Контактная форма
│   └── Footer.tsx      # Подвал сайта
├── pages/
│   ├── Index.tsx       # Главная страница
│   ├── ServiceStylist.tsx
│   ├── ServiceUgc.tsx
│   ├── ServicePhotographer.tsx
│   └── AdminDocumentation.tsx
└── index.css           # Глобальные стили + tokens
\`\`\`

---

## 🧩 КОМПОНЕНТЫ

### HeroMasonry.tsx
**Описание:** Главный hero блок с именем + masonry grid портфолио с lightbox

**Структура:**
1. Блок с именем "BELLA HASIAS" (giant typography)
2. Подзаголовок: "Стилист / UGC / Креатор / Контент-Фотограф"
3. Masonry Grid с 12 изображениями
4. Lightbox modal с навигацией

**Особенности:**
- Grid: 2 cols (mobile), 3 cols (tablet), 4 cols (desktop)
- Gap: 2.5 (mobile) / 3.5 (tablet) / 18px (desktop)
- Размеры ячеек: 'normal', 'tall' (row-span-2), 'wide' (col-span-2)
- Hover: scale 1.02, red overlay, red border ring
- Lightbox: keyboard navigation (arrows, escape)

---

### Services.tsx
**Описание:** Секция с тремя услугами в карточках

**Структура:**
1. Label "03 / УСЛУГИ" (красный номер)
2. Заголовок "УСЛУГИ."
3. Grid с 3 карточками

**Карточка услуги:**
- Изображение (240px height)
- Заголовок услуги
- Цена (красный текст)
- Описание
- Кнопка "ПОДРОБНЕЕ →" (outline, rounded)

**Hover:** red border, shadow

---

### LeadForm.tsx
**Описание:** Контактная секция с формой и информацией

**Layout:** 2 колонки (55% / 45%)

**Левая колонка — Форма:**
- Имя (required)
- Email (required, validation)
- Телефон
- Select: услуга
- Textarea: сообщение
- Кнопка "ОТПРАВИТЬ" (full-width, red)

**Правая колонка — Контакты:**
- Email: bella@bellahasias.com
- Телефон: +7 (999) 123-45-67
- Локация: Москва
- Часы работы
- Соцсети: Instagram, Telegram

**States:** loading, success, error

---

### Navigation.tsx
**Описание:** Навигация сайта (фиксированная или static)

**Links:**
- Услуги
- Портфолио
- О нас
- Контакты

**Style:** uppercase, hover: red color

---

### Footer.tsx
**Описание:** Подвал сайта с ссылками и копирайтом

---

## 🎯 СТИЛЬ И ЭСТЕТИКА

### Общий стиль
- **Эстетика:** Bold editorial, high-fashion, avant-garde
- **Вдохновение:** Vogue, Harper's Bazaar, минималистичный fashion design
- **Контраст:** Чёрно-белая база с красными акцентами

### Hover Effects
\`\`\`css
/* Стандартный hover */
transition: all 0.3s ease;
transform: translateY(-2px);
box-shadow: 0 12px 24px rgba(26, 26, 26, 0.08);

/* Красный border на hover */
border-color: #FF3333;

/* Красный overlay */
background: rgba(255, 51, 51, 0.08);
\`\`\`

### Shadows
\`\`\`css
/* Лёгкая тень */
box-shadow: 0 4px 12px rgba(26, 26, 26, 0.06);

/* Средняя тень */
box-shadow: 0 12px 32px rgba(26, 26, 26, 0.08);

/* Красная тень (для кнопок) */
box-shadow: 0 12px 24px rgba(255, 51, 51, 0.3);
\`\`\`

---

## 📱 RESPONSIVE BREAKPOINTS

\`\`\`css
/* Mobile first */
Default: < 640px (mobile)
sm: 640px+
md: 768px+ (tablet)
lg: 1024px+ (desktop)
xl: 1280px+
2xl: 1536px+
\`\`\`

### Адаптивные значения
\`\`\`
Заголовок H1:
- Mobile: 50-60px
- Tablet: 80-100px
- Desktop: 120-160px

Padding секций:
- Mobile: 60px 20px
- Desktop: 80px 40px

Grid:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns
\`\`\`

---

## 🔧 ТЕХНОЛОГИИ

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Build:** Vite

---

## 📝 ПРАВИЛА ДЛЯ ПРОМТОВ

1. **Цвета:** Всегда используй #1a1a1a (чёрный), #ffffff (белый), #FF3333 (красный акцент)
2. **Шрифты:** Montserrat Black (900) для заголовков, Inter для body
3. **Border-radius:** 0 для карточек, 32px для кнопок, 6px для inputs
4. **Hover:** Всегда красный акцент (#FF3333)
5. **Transitions:** 0.3s ease
6. **Mobile-first:** Начинай с мобильной версии

---

## 🚀 ПРИМЕР ПРОМТА

"Создай секцию [название] для сайта Bella Hasias.
Используй:
- Заголовок: Montserrat Black, 120px desktop / 60px mobile, uppercase, #1a1a1a
- Акцентный цвет: #FF3333
- Фон: белый #ffffff
- Карточки: белый фон, border #e8e8e8, hover border #FF3333
- Кнопки: rounded 32px, outline с красным hover
- Grid: 1 col mobile, 2 col tablet, 3 col desktop"
`;

const AdminDocumentation = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Документация проекта
          </h1>
          <p className="text-white/60 text-sm">
            Скопируй и отправь в ChatGPT для контекста
          </p>
        </div>
      </div>

      {/* Copy Button */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-[#FF3333] text-white hover:bg-[#d40000]'
          }`}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              СКОПИРОВАНО!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              СКОПИРОВАТЬ ВСЮ ДОКУМЕНТАЦИЮ
            </>
          )}
        </button>
      </div>

      {/* Documentation Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-white border border-[#e8e8e8] rounded-lg overflow-hidden">
          <pre 
            className="p-6 text-sm text-[#1a1a1a] whitespace-pre-wrap overflow-x-auto"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            {documentation}
          </pre>
        </div>
      </div>

      {/* Last Updated */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <p className="text-xs text-[#666666]">
          Последнее обновление: {new Date().toLocaleDateString('ru-RU', { 
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
