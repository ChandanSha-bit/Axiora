import Link from "next/link";
import React from "react";

export default function PricingPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-surface-bright to-tertiary-fixed text-on-surface p-6 md:p-12 selection:bg-primary-fixed selection:text-primary">
      <div className="max-w-6xl mx-auto">
        <Link href="/chat" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-[#1b1c1a] mb-8 transition-colors font-label-md">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Chat
        </Link>
        
        <header className="text-center mb-16">
          <h1 className="font-headline-lg text-headline-lg text-[#1b1c1a] mb-4">Choose Your Journey</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Unlock the full potential of Atlas with our flexible subscription plans designed for every stage of creativity.</p>
        </header>

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

              <button className={`w-full py-3.5 rounded-xl font-label-md transition-all ${
                tier.highlight 
                ? "bg-white text-[#1b1c1a] hover:bg-surface-bright active:scale-[0.98]" 
                : tier.name === "Free" 
                  ? "bg-outline-variant/20 text-on-surface-variant cursor-default" 
                  : "bg-[#1b1c1a] text-white hover:bg-black active:scale-[0.98]"
              }`}>
                {tier.button}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-[13px] text-on-surface-variant italic opacity-70">
          Prices are in USD and billed monthly. You can cancel your subscription at any time.
        </p>
      </div>
    </div>
  );
}
