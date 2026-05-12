"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", icon: "person", label: "Profile" },
    { id: "appearance", icon: "palette", label: "Appearance" },
    { id: "security", icon: "security", label: "Security" },
    { id: "notifications", icon: "notifications", label: "Notifications" },
  ];

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-on-surface p-6 md:p-12 selection:bg-[#1b1c1a] selection:text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1b1c1a]/3 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1b1c1a]/2 rounded-full blur-[100px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[680px] mx-auto relative z-10"
      >
        <div className="mb-12">
          <Link href="/chat" className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-on-surface-variant hover:text-[#1b1c1a] hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="w-6 h-6 rounded-full bg-[#1b1c1a]/5 flex items-center justify-center group-hover:bg-[#1b1c1a]/10 transition-colors">
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            </div>
            <span className="font-bold text-[13px] tracking-tight">Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Navigation Sidebar */}
          <aside className="w-full md:w-44 shrink-0 space-y-6">
            <div>
              <h1 className="font-headline-sm text-xl text-[#1b1c1a] mb-0.5 font-bold tracking-tight">Settings</h1>
              <p className="text-[9px] text-on-surface-variant opacity-60 font-black uppercase tracking-[0.2em]">Atlas Config</p>
            </div>

            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 text-left relative group ${
                    activeTab === tab.id 
                    ? "text-[#1b1c1a]" 
                    : "text-on-surface-variant hover:text-[#1b1c1a] hover:bg-white/40"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white border border-[#1b1c1a]/10 shadow-sm rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`material-symbols-outlined text-[18px] relative z-10 ${activeTab === tab.id ? "text-[#1b1c1a]" : "text-on-surface-variant group-hover:text-[#1b1c1a]"}`}>{tab.icon}</span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="pt-8 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1b1c1a]/10 to-transparent"></div>
              <button className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-error/60 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out Account
              </button>
            </div>
          </aside>

          {/* Dynamic Content area */}
          <main className="flex-1 w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div key="profile" {...variants} className="space-y-6">
                  <div className="bg-white/40 backdrop-blur-2xl rounded-[28px] p-6 md:p-7 border border-white/60 shadow-[0_20px_50px_rgba(27,28,26,0.05)]">
                    <div className="mb-8 flex items-center justify-between relative">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full border border-[#1b1c1a]/10 flex items-center justify-center text-[#1b1c1a]/80">
                          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'wght' 100" }}>account_circle</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-2xl text-[#1b1c1a] font-bold tracking-tight">Personal Identity</h2>
                          <p className="text-[11px] text-on-surface-variant uppercase font-black tracking-widest opacity-40">Public Profile & Details</p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#1b1c1a]/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#1b1c1a] text-xl">verified</span>
                      </div>
                      <div className="absolute -bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1b1c1a]/10 to-transparent"></div>
                    </div>
                    
                    <div className="space-y-10">
                      {/* Modern Avatar Picker */}
                      <div className="flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#1b1c1a] to-[#4a4b48] flex items-center justify-center text-white shadow-2xl relative overflow-hidden transition-transform group-hover:scale-105">
                            <span className="material-symbols-outlined text-[48px]">account_circle</span>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                            </div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-[#fbf9f6] flex items-center justify-center shadow-lg text-[#1b1c1a]">
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </div>
                        </div>
                        <div className="text-center sm:text-left space-y-2">
                          <h3 className="text-sm font-bold text-[#1b1c1a]">Display Photo</h3>
                          <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">Pick a square image of at least 400x400px. <br/>Supports JPG, PNG and WebP.</p>
                          <div className="flex gap-3 pt-1">
                            <button className="text-[11px] font-bold px-4 py-2 bg-[#1b1c1a] text-white rounded-xl hover:bg-black transition-all shadow-sm">Change Image</button>
                            <button className="text-[11px] font-bold px-4 py-2 border border-[#1b1c1a]/10 rounded-xl hover:bg-white transition-all">Remove</button>
                          </div>
                        </div>
                      </div>

                      {/* Fields Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">Account Owner</label>
                          <input type="text" className="w-full bg-white/50 border border-white/80 rounded-[20px] px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-[#1b1c1a]/5 focus:border-[#1b1c1a]/20 transition-all shadow-sm" defaultValue="Alex Atlas" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">Email Connection</label>
                          <input type="email" className="w-full bg-white/50 border border-white/80 rounded-[20px] px-5 py-3.5 text-sm outline-none focus:ring-4 focus:ring-[#1b1c1a]/5 focus:border-[#1b1c1a]/20 transition-all shadow-sm" defaultValue="alex@atlas.ai" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">Professional Bio</label>
                        <textarea rows={4} className="w-full bg-white/50 border border-white/80 rounded-[24px] px-5 py-4 text-sm outline-none focus:ring-4 focus:ring-[#1b1c1a]/5 focus:border-[#1b1c1a]/20 transition-all resize-none shadow-sm" defaultValue="Creative explorer and Atlas enthusiast. Building the future of AI interfaces." />
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button className="px-10 py-4 bg-[#1b1c1a] text-white rounded-[20px] text-sm font-bold hover:bg-black hover:shadow-2xl transition-all shadow-xl active:scale-[0.98]">
                          Update Profile Settings
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone Refined */}
                  <div className="bg-error/5 border border-error/10 rounded-[32px] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-error/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10">
                      <h2 className="text-sm font-black text-error uppercase tracking-widest mb-1">Critical: Account Deletion</h2>
                      <p className="text-[11px] text-on-surface-variant opacity-70 leading-relaxed max-w-[300px]">Once deleted, all your Atlas data, including chat history and generations, will be permanently erased.</p>
                    </div>
                    <button className="relative z-10 px-6 py-3 bg-white text-error border border-error/20 rounded-2xl text-[11px] font-bold hover:bg-error hover:text-white transition-all shadow-sm">
                      Delete My Account
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "appearance" && (
                <motion.div key="appearance" {...variants} className="space-y-8">
                  <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 border border-white/60 shadow-[0_20px_50px_rgba(27,28,26,0.05)]">
                    <div className="mb-10">
                      <h2 className="font-headline-sm text-2xl text-[#1b1c1a] font-bold mb-1">Visual Appearance</h2>
                      <p className="text-xs text-on-surface-variant opacity-70">Customize the Atlas interface to your liking.</p>
                    </div>

                    <div className="space-y-10">
                      {/* Theme Selector */}
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">Interface Theme</label>
                        <div className="grid grid-cols-3 gap-4">
                          {["Light", "Dark", "System"].map((theme) => (
                            <button key={theme} className={`flex flex-col gap-3 p-3 rounded-2xl border transition-all ${theme === "Light" ? "border-[#1b1c1a] bg-white shadow-md" : "border-white/60 hover:bg-white/30"}`}>
                              <div className={`h-20 w-full rounded-xl ${theme === "Dark" ? "bg-[#1b1c1a]" : "bg-[#fbf9f6]"} border border-black/5`}></div>
                              <span className="text-[11px] font-bold text-[#1b1c1a]">{theme}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Font Size */}
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">Typography Scale</label>
                        <div className="flex items-center gap-6 p-6 bg-white/40 rounded-[24px] border border-white/60">
                          <span className="text-xs opacity-50 font-bold italic">A</span>
                          <input type="range" className="flex-1 accent-[#1b1c1a] h-1.5 rounded-full" min="12" max="20" defaultValue="14" />
                          <span className="text-xl font-bold italic text-[#1b1c1a]">A</span>
                        </div>
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button className="px-10 py-4 bg-[#1b1c1a] text-white rounded-[20px] text-sm font-bold hover:bg-black transition-all shadow-xl active:scale-[0.98]">
                          Apply Theme
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div key="security" {...variants} className="space-y-8">
                   <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 border border-white/60 shadow-[0_20px_50px_rgba(27,28,26,0.05)]">
                    <div className="mb-10">
                      <h2 className="font-headline-sm text-2xl text-[#1b1c1a] font-bold mb-1">Security & Access</h2>
                      <p className="text-xs text-on-surface-variant opacity-70">Keep your Atlas account safe and secure.</p>
                    </div>

                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">Current Password</label>
                          <div className="relative">
                            <input type="password" placeholder="••••••••" className="w-full bg-white/50 border border-white/80 rounded-[20px] px-12 py-3.5 text-sm outline-none focus:ring-4 focus:ring-[#1b1c1a]/5 focus:border-[#1b1c1a]/20 transition-all" />
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#1b1c1a]/30">lock_open</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">New Password</label>
                             <div className="relative">
                              <input type="password" placeholder="••••••••" className="w-full bg-white/50 border border-white/80 rounded-[20px] px-12 py-3.5 text-sm outline-none focus:ring-4 focus:ring-[#1b1c1a]/5 focus:border-[#1b1c1a]/20 transition-all" />
                              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#1b1c1a]/30">lock</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black text-[#1b1c1a] uppercase tracking-[0.1em] opacity-40 ml-1">Confirm New</label>
                            <div className="relative">
                              <input type="password" placeholder="••••••••" className="w-full bg-white/50 border border-white/80 rounded-[20px] px-12 py-3.5 text-sm outline-none focus:ring-4 focus:ring-[#1b1c1a]/5 focus:border-[#1b1c1a]/20 transition-all" />
                              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#1b1c1a]/30">verified_user</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button className="px-10 py-4 bg-[#1b1c1a] text-white rounded-[20px] text-sm font-bold hover:bg-black transition-all shadow-xl active:scale-[0.98]">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div key="notifications" {...variants} className="space-y-8">
                  <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 border border-white/60 shadow-[0_20px_50px_rgba(27,28,26,0.05)] text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-[#1b1c1a]/5 flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-[40px] text-[#1b1c1a]">notifications_active</span>
                    </div>
                    <h2 className="font-headline-sm text-2xl text-[#1b1c1a] font-bold mb-2">Notification Control</h2>
                    <p className="text-sm text-on-surface-variant max-w-xs mx-auto opacity-70">We're currently implementing granular controls for your Atlas alert system.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </div>
  );
}
