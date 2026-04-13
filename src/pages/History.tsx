import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import { motion } from 'framer-motion';

const eras = [
  {
    id: 'early',
    title: '初建与繁荣',
    period: '公元634年 - 755年',
    desc: '大明宫始建于唐太宗贞观八年（634年），原名永安宫，是唐长安城三座主要宫殿“三大内”中规模最大的一座。自唐高宗起，先后有17位唐朝皇帝在此处理朝政，历时达200余年。',
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'middle',
    title: '安史之乱与修复',
    period: '公元755年 - 880年',
    desc: '安史之乱期间，大明宫遭到一定程度的破坏。此后历代皇帝虽有修缮，但大唐国力日衰，大明宫也逐渐失去了往日的辉煌。',
    image: 'https://images.unsplash.com/photo-1584470876793-13b3e20d8281?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'late',
    title: '毁于战火',
    period: '公元880年 - 904年',
    desc: '唐末黄巢起义及随后的军阀混战中，大明宫屡遭劫难。天祐元年（904年），朱温挟持唐昭宗迁都洛阳，将长安城及大明宫彻底焚毁，化为废墟。',
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'modern',
    title: '遗址保护与复兴',
    period: '公元1957年 至今',
    desc: '1961年，大明宫遗址被国务院公布为首批全国重点文物保护单位。2010年，大明宫国家遗址公园建成开放。2014年，作为“丝绸之路：长安-天山廊道的路网”中的一处遗址点成功列入《世界遗产名录》。',
    image: 'https://images.unsplash.com/photo-1542051812871-757500850028?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function History() {
  const [activeId, setActiveId] = useState(eras[0].id);
  const activeEra = eras.find(e => e.id === activeId) || eras[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      <TopNav />
      
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row pt-20">
        
        {/* Left Side - Timeline */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-start md:justify-center px-6 md:px-24 relative z-20 overflow-y-auto pb-10 md:pb-0 mt-4 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-widest mb-8 md:mb-12">历史长河</h1>
            
            <div className="space-y-6 md:space-y-8 border-l-2 border-red-900/50 pl-6 md:pl-8 ml-2 md:ml-4">
              {eras.map((era) => (
                <div 
                  key={era.id}
                  className={`relative cursor-pointer transition-all duration-300 ${activeId === era.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  onClick={() => setActiveId(era.id)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[33px] md:-left-[41px] top-1.5 md:top-2 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-colors ${activeId === era.id ? 'bg-red-600 border-red-400' : 'bg-black border-red-900'}`}></div>
                  
                  <h3 className="text-xl md:text-2xl font-serif font-medium tracking-widest mb-1 md:mb-2">{era.title}</h3>
                  <p className="text-red-500 text-xs md:text-sm tracking-widest mb-2 md:mb-4 font-mono">{era.period}</p>
                  
                  {activeId === era.id && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-gray-300 text-xs md:text-sm leading-relaxed tracking-widest text-justify max-w-md"
                    >
                      {era.desc}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="absolute md:relative inset-0 md:inset-auto w-full md:w-1/2 h-full z-0 md:z-10">
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black via-black/80 md:via-black/50 to-black/90 md:to-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10"></div>
          
          <motion.img 
            key={activeEra.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={activeEra.image} 
            alt={activeEra.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40 md:opacity-100"
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="hidden md:block absolute bottom-4 left-0 right-0 z-20 text-center text-[10px] text-gray-600 tracking-wider">
        数字大明宫 2010 -2026 © Copyright For Daming Palace Academy © www.damingpalace.com
      </div>
    </div>
  );
}
