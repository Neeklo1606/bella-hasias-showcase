import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Image, Trash2, Save, FolderOpen } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'styling' | 'ugc' | 'photo';
  imageUrl: string;
  createdAt: Date;
}

const categoryLabels = {
  styling: 'Стилизация',
  ugc: 'UGC',
  photo: 'Фотосъёмка',
};

const Admin = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    { id: '1', title: 'Editorial Portrait', category: 'photo', imageUrl: '/placeholder.svg', createdAt: new Date() },
    { id: '2', title: 'Brand Campaign', category: 'ugc', imageUrl: '/placeholder.svg', createdAt: new Date() },
    { id: '3', title: 'Personal Style', category: 'styling', imageUrl: '/placeholder.svg', createdAt: new Date() },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'styling' as 'styling' | 'ugc' | 'photo',
    imageUrl: '',
  });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.imageUrl) return;
    
    const item: PortfolioItem = {
      id: Date.now().toString(),
      title: newItem.title,
      category: newItem.category,
      imageUrl: newItem.imageUrl,
      createdAt: new Date(),
    };
    
    setPortfolioItems(prev => [item, ...prev]);
    setNewItem({ title: '', category: 'styling', imageUrl: '' });
    setIsAddingNew(false);
  };

  const handleDeleteItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Админ-панель | Bella Hasias</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ArrowLeft size={20} />
              </Link>
              <span className="font-display text-lg font-semibold text-foreground">
                Админ-панель
              </span>
            </div>
            
            <Link
              to="/admin/documentation"
              className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FolderOpen size={18} />
              Документация
            </Link>
          </div>
        </div>

        {/* Content */}
        <section className="pt-28 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  Управление портфолио
                </h1>
                <p className="font-sans text-sm text-muted-foreground">
                  Добавляйте и удаляйте работы из портфолио
                </p>
              </div>
              
              <button
                onClick={() => setIsAddingNew(true)}
                className="btn-luxury flex items-center gap-2"
              >
                <Plus size={18} />
                Добавить работу
              </button>
            </div>

            {/* Add New Form */}
            {isAddingNew && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-luxury p-6 mb-8"
              >
                <h3 className="font-display text-lg text-foreground mb-6">Новая работа</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Название
                    </label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Editorial Portrait"
                      className="input-luxury"
                    />
                  </div>
                  
                  <div>
                    <label className="font-sans text-sm font-medium text-foreground mb-2 block">
                      Категория
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value as 'styling' | 'ugc' | 'photo' }))}
                      className="input-luxury appearance-none cursor-pointer"
                    >
                      <option value="styling">Стилизация</option>
                      <option value="ugc">UGC</option>
                      <option value="photo">Фотосъёмка</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="font-sans text-sm font-medium text-foreground mb-2 block">
                      URL изображения
                    </label>
                    <input
                      type="url"
                      value={newItem.imageUrl}
                      onChange={(e) => setNewItem(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://..."
                      className="input-luxury"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleAddItem}
                    className="btn-luxury flex items-center gap-2"
                  >
                    <Save size={18} />
                    Сохранить
                  </button>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="btn-ghost-luxury"
                  >
                    Отмена
                  </button>
                </div>
              </motion.div>
            )}

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="card-luxury overflow-hidden group"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] bg-secondary relative">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-medium text-foreground">
                      {categoryLabels[item.category]}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-base text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground">
                        {item.createdAt.toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                      aria-label="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {portfolioItems.length === 0 && (
              <div className="text-center py-20">
                <Image className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-sans text-muted-foreground">
                  Нет работ в портфолио
                </p>
              </div>
            )}

            {/* Info Note */}
            <div className="mt-12 p-6 rounded-2xl bg-secondary/50 border border-border/50">
              <p className="font-sans text-sm text-muted-foreground">
                <strong className="text-foreground">Примечание:</strong> Данные хранятся локально в браузере. Для полноценной CMS с сохранением данных на сервере подключите Lovable Cloud.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Admin;