import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Grid3X3, Swords, Coffee, Star, ChevronRight } from 'lucide-react';

const MainMenu = ({ onNavigate }) => {
  const menuItems = [
    {
      id: 'cooking',
      title: 'Cooking Game',
      desc: 'Become the Head Chef',
      icon: <Utensils size={32} />,
      color: 'linear-gradient(135deg, #1B4D3E, #2E8B57)',
      path: 'https://www.google.com',
      badge: 'Popular'
    },
    {
      id: 'sudoku',
      title: 'Sudoku',
      desc: 'The Coffee Break Classic',
      icon: <Grid3X3 size={32} />,
      color: 'linear-gradient(135deg, #4B3621, #6F4E37)',
      badge: 'Logic'
    },
    {
      id: 'xo',
      title: 'Tic Tac Toe',
      desc: 'Challenge our Barista Bot',
      icon: <Swords size={32} />,
      color: 'linear-gradient(135deg, #C19A6B, #8B5A2B)',
      badge: 'Quick'
    }
  ];

  return (
    <div className="menu-container">
      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="decor-coffee-bean decor-1"
      >☕</motion.div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="decor-coffee-bean decor-2"
      >🌿</motion.div>

      <header className="menu-header">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="logo-wrapper"
        >
          <Coffee size={48} className="logo-icon" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fancy"
        >
          Square Coffee
        </motion.h1>
        <div className="status-badge">
          <Star size={14} fill="currentColor" />
          <span>Open for Fun</span>
        </div>
      </header>

      <div className="items-list">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.03, x: 5 }}
            whileTap={{ scale: 0.97 }}
            className="menu-card-premium"
            onClick={() => onNavigate(item)}
          >
            <div className="icon-plate" style={{ background: item.color }}>
              {item.icon}
            </div>
            <div className="item-content">
              <div className="item-header">
                <span className="item-badge">{item.badge}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
            <ChevronRight className="chevron" size={20} />
          </motion.div>
        ))}
      </div>

      <footer className="menu-footer">
        <div className="footer-line"></div>
        <p className="handwritten">Crafted with care at Square Coffee</p>
      </footer>

      <style jsx>{`
        .menu-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          position: relative;
        }

        .decor-coffee-bean {
          position: absolute;
          font-size: 2rem;
          opacity: 0.1;
          z-index: 0;
        }
        .decor-1 { top: 5%; left: 10%; }
        .decor-2 { bottom: 15%; right: 10%; }

        .menu-header {
          text-align: center;
          margin-top: 50px;
          margin-bottom: 40px;
          z-index: 1;
        }

        .logo-wrapper {
          background: white;
          width: 80px;
          height: 80px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }

        .logo-icon { color: var(--color-green); }

        .fancy {
          font-size: 3.2rem;
          margin: 0;
          line-height: 1;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--color-green);
          color: white;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 15px;
        }

        .items-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 1;
        }

        .menu-card-premium {
          background: white;
          border-radius: 24px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 15px rgba(44, 24, 16, 0.04);
          cursor: pointer;
          border: 1px solid rgba(210, 180, 140, 0.2);
          position: relative;
        }

        .icon-plate {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .item-content { flex: 1; }

        .item-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .item-badge {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--color-coffee);
          text-transform: uppercase;
        }

        .item-content h3 {
          margin: 0;
          color: var(--color-text);
          font-size: 1.25rem;
          font-weight: 700;
        }

        .item-content p {
          margin: 4px 0 0;
          color: #8B735B;
          font-size: 0.85rem;
        }

        .chevron { color: var(--color-beige-dark); opacity: 0.5; }

        .menu-footer {
          margin-top: auto;
          width: 100%;
          text-align: center;
          padding-bottom: 30px;
        }

        .footer-line {
          width: 40px;
          height: 3px;
          background: var(--color-beige-dark);
          margin: 0 auto 15px;
          border-radius: 10px;
          opacity: 0.3;
        }

        .menu-footer p { font-size: 0.9rem; color: var(--color-coffee); }
      `}</style>
    </div>
  );
};

export default MainMenu;
