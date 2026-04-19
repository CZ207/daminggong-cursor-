import { useState } from 'react';
import { InteractiveStructureImage, type StructureRegion } from '../components/InteractiveStructureImage';
import { FloorPlan } from '../components/FloorPlan';
import { AiAssistant } from '../components/AiAssistant';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Region = StructureRegion;
type DetailRegion = Exclude<Region, 'overview' | null>;

type RegionContent = {
  title: string;
  desc: string;
  researchTitle?: string;
  researchDesc?: string;
};

const REGION_CONTENT: Record<DetailRegion, RegionContent> = {
  base: {
    title: '高台选址',
    desc: '依天然地势建于三层大台之上，实测殿基高于坡下平地15.6米。高差设计营造磅礴气势。',
    researchTitle: '考古与复原差异',
    researchDesc: '关于台基的具体测量数据，学术界复原（76.8m x 43m）与考古实测（75.9m x 41.3m）存在细微差异。模型搭建建议以实际遗址测量数据作为夯土底座的基础轮廓，并以学术复原成果作为上部木构尺度参考。'
  },
  mainHall: {
    title: '重檐结构',
    desc: '采用了高级别的“重檐”结构。唐代李华在《含元殿赋》中有“飞重檐以切霞”的记载。',
    researchTitle: '梁架结构科学',
    researchDesc: '复原时以木柱梁架承重为主。遗址背部发掘出厚达1.2米的土墙遗迹，后续研究认为在西安地震带环境下，仅依靠土墙承托如此大尺度重檐屋顶并不合理，因此复原模型更强调梁架体系。'
  },
  sidePavilions: {
    title: '双阁与飞廊',
    desc: '主殿前左右两侧分峙翔鸾阁与栖凤阁。主殿与两阁之间通过二层飞廊相连，形成宏大的“凹”字形正立面轮廓。'
  },
  ramp: {
    title: '龙尾道动线',
    desc: '殿前正中设有一条长达70余米的阶梯式坡道，称为“龙尾道”，自平地三折而上。'
  }
};

const HISTORY = [
  { year: '贞观八年 (634年)', event: '初建' },
  { year: '龙朔二年 (662年)', event: '重启' },
  { year: '龙朔三年 (663年)', event: '完工' },
  { year: '光启元年 (885年)', event: '战火被毁' },
];

const NAV_ITEMS: { id: Region; label: string }[] = [
  { id: null, label: '沉浸全景' },
  { id: 'overview', label: '历史形制' },
  { id: 'base', label: '高台选址' },
  { id: 'mainHall', label: '重檐主殿' },
  { id: 'sidePavilions', label: '双阁飞廊' },
  { id: 'ramp', label: '龙尾道' },
];

export default function Architecture() {
  const [activeRegion, setActiveRegion] = useState<Region>(null);
  const detailRegion = activeRegion && activeRegion !== 'overview' ? activeRegion : null;
  const detailContent = detailRegion ? REGION_CONTENT[detailRegion] : null;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-stone-950 pt-[84px] font-sans text-stone-200 md:pt-[88px]">
      <div className="absolute inset-0 z-0">
        <InteractiveStructureImage activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      </div>

      <div className="pointer-events-none absolute left-6 top-24 z-20 md:left-12 md:top-28">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="font-serif-sc mb-2 text-4xl font-black tracking-wider text-stone-100 md:text-7xl"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
          >
            大明宫宫阙形制
          </h1>
          <h2
            className="text-lg font-bold tracking-[0.35em] text-[#d4af37] md:text-2xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            盛唐宫城的礼制与建筑格局
          </h2>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-4 right-4 top-36 bottom-36 z-20 flex md:left-auto md:right-12 md:top-28 md:bottom-28 md:w-full md:max-w-md">
        <AnimatePresence mode="wait">
          {activeRegion === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="custom-scrollbar pointer-events-auto ml-auto flex max-h-full w-full flex-col gap-6 overflow-y-auto rounded-2xl border border-stone-500/30 bg-stone-900/50 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-6"
            >
              <div className="text-sm leading-relaxed text-stone-200">
                该页面以大明宫宫城建筑为核心进行数字化展示，结合丹凤门、主殿台基、重檐形制、双阁飞廊与龙尾道等要素，呈现盛唐宫阙的整体格局与空间秩序。
              </div>

              <div>
                <h3 className="font-serif-sc mb-4 flex items-center gap-2 text-lg font-bold text-[#d4af37]">
                  <span className="inline-block h-4 w-1 rounded-full bg-[#d4af37]"></span>
                  历史沿革
                </h3>
                <div className="relative space-y-3 before:absolute before:inset-0 before:ml-2 before:h-full before:w-px before:bg-stone-600">
                  {HISTORY.map((item, i) => (
                    <div key={i} className="relative flex items-center gap-4 pl-6">
                      <div className="absolute left-[5px] h-2 w-2 rounded-full bg-[#b91c1c] shadow-[0_0_8px_rgba(185,28,28,0.8)]"></div>
                      <div className="w-24 shrink-0 text-sm font-bold text-[#d4af37]">{item.year}</div>
                      <div className="text-sm text-stone-300">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2 h-48">
                <FloorPlan />
              </div>
            </motion.div>
          )}

          {detailRegion && detailContent && (
            <motion.div
              key={detailRegion}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="pointer-events-auto ml-auto flex w-full flex-col gap-6 rounded-2xl border border-[#d4af37]/40 bg-stone-900/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8"
            >
              <div>
                <h3 className="font-serif-sc mb-4 flex items-center gap-3 text-2xl font-bold text-[#d4af37] md:text-3xl">
                  <span className="inline-block h-8 w-1.5 rounded-full bg-[#b91c1c]"></span>
                  {detailContent.title}
                </h3>
                <p className="text-base leading-relaxed text-stone-200 md:text-lg">
                  {detailContent.desc}
                </p>
              </div>

              {detailContent.researchTitle && (
                <div className="border-t border-stone-700/50 pt-6">
                  <h4 className="font-serif-sc mb-3 text-xl font-bold text-[#b91c1c]">
                    {detailContent.researchTitle}
                  </h4>
                  {detailContent.researchDesc && (
                    <p className="text-sm leading-relaxed text-stone-300">
                      {detailContent.researchDesc}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-20 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 px-2 md:bottom-8 md:w-auto md:px-0">
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-[28px] border border-stone-500/40 bg-stone-900/60 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl md:gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id || 'null'}
              onClick={() => setActiveRegion(item.id)}
              onMouseEnter={() => setActiveRegion(item.id)}
              className={cn(
                'rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 md:text-sm',
                activeRegion === item.id
                  ? 'bg-[#d4af37] text-stone-950 shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                  : 'text-stone-300 hover:bg-stone-800/50 hover:text-[#d4af37]'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <AiAssistant />
    </div>
  );
}
