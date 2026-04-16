import TopNav from '../components/TopNav';
import { motion } from 'framer-motion';
import { CalendarDays, Landmark, Flame, ShieldCheck } from 'lucide-react';

const chapters = [
  {
    id: 'foundation',
    dynasty: '贞观八年 · 公元 634 年',
    title: '龙首原上，宏宫初启',
    lead: '大明宫始建于唐太宗贞观八年，最初名为永安宫，依龙首原高势而建，自一开始便具有超越一般宫苑的政治象征。',
    description:
      '它并不只是帝王居所的扩建，更是盛唐国家权力中心逐步北移的重要信号。宫城依地势展开，俯瞰长安，空间秩序与礼制威仪被同时写入建筑格局之中。随着高宗时期大规模经营，大明宫逐步取代太极宫，成为唐帝国真正意义上的政治核心。',
    details: [
      '依龙首原高地布局，形成居高临下的都城气势。',
      '从宫殿营造开始，就兼具居住、朝会与礼制展示功能。',
      '含元殿、宣政殿、紫宸殿所在中轴，奠定了后续政治空间的核心秩序。'
    ],
    quote: '千官望长安，万国拜含元。',
    image: 'https://img.cdn1.vip/i/69c22272cd19a_1774330482.webp',
    accent: 'from-[#d6b36a]/35 to-[#7c241f]/10',
    icon: Landmark
  },
  {
    id: 'prosperity',
    dynasty: '龙朔三年以后 · 盛唐气象',
    title: '朝会之所，帝国之心',
    lead: '自唐高宗起，大明宫成为唐朝主要皇宫，先后有十余位皇帝在此理政、起居、举行大朝会。',
    description:
      '含元殿是礼制的最高舞台，宣政殿是日常政务运转中枢，紫宸殿则连接更私密的决策空间。三大殿构成“前朝后寝”的核心骨架，既体现严格等级秩序，也折射出盛唐极盛时期的国家自信。来自四方的使节、藩属与朝臣，都在这里感受到唐帝国所呈现的恢弘与制度力量。',
    details: [
      '含元殿承担元旦、冬至等大朝会，是最具象征性的皇家正殿。',
      '宫中不只是建筑群，更是礼乐制度、外交秩序与国家仪式的综合舞台。',
      '“大明”之名，也与帝国中心的光明、开阔和威仪紧密关联。'
    ],
    quote: '宫阙参差，当日月之中；朝班森列，立万邦之前。',
    image: 'https://images.unsplash.com/photo-1549893074-4bc700a0f59d?q=80&w=1400&auto=format&fit=crop',
    accent: 'from-[#7f1d1d]/25 to-[#d6b36a]/10',
    icon: CalendarDays
  },
  {
    id: 'turmoil',
    dynasty: '天宝以后 · 乱世震荡',
    title: '安史之后，宫阙渐老',
    lead: '安史之乱是唐帝国由盛转衰的关键转折，大明宫也随之从王朝高峰的象征，逐渐转入修缮与损耗并存的阶段。',
    description:
      '战争与财政困局改变了宫殿的命运。虽然其后仍有修复与使用，但昔日那种四海来朝、礼制饱满的盛大气象已难以完整再现。宫殿仍在，制度仍在，但支撑它的帝国力量已经开始松动。大明宫因此成为观察晚唐政治疲态的一面镜子。',
    details: [
      '战乱破坏的不只是建筑，更是维系宏大宫廷礼制的国家机器。',
      '晚唐时期宫苑虽有延续使用，但空间意义已明显发生变化。',
      '大明宫从“帝国中心”逐步转化为“旧日辉煌的留影”。'
    ],
    quote: '宫城犹在，盛世不返。',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop',
    accent: 'from-[#3f1f1f]/30 to-[#0f0c0b]/10',
    icon: Flame
  },
  {
    id: 'ruins',
    dynasty: '晚唐至五代 · 灰烬与沉埋',
    title: '焚毁之后，沉入黄土',
    lead: '晚唐兵燹频仍，至朱温挟持唐昭宗迁都洛阳后，长安与大明宫遭到严重破坏，昔日帝国中枢终成废墟。',
    description:
      '宏伟殿宇在火焰中坍塌，木构、台基、砖石与夯土逐渐被时间掩埋。大明宫并非瞬间消失，而是在漫长岁月里由“可见的宫殿”变成“不可见的遗址”。这种从辉煌到埋藏的历史落差，也正构成今日遗址叙事最动人的部分。',
    details: [
      '宫阙被毁后，其空间记忆转而保存在文献、遗址与地层中。',
      '遗址的意义，不只是残存，更是为后人保留了考古与复原的可能。',
      '大明宫由此进入“消失于地表，却留存于文明”的阶段。'
    ],
    quote: '烈火之后，唯余台基与风。',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1400&auto=format&fit=crop',
    accent: 'from-[#5b2b24]/30 to-[#221816]/10',
    icon: Flame
  },
  {
    id: 'revival',
    dynasty: '近现代以来 · 保护与复兴',
    title: '遗址苏醒，重回世人视野',
    lead: '进入现代以后，大明宫遗址的考古、保护与展示逐步展开，昔日帝国中心以新的身份回到公众视野。',
    description:
      '1961年，大明宫遗址被列为全国重点文物保护单位；2010年，大明宫国家遗址公园建成开放；2014年，作为丝绸之路世界遗产组成部分正式列入《世界遗产名录》。今天的大明宫，已从宫廷权力的舞台转变为文明记忆的现场，也成为数字复原、公众教育与文化传播的重要对象。',
    details: [
      '考古工作让夯土、柱础、台基轮廓重新进入公众认知。',
      '遗址展示从“废墟观看”转向“历史理解与数字再现”。',
      '今天的大明宫，是连接盛唐文明、考古学与数字传播的文化接口。'
    ],
    quote: '遗址不是终点，而是文明重新被看见的开始。',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1400&auto=format&fit=crop',
    accent: 'from-[#d6b36a]/25 to-[#23433a]/10',
    icon: ShieldCheck
  }
];

