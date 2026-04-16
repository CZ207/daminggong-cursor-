import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export type StructureRegion = 'overview' | 'base' | 'ramp' | 'mainHall' | 'sidePavilions' | null;
type InteractiveRegion = Exclude<StructureRegion, 'overview'>;

interface Props {
  activeRegion: StructureRegion;
  setActiveRegion: (region: StructureRegion) => void;
}

export function InteractiveStructureImage({ activeRegion, setActiveRegion }: Props) {
  const imageUrl = 'https://img.cdn1.vip/i/69c22272cd19a_1774330482.webp';

  const getFill = (region: InteractiveRegion) => {
    if (activeRegion === region) return 'rgba(212, 175, 55, 0.35)';
    return 'transparent';
  };

  const getStroke = (region: InteractiveRegion) => {
    if (activeRegion === region) return 'rgba(212, 175, 55, 0.9)';
    return 'transparent';
  };

  const getGlowAnimation = (region: InteractiveRegion) => ({
    filter:
      activeRegion === region
        ? [
            'drop-shadow(0 0 8px rgba(212,175,55,0.6))',
            'drop-shadow(0 0 20px rgba(212,175,55,0.8))',
            'drop-shadow(0 0 8px rgba(212,175,55,0.6))'
          ]
        : 'drop-shadow(0 0 0px rgba(212,175,55,0))'
  });

  const getGlowTransition = (region: InteractiveRegion) =>
    activeRegion === region
      ? { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
      : { duration: 0.5 };

  const Hotspot = ({ cx, cy, region, label }: { cx: number; cy: number; region: InteractiveRegion; label: string }) => (
    <g
      className="group/hotspot cursor-pointer"
      onMouseEnter={() => setActiveRegion(region)}
      onClick={() => setActiveRegion(region)}
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r="12"
        fill="rgba(212, 175, 55, 0.2)"
        stroke="rgba(212, 175, 55, 0.8)"
        strokeWidth="2"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={cx} cy={cy} r="4" fill="#d4af37" />
      <text
        x={cx}
        y={cy - 20}
        fill="#fff"
        fontSize="14"
        textAnchor="middle"
        className={cn(
          'font-serif-sc pointer-events-none font-bold drop-shadow-md transition-opacity duration-300',
          activeRegion === region ? 'opacity-100' : 'opacity-0 group-hover/hotspot:opacity-100'
        )}
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
      >
        {label}
      </text>
    </g>
  );

  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-stone-950">
      <img
        src={imageUrl}
        alt="含元殿真实结构参考"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out"
        style={{ transform: activeRegion ? 'scale(1.02)' : 'scale(1)' }}
        referrerPolicy="no-referrer"
      />

      <svg viewBox="0 0 1000 600" className="absolute inset-0 z-10 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <motion.polygon
          points="50,380 950,380 1000,480 0,480"
          fill={getFill('base')}
          stroke={getStroke('base')}
          strokeWidth="2"
          onMouseEnter={() => setActiveRegion('base')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('base')}
          transition={getGlowTransition('base')}
        />

        <motion.polygon
          points="350,420 650,420 800,600 200,600"
          fill={getFill('ramp')}
          stroke={getStroke('ramp')}
          strokeWidth="2"
          onMouseEnter={() => setActiveRegion('ramp')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('ramp')}
          transition={getGlowTransition('ramp')}
        />

        <motion.g
          onMouseEnter={() => setActiveRegion('sidePavilions')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('sidePavilions')}
          transition={getGlowTransition('sidePavilions')}
        >
          <polygon points="0,200 220,200 220,380 0,380" fill={getFill('sidePavilions')} stroke={getStroke('sidePavilions')} strokeWidth="2" />
          <polygon points="780,200 1000,200 1000,380 780,380" fill={getFill('sidePavilions')} stroke={getStroke('sidePavilions')} strokeWidth="2" />
        </motion.g>

        <motion.polygon
          points="250,150 750,150 780,380 220,380"
          fill={getFill('mainHall')}
          stroke={getStroke('mainHall')}
          strokeWidth="2"
          onMouseEnter={() => setActiveRegion('mainHall')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('mainHall')}
          transition={getGlowTransition('mainHall')}
        />

        <Hotspot cx={500} cy={430} region="base" label="高台选址" />
        <Hotspot cx={500} cy={510} region="ramp" label="龙尾道" />
        <Hotspot cx={110} cy={290} region="sidePavilions" label="翔鸾阁" />
        <Hotspot cx={890} cy={290} region="sidePavilions" label="栖凤阁" />
        <Hotspot cx={500} cy={265} region="mainHall" label="重檐主殿" />
      </svg>
    </div>
  );
}
