import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  BrainCircuit, 
  Stethoscope, 
  Calculator, 
  FileText, 
  Volume2, 
  Settings,
  Menu
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Início', href: '/' },
    { icon: <BrainCircuit className="w-5 h-5" />, label: 'Tutoria IA', href: '/tutoria' },
    { icon: <Stethoscope className="w-5 h-5" />, label: 'Casos Clínicos', href: '/casos' },
    { icon: <Calculator className="w-5 h-5" />, label: 'Calculadoras', href: '/calculadoras' },
    { icon: <FileText className="w-5 h-5" />, label: 'Prontuário', href: '/prontuario' },
    { icon: <Volume2 className="w-5 h-5" />, label: 'Ausculta', href: '/ausculta' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 hidden md:flex flex-col border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black text-xl">S</div>
          Semiologia Viva
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Saber Clínico</p>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
