import React from 'react';

export default function VerticalLogo() {
  return (
    <div className="flex flex-col items-center text-white font-serif relative z-10">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <span className="text-5xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>数</span>
        <span className="text-5xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>字</span>
        <div className="relative">
          <span className="text-5xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>大</span>
          <div className="absolute -right-8 top-0 w-6 h-6 border border-red-600 text-red-600 text-xs flex items-center justify-center font-sans">唐</div>
        </div>
        <span className="text-5xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>明</span>
        <span className="text-5xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>宫</span>
      </div>
      
      <div className="h-24 w-px bg-white/30 my-4"></div>
      
      <div className="text-xs tracking-[0.4em] uppercase opacity-70" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        DIGITAL DAMING PALACE
      </div>
      
      <div className="h-24 w-px bg-white/30 mt-4"></div>
    </div>
  );
}
