import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="scroll-smooth">
      {/* Ambient Gradient Background */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle at 50% 0%, #e4e2df 0%, #fbf9f6 70%)" }}
      ></div>

      {/* Navigation Bar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-container-max px-margin-mobile md:px-margin-desktop z-50">
        <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-ambient transition-all duration-300 hover:bg-white/50 backdrop-blur-xl">
          {/* Logo */}
          <Link className="flex items-center gap-2 group" href="/">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:scale-95 transition-transform">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary group-hover:opacity-80 transition-opacity">Serene AI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#features">Features</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#pricing">Pricing</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#about">About</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <Link className="bg-primary hover:bg-on-primary-fixed text-white font-label-md text-label-md px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 border border-transparent hover:border-white/20" href="/login">
              Sign In
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-32 pb-24 flex flex-col items-center justify-center relative min-h-screen">
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <Image
            alt="Serene Landscape Background"
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

        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center z-10">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">New Advance AI Support</span>
          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary max-w-4xl mx-auto mb-6 leading-tight text-balance drop-shadow-sm">
            Find Your Inner Peace, <br className="hidden md:block" />
            <span className="italic font-light text-primary">One Breath</span> at a Time!
          </h1>

          <p className="font-body-lg text-body-lg text-on-background/80 max-w-2xl mx-auto mb-10 text-balance font-medium">
            Reconnect with nature and find inner calm.
          </p>

          <Link href="/register" className="bg-primary-container hover:bg-primary text-white font-label-md text-label-md px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-ambient hover:shadow-lg transform hover:-translate-y-1 group border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined">eco</span>
            <span>Start Your Journey</span>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-surface-container-low/30 relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-4xl md:text-5xl text-primary mb-4">Unrivaled AI Performance</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Experience the most advanced creative suite ever built.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">chat</span>
              </div>
              <h3 className="font-headline-sm text-xl text-primary mb-3">Intelligent Chat</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">Sophisticated context-aware conversations that understand your nuance.</p>
            </div>
            <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">image</span>
              </div>
              <h3 className="font-headline-sm text-xl text-primary mb-3">Visual Studio</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">Breathtaking high-resolution image generation directly in your workflow.</p>
            </div>
            <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h3 className="font-headline-sm text-xl text-primary mb-3">Private & Secure</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">Enterprise-grade encryption protecting your most sensitive thoughts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background relative selection:bg-primary-fixed selection:text-primary">
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-4xl md:text-5xl text-primary mb-4">Choose Your Journey</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Unlock the full potential of Serene AI with our flexible subscription plans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-surface-container-low/30">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-0 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-ambient">
            <span className="material-symbols-outlined text-white text-3xl">spa</span>
          </div>
          <h2 className="font-headline-lg text-primary mb-6">Our Mission</h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8">
            Serene AI was born from a simple belief: technology should bring us peace, not noise. We've combined state-of-the-art artificial intelligence with a nature-inspired design philosophy to create a workspace that feels like a breath of fresh air.
          </p>
          <div className="flex justify-center gap-4">
             <Link href="/register" className="font-label-md text-primary hover:underline">Learn more about our team</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-outline-variant/30 bg-background/50 backdrop-blur-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">eco</span>
            <span className="font-headline-sm text-primary">Serene AI</span>
          </div>
          <div className="flex gap-8 text-on-surface-variant text-sm font-label-md">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/help" className="hover:text-primary transition-colors">Support</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
          </div>
          <p className="text-on-surface-variant/60 text-xs">© 2026 Serene AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
