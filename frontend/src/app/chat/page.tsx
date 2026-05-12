import Link from "next/link";
import React from "react";

export default function ChatPage() {
  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden antialiased bg-gradient-to-br from-surface-bright to-tertiary-fixed text-on-background">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col w-60 h-full z-40 px-3 py-5 bg-tertiary-fixed/40 backdrop-blur-xl border-r border-white/20 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] flex-shrink-0">
        <div className="flex items-center gap-2.5 mb-6 px-2">
          <div className="w-8 h-8 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center font-headline-sm">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-[18px] text-[#1b1c1a] font-medium leading-tight">Atlas</h1>
            <p className="font-label-sm text-[11px] text-on-surface-variant">Creative Partner</p>
          </div>
        </div>
        <button className="w-full mb-6 py-2.5 px-3 bg-[#1b1c1a] text-white rounded-xl font-label-md text-sm flex items-center justify-center gap-2 hover:bg-black transition-all duration-300 shadow-sm">
          <span className="material-symbols-outlined text-[20px]">add_box</span>
          New Chat
        </button>
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1 custom-scrollbar">
          <p className="px-2 mb-1.5 font-label-sm text-[11px] text-outline uppercase tracking-wider">History</p>
          <Link href="#" className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high/50 text-on-surface font-label-md text-sm transition-all duration-300">
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#1b1c1a] text-[20px]">chat_bubble_outline</span>
            <span className="truncate">Mindfulness routines</span>
          </Link>
          <Link href="#" className="group flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-300">
            <span className="material-symbols-outlined text-outline group-hover:text-[#1b1c1a] text-[20px]">chat_bubble_outline</span>
            <span className="truncate">Morning reflections</span>
          </Link>
          <Link href="#" className="group flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-300">
            <span className="material-symbols-outlined text-outline group-hover:text-[#1b1c1a] text-[20px]">chat_bubble_outline</span>
            <span className="truncate">Creative writing prompts</span>
          </Link>
          <p className="px-2 mt-4 mb-1.5 font-label-sm text-[11px] text-outline uppercase tracking-wider">Menu</p>
          <Link href="#" className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1b1c1a] text-white font-bold text-sm transition-all duration-300">
            <span className="material-symbols-outlined text-[20px]">history</span>
            History
          </Link>
          <Link href="/settings" className="group flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-300 text-sm">
            <span className="material-symbols-outlined text-outline group-hover:text-[#1b1c1a] text-[20px]">settings</span>
            Settings
          </Link>
        </div>
        <div className="mt-auto pt-4 border-t border-white/20 flex flex-col gap-1">
          <Link href="/help" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-sm text-[13px]">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            Help
          </Link>
          <Link href="/privacy" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-sm text-[13px]">
            <span className="material-symbols-outlined text-[18px]">security</span>
            Privacy
          </Link>
          <Link href="/pricing" className="mt-2 w-full py-2 border border-[#1b1c1a]/20 text-[#1b1c1a] rounded-lg font-label-md text-sm hover:bg-[#1b1c1a] hover:text-white transition-colors text-center block">
            Upgrade Pro
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Mobile Top Nav Fallback */}
        <header className="md:hidden sticky top-0 z-30 flex justify-between items-center w-full h-16 px-4 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-[#1b1c1a]">Atlas</span>
          </div>
          <button className="text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* TopNavBar (Web) */}
        <div className="hidden md:flex sticky top-0 z-30 justify-between items-center w-full h-16 px-8 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-sm">
          <div className="flex gap-8">
            <Link href="#" className="text-[#1b1c1a] font-semibold border-b-2 border-[#1b1c1a] pb-1 font-label-md text-label-md">Chat</Link>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[#1b1c1a] font-label-md text-label-md flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined">ios_share</span>
              Share
            </button>
            <div className="flex gap-4">
              <button className="text-on-surface-variant hover:text-[#1b1c1a] transition-colors"><span className="material-symbols-outlined">notifications</span></button>
              <button className="text-on-surface-variant hover:text-[#1b1c1a] transition-colors"><span className="material-symbols-outlined">account_circle</span></button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 flex flex-col max-w-container-max mx-auto w-full">
          {/* Empty State / Suggestions */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full mb-8">
            <div className="w-16 h-16 rounded-full bg-[#1b1c1a]/5 flex items-center justify-center mb-4 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)]">
              <span className="material-symbols-outlined text-[32px] text-[#1b1c1a]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </div>
            <h2 className="font-headline-sm text-[26px] text-[#1b1c1a] mb-2 text-center leading-tight">How can I assist your focus today?</h2>
            <p className="font-body-md text-[15px] text-on-surface-variant text-center mb-8 max-w-lg">
              I'm here to help you brainstorm, organize thoughts, or simply find clarity in your day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <button className="bg-white/50 backdrop-blur-[20px] border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] p-4 rounded-2xl text-left hover:bg-white/70 transition-all duration-300 group flex flex-col gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-[#1b1c1a] transition-colors">code</span>
                <h3 className="font-label-md text-[14px] text-on-surface">Explain JavaScript promises</h3>
                <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 leading-relaxed">Break down asynchronous programming concepts in simple, easy-to-understand terms.</p>
              </button>
              <button className="bg-white/50 backdrop-blur-[20px] border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] p-4 rounded-2xl text-left hover:bg-white/70 transition-all duration-300 group flex flex-col gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-[#1b1c1a] transition-colors">fitness_center</span>
                <h3 className="font-label-md text-[14px] text-on-surface">Create a workout plan</h3>
                <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 leading-relaxed">Design a 3-day beginner routine focusing on core strength and flexibility.</p>
              </button>
              <button className="bg-white/50 backdrop-blur-[20px] border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] p-4 rounded-2xl text-left hover:bg-white/70 transition-all duration-300 group flex flex-col gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-[#1b1c1a] transition-colors">edit_note</span>
                <h3 className="font-label-md text-[14px] text-on-surface">Draft a thoughtful email</h3>
                <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 leading-relaxed">Help me write a professional yet warm follow-up message to a recent client meeting.</p>
              </button>
              <button className="bg-white/50 backdrop-blur-[20px] border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] p-4 rounded-2xl text-left hover:bg-white/70 transition-all duration-300 group flex flex-col gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-[#1b1c1a] transition-colors">self_improvement</span>
                <h3 className="font-label-md text-[14px] text-on-surface">Guided breathing exercise</h3>
                <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 leading-relaxed">Walk me through a 5-minute box breathing routine to reduce immediate stress.</p>
              </button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 pt-0 w-full max-w-3xl mx-auto">
          <div className="bg-white/50 backdrop-blur-[20px] border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] rounded-[20px] p-1.5 flex items-end gap-1 focus-within:border-[#1b1c1a]/30 focus-within:ring-2 focus-within:ring-[#1b1c1a]/10 transition-all duration-300">
            <div className="flex items-center gap-0.5 mb-0.5 ml-1">
              <button className="p-2 text-on-surface-variant hover:text-[#1b1c1a] hover:bg-white/60 transition-all flex-shrink-0 rounded-full" title="Attach file">
                <span className="material-symbols-outlined text-[22px]">attach_file</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-[#1b1c1a] hover:bg-white/60 transition-all flex-shrink-0 rounded-full group" title="Switch to Image Generation">
                <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">image</span>
              </button>
            </div>
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 py-2.5 px-2 font-body-md text-[15px] text-on-surface placeholder:text-on-surface-variant/60 custom-scrollbar outline-none" 
              placeholder="Ask anything..." 
              rows={1} 
              style={{ minHeight: '44px' }}
            />
            <button className="p-2.5 bg-[#1b1c1a] text-white rounded-[14px] hover:bg-black transition-colors flex-shrink-0 shadow-sm flex items-center justify-center mb-0.5 mr-0.5">
              <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
            </button>
          </div>
          <p className="text-center font-label-sm text-[11px] text-on-surface-variant mt-2 opacity-70">
            AI can make mistakes. Consider verifying important information.
          </p>
        </div>
      </main>
    </div>
  );
}
