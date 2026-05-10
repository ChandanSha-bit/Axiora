import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Login() {
  return (
    <div className="bg-tertiary font-body-md text-on-surface antialiased min-h-screen py-4 px-4 relative flex items-center justify-center">
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
        {/* Overlay to ensure text readability and maintain serene aesthetic */}
        <div className="absolute inset-0 bg-tertiary-fixed/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
      </div>

      {/* Login Container */}
      <main className="relative z-10 w-full max-w-[400px] mx-margin-mobile sm:mx-auto">
        <div className="bg-white/60 backdrop-blur-[20px] border border-white/20 rounded-[24px] shadow-[0_8px_32px_rgba(27,48,34,0.08)] p-6 sm:p-8 flex flex-col gap-5">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="font-headline-sm text-headline-sm text-primary">Welcome Back</h1>
            <p className="font-body-md text-sm text-on-surface-variant">Continue your journey with Serene AI.</p>
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/40 hover:bg-white/60 border border-white/30 rounded-full transition-all duration-300 shadow-[0_2px_8px_rgba(27,48,34,0.04)] text-primary">
              <FcGoogle className="text-[20px]" />
              <span className="font-label-md text-[14px]">Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/40 hover:bg-white/60 border border-white/30 rounded-full transition-all duration-300 shadow-[0_2px_8px_rgba(27,48,34,0.04)] text-primary">
              <FaApple className="text-[20px] mb-[2px]" />
              <span className="font-label-md text-[14px]">Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant/40"></div>
            <span className="flex-shrink-0 mx-4 font-label-sm text-[12px] text-on-surface-variant uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-outline-variant/40"></div>
          </div>

          {/* Form */}
          <form action="#" className="flex flex-col gap-4" method="POST">
            <div>
              <label className="sr-only" htmlFor="email">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]" data-icon="mail">mail</span>
                </div>
                <input 
                  autoComplete="email" 
                  className="block w-full pl-10 pr-3 py-2 bg-white/40 border border-white/30 rounded-lg text-[15px] text-on-surface placeholder:text-on-surface-variant/70 focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all shadow-inner outline-none" 
                  id="email" 
                  name="email" 
                  placeholder="Email address" 
                  required 
                  type="email"
                />
              </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]" data-icon="lock">lock</span>
                </div>
                <input 
                  autoComplete="current-password" 
                  className="block w-full pl-10 pr-3 py-2 bg-white/40 border border-white/30 rounded-lg text-[15px] text-on-surface placeholder:text-on-surface-variant/70 focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all shadow-inner outline-none" 
                  id="password" 
                  name="password" 
                  placeholder="Password" 
                  required 
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <input 
                  className="h-4 w-4 text-primary-container focus:ring-primary-container border-outline-variant rounded bg-white/50" 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox"
                />
                <label className="ml-2 block font-label-sm text-sm text-on-surface-variant" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link className="font-label-sm text-sm text-primary hover:text-primary-container transition-colors" href="#">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button 
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm font-label-md text-[15px] text-white bg-primary-container hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container mt-2" 
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-2">
            <p className="font-body-md text-sm text-on-surface-variant">
              Don't have an account? 
              <Link className="font-label-md text-[14px] text-primary hover:text-primary-container transition-colors ml-1 border-b border-primary/30 hover:border-primary pb-0.5" href="/register">Create one</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
