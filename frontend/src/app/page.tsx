"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for exploring the possibilities of AI.",
      features: ["100 Chat messages/mo", "Basic Image Generation", "Standard Support", "Web Access"],
      button: "Current Plan",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$20",
      description: "The ultimate creative partner for power users.",
      features: ["Unlimited Chat messages", "High-Res Image Generation", "Priority Support", "Early Access to Features", "Custom AI Personas"],
      button: "Upgrade to Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Scalable solutions for teams and businesses.",
      features: ["Everything in Pro", "Advanced Security", "Team Collaboration", "Dedicated Account Manager", "API Access"],
      button: "Contact Sales",
      highlight: false,
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    },
    viewport: { once: true }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="scroll-smooth selection:bg-primary selection:text-white">
      {/* Ambient Gradient Background */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle at 50% 0%, #e4e2df 0%, #fbf9f6 70%)" }}
      ></div>

      {/* Navigation Bar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-container-max px-margin-mobile md:px-margin-desktop z-50"
      >
        <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-ambient transition-all duration-300 hover:bg-white/50 backdrop-blur-xl">
          {/* Logo */}
          <Link className="flex items-center gap-2 group" href="/">
            <motion.div 
              whileHover={{ scale: 0.9 }}
              className="w-10 h-10 bg-[#1b1c1a] rounded-xl flex items-center justify-center transition-transform"
            >
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </motion.div>
            <span className="font-headline-sm text-headline-sm text-[#1b1c1a] group-hover:opacity-80 transition-opacity">Atlas</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-[#1b1c1a] transition-colors" href="#features">Features</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-[#1b1c1a] transition-colors" href="#pricing">Pricing</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-[#1b1c1a] transition-colors" href="#about">About</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <Link className="bg-[#1b1c1a] hover:bg-black text-white font-label-md text-label-md px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5" href="/login">
              Sign In
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-grow pt-32 pb-24 flex flex-col items-center justify-center relative min-h-screen">
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <Image
            alt="Atlas Landscape Background"
            className="w-full h-full object-cover object-center scale-105"
            src="/bg-landscape.png?v=2"
            fill
            priority
            sizes="100vw"
            quality={100}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-background"></div>
          <div className="absolute inset-0 bg-black/5 mix-blend-multiply"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center z-10"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 px-4 py-1.5 rounded-full mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#1b1c1a] animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">New Advance AI Support</span>
          </motion.div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1b1c1a] max-w-4xl mx-auto mb-6 leading-tight text-balance drop-shadow-sm">
            Find Your Inner Peace, <br className="hidden md:block" />
            <span className="italic font-light text-[#1b1c1a]">One Breath</span> at a Time!
          </h1>

          <p className="font-body-lg text-body-lg text-[#1b1c1a]/80 max-w-2xl mx-auto mb-10 text-balance font-medium">
            Reconnect with nature and find inner calm with your personal AI creative partner.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register" className="bg-[#1b1c1a] hover:bg-black text-white font-label-md text-label-md px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-ambient hover:shadow-lg transform group border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="material-symbols-outlined">eco</span>
              <span>Start Your Journey</span>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-28 bg-[#fbf9f6] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1b1c1a]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1b1c1a]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <motion.div 
            {...fadeIn}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-[#1b1c1a]/5 border border-[#1b1c1a]/10 px-3 py-1 rounded-full mb-4">
              <span className="font-label-sm text-[11px] text-[#1b1c1a] uppercase tracking-[0.2em] font-bold">The Core Suite</span>
            </div>
            <h2 className="font-headline-lg text-4xl md:text-5xl text-[#1b1c1a] mb-6 tracking-tight font-medium">Unrivaled AI Performance</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto opacity-80 leading-relaxed">
              Experience the most advanced creative suite ever built, designed to amplify your potential without the complexity.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              { 
                icon: "chat_bubble", 
                title: "Intelligent Chat", 
                desc: "Sophisticated context-aware conversations that understand nuance and intent, providing human-like clarity.",
                link: "/chat",
                linkText: "Launch Chat"
              },
              { 
                icon: "auto_awesome", 
                title: "Visual Studio", 
                desc: "Breathtaking high-resolution image generation directly in your workflow with simple descriptive prompts.",
                link: "/chat",
                linkText: "Explore Studio"
              },
              { 
                icon: "verified_user", 
                title: "Private & Secure", 
                desc: "Enterprise-grade encryption and privacy-first architecture protecting your most sensitive thoughts and data.",
                link: "/privacy",
                linkText: "View Privacy"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="group bg-white/40 backdrop-blur-2xl p-10 rounded-[32px] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(27,28,26,0.08)] transition-all duration-500 flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1b1c1a] to-[#3a3b38] rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform duration-500">
                  <span className="material-symbols-outlined text-3xl text-white">{feature.icon}</span>
                </div>
                <h3 className="font-headline-sm text-2xl text-[#1b1c1a] mb-4 font-semibold">{feature.title}</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed mb-8 opacity-90">
                  {feature.desc}
                </p>
                <Link href={feature.link} className="mt-auto flex items-center gap-2 text-sm font-bold text-[#1b1c1a] group/link">
                  {feature.linkText} 
                  <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white relative selection:bg-primary-fixed selection:text-primary overflow-hidden">
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <motion.div 
            {...fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-headline-lg text-4xl md:text-5xl text-[#1b1c1a] mb-4 tracking-tight font-medium">Choose Your Journey</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Unlock the full potential of Atlas with our flexible subscription plans.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {tiers.map((tier, idx) => (
              <motion.div 
                key={tier.name} 
                variants={cardVariants}
                className={`relative flex flex-col p-8 rounded-[32px] border transition-all duration-300 ${
                  tier.highlight 
                  ? "bg-[#1b1c1a] text-white border-[#1b1c1a] shadow-xl md:scale-105 z-10" 
                  : "bg-white/60 backdrop-blur-[20px] text-on-surface border-white/40 shadow-sm hover:shadow-md"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#1b1c1a] px-4 py-1 rounded-full text-[11px] font-label-md uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h2 className="text-xl font-headline-sm mb-2">{tier.name}</h2>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-headline-md">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-sm opacity-70 font-label-md">/mo</span>}
                  </div>
                  <p className={`text-sm leading-relaxed ${tier.highlight ? "opacity-80" : "text-on-surface-variant"}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="flex-1 space-y-4 mb-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-body-md">
                      <span className={`material-symbols-outlined text-[20px] ${tier.highlight ? "text-white" : "text-[#1b1c1a]"}`}>
                        check_circle
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/register" className={`w-full py-3.5 rounded-xl font-label-md transition-all text-center block ${
                  tier.highlight 
                  ? "bg-white text-[#1b1c1a] hover:bg-surface-bright active:scale-[0.98]" 
                  : "bg-[#1b1c1a] text-white hover:bg-black active:scale-[0.98]"
                }`}>
                  {tier.button}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 bg-[#fbf9f6]">
        <motion.div 
          {...fadeIn}
          className="max-w-4xl mx-auto px-margin-mobile md:px-0 text-center"
        >
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 bg-[#1b1c1a] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-ambient"
          >
            <span className="material-symbols-outlined text-white text-3xl">spa</span>
          </motion.div>
          <h2 className="font-headline-lg text-[#1b1c1a] mb-6 tracking-tight font-medium">Our Mission</h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8 max-w-2xl mx-auto">
            Atlas was born from a simple belief: technology should bring us peace, not noise. We've combined state-of-the-art artificial intelligence with a nature-inspired design philosophy to create a workspace that feels like a breath of fresh air.
          </p>
          <div className="flex justify-center gap-4">
             <Link href="/register" className="font-label-md text-[#1b1c1a] hover:underline font-bold">Join the movement</Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-outline-variant/30 bg-white/50 backdrop-blur-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1b1c1a]">eco</span>
            <span className="font-headline-sm text-[#1b1c1a] font-medium">Atlas</span>
          </div>
          <div className="flex gap-8 text-on-surface-variant text-sm font-label-md">
            <Link href="/privacy" className="hover:text-[#1b1c1a] transition-colors">Privacy</Link>
            <Link href="/help" className="hover:text-[#1b1c1a] transition-colors">Support</Link>
            <Link href="#" className="hover:text-[#1b1c1a] transition-colors">Twitter</Link>
          </div>
          <p className="text-on-surface-variant/60 text-xs">© 2026 Atlas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
