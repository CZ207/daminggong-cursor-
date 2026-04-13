import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import { motion } from 'framer-motion';

const buildings = [
  {
    id: 'hanyuan',
    name: '含元殿',
    desc: '大明宫正殿，举行重大庆典和元旦、冬至大朝会之所。',
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'linde',
    name: '麟德殿',
    desc: '大明宫内规模最大的建筑，是皇帝宴会、接见外国使节的场所。',
    image: 'https://images.unsplash.com/photo-1584470876793-13b3e20d8281?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'danfeng',
    name: '丹凤门',
    desc: '大明宫正南门，被誉为“盛唐第一门”。',
    image: 'https://images.unsplash.com/photo-1542051812871-757500850028?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'taiye',
    name: '太液池',
    desc: '大明宫内的皇家园林，风景秀丽，是皇室休闲游览之地。',
    image: 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function Architecture() {
  const [activeId, setActiveId] = useState(buildings[0].id);
  const activeBuilding = buildings.find(b => b.id === activeId) || buildings[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      <TopNav />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          key={activeBuilding.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5 }}
          src={activeBuilding.image}
          alt={activeBuilding.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 md:via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-40 md:pb-32 px-6 md:px-16">
        <div className="max-w-3xl">
          <motion.h1 
            key={`title-${activeBuilding.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-serif font-medium tracking-widest mb-4 md:mb-6 drop-shadow-2xl"
          >
            {activeBuilding.name}
          </motion.h1>
          <motion.p 
            key={`desc-${activeBuilding.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-gray-300 tracking-widest leading-relaxed drop-shadow-lg"
          >
            {activeBuilding.desc}
          </motion.p>
        </div>
      </div>

      {/* Building Selector */}
      <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-2 md:flex h-auto md:h-24 bg-black/80 md:bg-black/60 backdrop-blur-md border-t border-white/10">
        {buildings.map((building) => (
          <button
            key={building.id}
            onClick={() => setActiveId(building.id)}
            className={`flex-1 flex flex-col items-center justify-center py-4 md:py-0 transition-colors border-r border-b md:border-b-0 border-white/10 last:border-r-0 ${
              activeId === building.id ? 'bg-red-700/90 text-white' : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <span className="text-sm md:text-lg font-medium tracking-widest">{building.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
