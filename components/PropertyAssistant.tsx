"use client";
import { useState } from "react";
import { Send, Bot, Sparkles, MessageSquare } from "lucide-react";

export default function PropertyAssistant() {
  const [input, setInput] = useState("");

  return (
    <div className="group relative">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-[2.5rem] blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
      
      <div className="relative rounded-[2.2rem] bg-white p-8 shadow-2xl border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-[#051F14] flex items-center justify-center text-green-400 shadow-xl shadow-green-900/20">
              <Bot size={32} />
            </div>
            <div className="text-left">
              <h4 className="font-black text-slate-900 tracking-tight text-lg">AbujaVerified AI</h4>
              <p className="text-[10px] font-bold text-green-600 flex items-center gap-1.5 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Intelligence Online
              </p>
            </div>
          </div>
          <Sparkles className="text-slate-200" />
        </div>

        {/* AI Chat Bubble */}
        <div className="text-left mb-10">
          <div className="inline-flex gap-3 bg-slate-50 p-5 rounded-3xl rounded-tl-none border border-slate-100 max-w-[90%]">
            <MessageSquare size={18} className="text-green-600 shrink-0 mt-1" />
            <p className="text-sm text-slate-600 leading-relaxed">
              I can help you verify <span className="font-bold text-slate-800">C of O</span> documents, compare prices in <span className="font-bold text-slate-800">Guzape vs. Maitama</span>, or explain Abuja land laws. What are you looking for?
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 p-5 pr-16 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/5"
            placeholder="Ask about property verification or locations..."
          />
          <button className="absolute right-3 top-3 h-11 w-11 rounded-xl bg-[#051F14] text-white flex items-center justify-center hover:bg-green-600 transition-all shadow-lg active:scale-95">
            <Send size={20} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <span>Trusted Intelligence</span>
          <span className="text-slate-200">•</span>
          <span>Abuja Verified</span>
        </div>
      </div>
    </div>
  );
}