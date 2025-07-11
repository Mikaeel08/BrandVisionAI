import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Key } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 py-6"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="mr-3"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <ImageIcon className="text-indigo-600" size={24} />
              </div>
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">BrandVision AI</h1>
              <p className="text-indigo-200 text-sm md:text-base">AI-powered brand imagery generator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSettings}
              className="flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
              title="API Key Settings"
            >
              <Key className="text-white" size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;