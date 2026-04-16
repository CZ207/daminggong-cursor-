import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Image as ImageIcon, X, Loader2, Bot, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  isError?: boolean;
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '您好！我是大明宫含元殿的AI助手。您可以向我提问关于这座宏伟建筑的历史、结构，或者上传相关图片让我为您分析。',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      imageUrl: imagePreview || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Missing VITE_GEMINI_API_KEY');
      }

      const ai = new GoogleGenAI({ apiKey });
      let responseText = '';

      if (selectedImage) {
        const base64Data = imagePreview?.split(',')[1];
        if (!base64Data) throw new Error('Failed to process image');

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: selectedImage.type,
                },
              },
              { text: input || '请分析这张图片，特别是关于建筑结构和历史价值方面。' },
            ],
          },
        });
        responseText = response.text || '无法分析图片。';
        removeImage();
      } else {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: input,
          config: {
            tools: [{ googleSearch: {} }],
            systemInstruction: '你是一个关于中国古代建筑，特别是唐代大明宫含元殿的专家。请用专业、简洁的语言回答问题。',
          },
        });

        responseText = response.text || '抱歉，我无法回答这个问题。';

        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks && chunks.length > 0) {
          responseText += '\n\n参考来源：\n';
          chunks.forEach((chunk: any, index: number) => {
            if (chunk.web?.uri && chunk.web?.title) {
              responseText += `[${index + 1}] ${chunk.web.title}: ${chunk.web.uri}\n`;
            }
          });
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseText,
        },
      ]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '抱歉，处理您的请求时发生了错误。请稍后再试。',
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
                <h3 className="font-medium text-cyan-100">含元殿 AI 助手</h3>
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
                    {msg.imageUrl && (
                      <img src={msg.imageUrl} alt="Uploaded" className="mb-2 max-w-full rounded-lg border border-white/10" />
                    )}
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
              {imagePreview && (
                <div className="relative mb-3 inline-block">
                  <img src={imagePreview} alt="Preview" className="h-20 rounded-lg border border-cyan-700/50" />
                  <button
                    onClick={removeImage}
                    className="absolute -right-2 -top-2 rounded-full border border-cyan-700 bg-slate-800 p-1 text-slate-300 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-400"
                  title="上传图片分析"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入问题..."
                  className="flex-1 rounded-lg border border-cyan-800/50 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={(!input.trim() && !selectedImage) || isLoading}
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
