import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, MapPin, Phone, Home, Calendar } from 'lucide-react';
import { ChatMessage, Property } from '../types';

interface ChatAssistantProps {
  properties: Property[];
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ properties }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `Hello! 👋  
I’m Model AI, your land investment assistant.

How can I help you today?`,
      timestamp: new Date(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  /* ---------------- BOT LOGIC ---------------- */

  const reply = (text: string): string => {
    const msg = text.toLowerCase();

    if (msg.includes('project')) {
      return `Here are some available projects:\n\n` +
        properties
          .slice(0, 5)
          .map(
            (p) =>
              `• ${p.name}\n  Location: ${p.location}\n  Price: KES ${p.price.toLocaleString()}`
          )
          .join('\n\n');
    }

    if (msg.includes('price') || msg.includes('cost')) {
      return `Our plots have flexible pricing and payment plans.\n\nTell me the project name and I’ll give you exact figures.`;
    }

    if (msg.includes('location') || msg.includes('where')) {
      const locations = [...new Set(properties.map((p) => p.location))];
      return `Our projects are located in:\n\n${locations
        .map((l) => `• ${l}`)
        .join('\n')}`;
    }

    if (msg.includes('visit') || msg.includes('site')) {
      return `📍 Site visits are available every week.\n\n📞 Call or WhatsApp: +254 794 132 637\n\nWould you like me to guide you to a project first?`;
    }

    if (msg.includes('contact') || msg.includes('phone')) {
      return `You can reach Model Land via:\n\n📞 +254 794 132 637\n📧 modelland18@gmail.com`;
    }

    return `I can help you with:\n• Projects\n• Prices\n• Locations\n• Site visits\n• Contacts\n\nTry one of the quick buttons below 👇`;
  };

  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      role: 'user',
      text,
      timestamp: new Date(),
    };

    const botMsg: ChatMessage = {
      role: 'model',
      text: reply(text),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[540px] bg-white rounded-2xl shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="bg-green-800 text-white p-4 flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">Model AI</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    m.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-white border'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 border-t grid grid-cols-2 gap-2 text-xs">
            <button onClick={() => sendMessage('Show me projects')} className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg">
              <Home size={14} /> Projects
            </button>
            <button onClick={() => sendMessage('Project locations')} className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg">
              <MapPin size={14} /> Locations
            </button>
            <button onClick={() => sendMessage('Book site visit')} className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg">
              <Calendar size={14} /> Site Visit
            </button>
            <button onClick={() => sendMessage('Contact details')} className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg">
              <Phone size={14} /> Contact
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm"
            />
            <button className="bg-green-600 text-white p-3 rounded-full">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
