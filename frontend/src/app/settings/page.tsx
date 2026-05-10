import Link from "next/link";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-bright to-tertiary-fixed text-on-surface p-6 md:p-12 selection:bg-primary-fixed selection:text-primary">
      <div className="max-w-4xl mx-auto">
        <Link href="/chat" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-[#1b1c1a] mb-8 transition-colors font-label-md">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Chat
        </Link>
        
        <header className="mb-10">
          <h1 className="font-headline-lg text-headline-lg text-[#1b1c1a] mb-3">Settings</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your account preferences and personal information.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Tabs */}
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1b1c1a] text-white font-label-md shadow-sm text-left">
              <span className="material-symbols-outlined text-[20px]">person</span>
              Profile
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 text-on-surface-variant hover:text-[#1b1c1a] font-label-md transition-all text-left">
              <span className="material-symbols-outlined text-[20px]">palette</span>
              Appearance
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 text-on-surface-variant hover:text-[#1b1c1a] font-label-md transition-all text-left">
              <span className="material-symbols-outlined text-[20px]">security</span>
              Security
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 text-on-surface-variant hover:text-[#1b1c1a] font-label-md transition-all text-left">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              Notifications
            </button>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/60 backdrop-blur-[20px] rounded-3xl p-8 border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)]">
              <h2 className="font-headline-sm text-[22px] text-[#1b1c1a] mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 pb-6 border-b border-outline-variant/30">
                  <div className="w-20 h-20 rounded-full bg-secondary-fixed/50 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                    <span className="material-symbols-outlined text-[40px] text-[#1b1c1a]">account_circle</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-[#1b1c1a] text-white rounded-lg text-sm font-label-md hover:bg-black transition-colors">Change Photo</button>
                    <button className="text-sm text-error hover:underline text-left">Remove</button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-label-md text-on-surface ml-1">Full Name</label>
                    <input type="text" className="bg-white/50 border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1b1c1a]/10 focus:border-[#1b1c1a]/30 transition-all" defaultValue="Alex Serene" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-label-md text-on-surface ml-1">Email Address</label>
                    <input type="email" className="bg-white/50 border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1b1c1a]/10 focus:border-[#1b1c1a]/30 transition-all" defaultValue="alex@example.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-label-md text-on-surface ml-1">Bio</label>
                  <textarea rows={3} className="bg-white/50 border border-outline-variant rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1b1c1a]/10 focus:border-[#1b1c1a]/30 transition-all resize-none" defaultValue="AI enthusiast and creative explorer." />
                </div>

                <div className="pt-4">
                  <button className="px-8 py-3 bg-[#1b1c1a] text-white rounded-xl font-label-md hover:bg-black transition-all shadow-sm">Save Changes</button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-error/5 border border-error/20 rounded-3xl p-8">
              <h2 className="text-lg font-headline-sm text-error mb-2">Danger Zone</h2>
              <p className="text-sm text-on-surface-variant mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-6 py-2 border border-error text-error rounded-lg text-sm font-label-md hover:bg-error hover:text-white transition-all">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