export default function History() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#120d0b] text-[#f2e7cf]">
      <TopNav />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,179,106,0.14),transparent_30%),linear-gradient(180deg,rgba(18,13,11,0.92),rgba(9,7,6,0.98))]"></div>
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(214,179,106,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(214,179,106,0.08)_1px,transparent_1px)] [background-size:44px_44px]"></div>
      </div>

      <main className="relative z-10 px-4 pb-16 pt-24 md:px-8 lg:px-12">
        <section className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="mb-3 text-xs tracking-[0.4em] text-[#d6b36a] uppercase">Scroll Chronicle</div>
            <h1 className="font-serif-sc text-4xl leading-tight text-[#f6eddc] md:text-6xl">历史长卷 · 大明宫兴衰录</h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#d7c8ad] md:text-base">
              这一页不再用静态卡片讲历史，而是将大明宫的命运做成一幅可滚动展开的长卷。随着你向下卷读，宫城将从龙首原上的初建，逐步走向盛唐极盛、晚唐动荡、焚毁沉埋与遗址重生。
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[#d6b36a]/40 to-transparent md:block"></div>

            <div className="space-y-10 md:space-y-14">
              {chapters.map((chapter, index) => {
                const Icon = chapter.icon;
                return (
                  <motion.section
                    key={chapter.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="relative md:pl-12"
                  >
                    <div className="absolute left-0 top-12 hidden md:flex h-8 w-8 items-center justify-center rounded-full border border-[#d6b36a]/40 bg-[#241815] text-[#d6b36a] shadow-[0_0_20px_rgba(214,179,106,0.12)]">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="overflow-hidden rounded-[30px] border border-[#d6b36a]/18 bg-[#1a1311]/80 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                        <div className="relative min-h-[320px] overflow-hidden">
                          <img src={chapter.image} alt={chapter.title} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${chapter.accent}`}></div>
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,8,7,0.15),rgba(11,8,7,0.75))]"></div>

                          <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
                            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#e4c889]/25 bg-black/20 px-3 py-1 text-[11px] tracking-[0.25em] text-[#f1d79b] uppercase backdrop-blur-md">
                              <Icon className="h-3.5 w-3.5" />
                              {chapter.dynasty}
                            </div>
                            <h2 className="font-serif-sc text-3xl leading-tight text-[#fff6e7] md:text-5xl">
                              {chapter.title}
                            </h2>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-[#f0e3c5] md:text-base">
                              {chapter.lead}
                            </p>
                          </div>
                        </div>

                        <div className="relative bg-[linear-gradient(180deg,rgba(244,229,195,0.98),rgba(226,206,168,0.92))] text-[#4a3127]">
                          <div className="absolute inset-x-0 top-0 h-10 bg-[radial-gradient(circle_at_top,rgba(124,63,43,0.18),transparent_60%)]"></div>
                          <div className="absolute inset-y-0 left-0 w-6 bg-[linear-gradient(90deg,rgba(128,88,58,0.20),transparent)]"></div>
                          <div className="absolute inset-y-0 right-0 w-6 bg-[linear-gradient(270deg,rgba(128,88,58,0.20),transparent)]"></div>

                          <div className="relative p-6 md:p-8">
                            <div className="mb-4 text-xs tracking-[0.35em] text-[#8c6349] uppercase">卷轴章节 {index + 1}</div>
                            <p className="text-sm leading-7 text-[#5a3b2d] md:text-[15px]">
                              {chapter.description}
                            </p>

                            <div className="mt-6 space-y-3">
                              {chapter.details.map((detail) => (
                                <div key={detail} className="flex gap-3 rounded-2xl border border-[#b08968]/20 bg-white/25 px-4 py-3">
                                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8a3a2a]"></span>
                                  <p className="text-sm leading-6 text-[#5a3b2d]">{detail}</p>
                                </div>
                              ))}
                            </div>

                            <div className="mt-7 border-t border-[#a98160]/30 pt-5">
                              <p className="font-serif-sc text-lg italic leading-8 text-[#6b3b2a] md:text-xl">
                                “{chapter.quote}”
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                );
              })}
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-16 max-w-5xl rounded-[32px] border border-[#d6b36a]/18 bg-[linear-gradient(180deg,rgba(27,18,16,0.92),rgba(17,12,11,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] md:p-10"
          >
            <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[#d6b36a]">Epilogue</div>
            <h2 className="font-serif-sc text-3xl text-[#f6eddc] md:text-4xl">从宫阙到遗址，从遗址到数字重现</h2>
            <p className="mt-5 max-w-4xl text-sm leading-8 text-[#d7c8ad] md:text-base">
              大明宫的历史并不是一条简单的兴废线，而是一部关于帝国秩序、建筑技术、礼制空间与文明记忆的复合长卷。今天，当我们以考古、复原、交互影像与数字模型重新理解这片遗址时，看到的不只是残迹，而是一个时代如何把自己的理想、制度与审美铸进宫阙，又如何在历史风尘中留下可被后人重新阅读的痕迹。
            </p>
          </motion.section>
        </section>
      </main>
    </div>
  );
}
