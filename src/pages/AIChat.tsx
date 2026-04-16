import { useState, useRef, useEffect } from 'react';
import TopNav from '../components/TopNav';
import { Send, Bot, User, Loader2, Sparkles, ScrollText, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

type ChatMessage = {
  role: 'assistant' | 'user';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  '含元殿在大明宫中的地位是什么？',
  '大明宫是谁主持修建的？',
  '龙尾道在礼制上有什么含义？',
  '请用通俗的话介绍含元殿的建筑结构。'
];

const FEATURE_CARDS = [
  {
    icon: Landmark,
    title: '建筑礼制',
    desc: '讲解含元殿、龙尾道与唐代宫殿空间秩序。'
  },
  {
    icon: ScrollText,
    title: '历史脉络',
    desc: '适合快速生成比赛展示中的历史介绍与摘要。'
  }
];

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '您好！我是大明宫 AI 助手。您可以向我询问关于大明宫的历史、建筑、文化等问题，例如：“大明宫是谁建的？”或“含元殿有多大？”'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const submitQuestion = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY;
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question }];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    if (!apiKey) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: '当前未配置 DashScope API Key。请在项目根目录的 `.env.local` 中添加 `VITE_DASHSCOPE_API_KEY=你的密钥` 后重新启动项目。'
        }
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'qwen3.6-plus',
          messages: [
            {
              role: 'system',
              content: '你是“大明宫数字文化助手”，擅长用准确、凝练、富有文化气息的中文回答与大明宫、唐代建筑、历史文化相关的问题；如果用户问的是泛知识问题，也正常回答。'
            },
            ...nextMessages.map((message) => ({
              role: message.role,
              content: message.content
            }))
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error?.message || data?.message || 'DashScope 请求失败。';
        throw new Error(errorMessage);
      }

      const assistantReply = data?.choices?.[0]?.message?.content?.trim();

      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: assistantReply || '抱歉，我这次没有生成有效回复，请稍后重试。'
        }
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : '调用 DashScope 接口时发生未知错误。';
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: `抱歉，当前调用 AI 服务失败：${message}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitQuestion(input.trim());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090606] font-sans text-white">
      <TopNav />

      <div className="pointer-events-none absolute inset-0">
        <img src="https://img.cdn1.vip/i/69c233e0e7e91_1774334944.webp" alt="Background" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,134,61,0.18),transparent_32%),linear-gradient(180deg,rgba(8,4,4,0.75),rgba(8,4,4,0.94))]"></div>
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(212,175,55,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.08)_1px,transparent_1px)] [background-size:48px_48px]"></div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-6 pt-24 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-[#d4af37]">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs tracking-[0.35em] uppercase">DashScope Powered</span>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif-sc text-4xl tracking-[0.16em] text-stone-100 md:text-5xl">AI + 大明宫导览舱</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300 md:text-base">
                面向大明宫历史、唐代礼制与含元殿建筑讲解场景的实时问答助手。
              </p>
            </div>
            <div className="rounded-full border border-[#d4af37]/30 bg-[#1a1210]/70 px-4 py-2 text-xs tracking-[0.28em] text-[#d4af37] backdrop-blur-md">
              QWEN 3.6 PLUS
            </div>
          </div>
        </motion.div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden rounded-[28px] border border-[#d4af37]/15 bg-[linear-gradient(180deg,rgba(34,20,16,0.88),rgba(15,10,10,0.92))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex lg:flex-col"
          >
            <div className="mb-5 rounded-2xl border border-[#d4af37]/15 bg-black/20 p-4">
              <div className="mb-2 text-xs tracking-[0.3em] text-stone-400">当前能力</div>
              <div className="text-2xl font-semibold text-stone-100">大明宫文化问答</div>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                适合展馆导览、比赛讲解、交互演示与专题知识问答。
              </p>
            </div>

            <div className="space-y-3">
              {FEATURE_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7a1f1f]/50 text-[#d4af37]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-stone-100">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-400">{card.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto rounded-2xl border border-[#d4af37]/15 bg-[#130d0c]/80 p-4 text-sm leading-6 text-stone-300">
              可直接生成“面向评委的讲解词”、“面向游客的口语介绍”或“展板摘要”。
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex min-h-[68vh] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(22,14,13,0.86),rgba(11,9,9,0.94))] shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
          >
            <div className="border-b border-white/8 px-5 py-4 md:px-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm tracking-[0.25em] text-stone-400">数字对话面板</div>
                  <div className="mt-1 text-xl font-semibold text-stone-100">大明宫文化智能问答</div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  在线可调用
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => submitQuestion(question)}
                    disabled={isLoading}
                    className="rounded-full border border-[#d4af37]/20 bg-[#201513]/80 px-3 py-2 text-xs text-stone-200 transition hover:border-[#d4af37]/45 hover:text-[#f4d98e] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
              {messages.map((msg, idx) => (
                <motion.div
                  key={`${msg.role}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[92%] items-start md:max-w-[78%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl ${msg.role === 'user' ? 'ml-3 bg-[#8f2626] text-white' : 'mr-3 bg-[#2b211d] text-[#d4af37]'}`}>
                      {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`rounded-[24px] px-4 py-3 text-sm leading-7 md:px-5 md:py-4 md:text-[15px] ${msg.role === 'user' ? 'rounded-tr-md bg-[linear-gradient(135deg,#a42d2d,#7b1717)] text-white' : 'rounded-tl-md border border-[#d4af37]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] text-stone-200'}`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[92%] items-start md:max-w-[78%]">
                    <div className="mr-3 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#2b211d] text-[#d4af37]">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 rounded-[24px] rounded-tl-md border border-[#d4af37]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] px-4 py-3 text-sm text-stone-200 md:px-5 md:py-4 md:text-[15px]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      正在检索并生成大明宫讲解内容...
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/8 bg-black/15 px-4 py-4 md:px-5">
              <form onSubmit={handleSend} className="rounded-[26px] border border-white/12 bg-[#130f0f]/85 p-2">
                <div className="flex flex-col gap-3 md:flex-row md:items-end">
                  <div className="flex-1">
                    <div className="mb-2 px-3 text-[11px] tracking-[0.28em] text-stone-500">输入你的问题</div>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="例如：请帮我生成一段 1 分钟的大明宫含元殿讲解词"
                      className="w-full bg-transparent px-3 pb-2 text-sm text-white outline-none placeholder:text-stone-500 md:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#a42d2d,#7b1717)] px-5 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    发送提问
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
