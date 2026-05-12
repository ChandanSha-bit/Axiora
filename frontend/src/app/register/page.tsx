import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Register() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center relative min-h-screen overflow-hidden p-4 sm:p-6">
      {/* Cinematic Landscape Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          alt="Cinematic mountain landscape" 
          className="w-full h-full object-cover opacity-80" 
          src="/bg-landscape.png?v=2"
          fill
          priority
          sizes="100vw"
          quality={100}
          unoptimized
        />
        {/* Overlay to ensure text readability and maintain Atlas aesthetic */}
        <div className="absolute inset-0 bg-tertiary-fixed/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
      </div>

      {/* Registration Container */}
      {/* Registration Container */}
      <main className="relative z-10 w-full max-w-[400px] bg-surface/80 backdrop-blur-xl rounded-[24px] border border-white/40 shadow-2xl p-6 sm:p-8 flex flex-col gap-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="font-headline-sm text-headline-sm text-primary">Join Atlas</h1>
          <p className="font-body-md text-sm text-on-surface-variant">Your creative journey begins here.</p>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-surface-container-low hover:bg-surface-container-highest transition-colors shadow-sm border border-outline-variant">
            <FcGoogle className="text-[20px]" />
            <span className="font-label-md text-[14px] text-on-surface">Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-surface-container-low hover:bg-surface-container-highest transition-colors shadow-sm border border-outline-variant">
            <FaApple className="text-[20px] text-on-surface mb-[2px]" />
            <span className="font-label-md text-[14px] text-on-surface">Continue with Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-outline-variant"></div>
          <span className="flex-shrink-0 mx-4 font-label-sm text-[12px] text-on-surface-variant uppercase tracking-wider">or</span>
          <div className="flex-grow border-t border-outline-variant"></div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-label-sm text-[13px] text-on-surface-variant block ml-1 mb-1" htmlFor="fullName">Full Name</label>
            <input className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 px-4 text-[15px] text-on-surface placeholder:text-on-surface-variant/50 transition-all shadow-sm outline-none" id="fullName" placeholder="E.g. Jane Doe" type="text" />
          </div>
          <div>
            <label className="font-label-sm text-[13px] text-on-surface-variant block ml-1 mb-1" htmlFor="email">Email Address</label>
            <input className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 px-4 text-[15px] text-on-surface placeholder:text-on-surface-variant/50 transition-all shadow-sm outline-none" id="email" placeholder="name@company.com" type="email" />
          </div>
          <div>
            <label className="font-label-sm text-[13px] text-on-surface-variant block ml-1 mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 px-4 text-[15px] text-on-surface placeholder:text-on-surface-variant/50 transition-all shadow-sm outline-none" id="password" placeholder="Create a strong password" type="password" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>
          <button className="w-full bg-[#1b3022] text-white py-2.5 px-4 rounded-full font-label-md text-[15px] shadow-md hover:bg-[#1b3022]/90 transition-colors mt-2" type="submit">
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-2">
          <p className="font-body-md text-sm text-on-surface-variant">
            Already have an account? 
            <Link className="font-label-md text-[14px] text-primary hover:text-primary/80 transition-colors border-b border-primary/30 hover:border-primary pb-0.5 ml-1" href="/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
