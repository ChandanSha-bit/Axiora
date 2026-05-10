import Image from "next/image";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center relative min-h-screen overflow-hidden py-12 md:py-20">
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

      {/* Centered Glassmorphism Card */}
      <main className="relative z-10 w-full max-w-md px-margin-mobile md:px-0">
        {/* Brand / Logo Area */}
        <div className="text-center mb-8">
          <div className="font-headline-sm text-headline-sm text-primary font-medium tracking-tight">Serene AI</div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-[20px] border border-white/20 rounded-xl p-8 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] text-center">
          <h1 className="font-headline-md text-headline-md text-primary mb-3">Reset Password</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 px-2">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form className="space-y-6 text-left">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                </span>
                <input 
                  className="block w-full pl-10 pr-3 py-3 bg-surface-container-low border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container transition-all shadow-inner placeholder:text-outline outline-none" 
                  id="email" 
                  name="email" 
                  placeholder="name@example.com" 
                  required 
                  type="email" 
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              className="w-full flex items-center justify-center py-3 px-4 bg-primary-container text-white rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary-container/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container transition-all active:scale-[0.98] border-t border-white/10" 
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
          
          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <Link className="inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="/login">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
