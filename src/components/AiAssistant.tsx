import { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2, Bot, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '您好！我是大明宫 AI 助手。您可以向我提问关于大明宫、含元殿、唐代建筑与历史文化的问题。',
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
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const question = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY;
      if (!apiKey) {
        throw new Error('当前未配置 VITE_DASHSCOPE_API_KEY');
      }

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
              content: '你是“大明宫数字文化助手”，擅长用准确、凝练、自然的中文回答与大明宫、含元殿、唐代建筑、历史文化相关的问题；如果用户问的是泛知识问题，也正常回答。'
            },
            ...messages.map((message) => ({
              role: message.role,
              content: message.content
            })),
            {
              role: 'user',
              content: question
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error?.message || data?.message || 'DashScope 请求失败。';
        throw new Error(errorMessage);
      }

      const responseText = data?.choices?.[0]?.message?.content?.trim() || '抱歉，我这次没有生成有效回复，请稍后重试。';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseText,
        },
      ]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '调用 AI 服务时发生未知错误。';
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `抱歉，处理您的请求时发生了错误：${errorMessage}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-cyan-600 p-4 text-white shadow-lg shadow-cyan-900/50 transition-colors hover:bg-cyan-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[600px] max-h-[80vh] w-96 max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-cyan-800/50 bg-slate-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-cyan-800/50 bg-slate-800/50 p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-cyan-400" />
                <h3 className="font-medium text-cyan-100">大明宫 AI 助手</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex max-w-[85%] gap-3', msg.role === 'user' ? 'ml-auto flex-row-reverse' : '')}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
                      msg.role === 'user' ? 'bg-cyan-600' : 'bg-slate-700'
                    )}
                  >
                    {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-cyan-400" />}
                  </div>
                  <div
                    className={cn(
                      'whitespace-pre-wrap rounded-2xl p-3 text-sm',
                      msg.role === 'user'
                        ? 'rounded-tr-none bg-cyan-600 text-white'
                        : 'rounded-tl-none border border-cyan-900/30 bg-slate-800 text-slate-200',
                      msg.isError && 'border-red-800/50 bg-red-900/50 text-red-200'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex max-w-[85%] gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
                    <Bot className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-cyan-900/30 bg-slate-800 p-3 text-sm text-slate-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    思考中...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-cyan-800/50 bg-slate-800/30 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入问题..."
                  className="flex-1 rounded-lg border border-cyan-800/50 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="rounded-lg bg-cyan-600 p-2 text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
