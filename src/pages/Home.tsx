import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VerticalLogo from '../components/VerticalLogo';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white font-sans">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url(https://img.cdn1.vip/i/69c22272cd19a_1774330482.webp)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 md:via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full h-screen flex flex-col md:flex-row pb-24 md:pb-0">
        <div className="hidden md:flex w-32 h-full flex-col items-center justify-center pt-20">
          <VerticalLogo />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 mt-16 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-widest drop-shadow-2xl">大明“宫”略</h1>
            <h2 className="text-2xl md:text-6xl font-light tracking-wider drop-shadow-2xl mt-2 md:mt-0">DIGITAL DAMING PALACE</h2>
            <p className="max-w-2xl mx-auto mt-6 text-sm md:text-lg text-gray-300 tracking-widest leading-relaxed px-4">
              千官望长安 万国拜含元
            </p>

            <div className="pt-8 md:pt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <Link
                to="/architecture"
                className="w-full md:w-auto inline-block bg-red-700 hover:bg-red-600 text-white px-10 py-3 rounded-full text-base md:text-lg font-medium tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(211,47,47,0.4)]"
              >
                宫阙形制
              </Link>
              <Link
                to="/history"
                className="w-full md:w-auto inline-block border border-white/30 hover:bg-white/10 text-white px-10 py-3 rounded-full text-base md:text-lg font-medium tracking-widest transition-all duration-300"
              >
                历史信息
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-2 md:flex h-auto md:h-24 border-t border-white/10 bg-black/80 md:bg-black/40 backdrop-blur-md">
        <Link to="/architecture" className="flex-1 flex flex-col items-center justify-center py-3 md:py-0 bg-red-700/90 text-white hover:bg-red-600 transition-colors">
          <span className="text-sm md:text-lg font-medium tracking-widest">宫阙形制</span>
          <span className="text-[8px] md:text-[10px] tracking-widest uppercase opacity-80 mt-1">Palatial Forms</span>
        </Link>
        <Link to="/history" className="flex-1 flex flex-col items-center justify-center py-3 md:py-0 border-r border-b md:border-b-0 border-white/10 hover:bg-white/5 transition-colors">
          <span className="text-sm md:text-lg font-medium tracking-widest text-gray-300">历史长河</span>
          <span className="text-[8px] md:text-[10px] tracking-widest uppercase opacity-60 mt-1">Historical Information</span>
        </Link>
        <Link to="/hanyuan" className="flex-1 flex flex-col items-center justify-center py-3 md:py-0 border-r border-white/10 hover:bg-white/5 transition-colors relative">
          <span className="absolute top-2 md:top-4 right-2 md:right-1/4 bg-red-600 text-white text-[8px] md:text-[10px] px-1.5 rounded-sm">新</span>
          <span className="text-sm md:text-lg font-medium tracking-widest text-gray-300">3D知识图谱</span>
          <span className="text-[8px] md:text-[10px] tracking-widest uppercase opacity-60 mt-1">3D Knowledge Graph</span>
        </Link>
        <Link to="/ai" className="flex-1 flex flex-col items-center justify-center py-3 md:py-0 hover:bg-white/5 transition-colors relative">
          <span className="absolute top-2 md:top-4 right-2 md:right-1/4 bg-red-600 text-white text-[8px] md:text-[10px] px-1.5 rounded-sm">AI</span>
          <span className="text-sm md:text-lg font-medium tracking-widest text-gray-300">AI+大明宫</span>
          <span className="text-[8px] md:text-[10px] tracking-widest uppercase opacity-60 mt-1">AI Assistant</span>
        </Link>
      </div>
    </div>
  );
}
