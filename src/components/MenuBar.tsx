import React from 'react';
import { Menu, Settings, Database, Layout, PieChart, Windows } from 'lucide-react';

export const MenuBar = () => {
  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-6 h-12">
          <MenuButton icon={<Menu size={18} />} text="Archivo" />
          <MenuButton icon={<Database size={18} />} text="Datos" />
          <MenuButton icon={<Layout size={18} />} text="Hoja" />
          <MenuButton icon={<PieChart size={18} />} text="Dashboard" />
          <MenuButton icon={<Settings size={18} />} text="Análisis" />
          <MenuButton icon={<Windows size={18} />} text="Ventana" />
        </div>
      </div>
    </div>
  );
};

const MenuButton = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <button className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-1 rounded">
    {icon}
    <span>{text}</span>
  </button>
);