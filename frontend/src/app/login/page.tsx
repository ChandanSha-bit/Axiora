"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { user, token } = res.data;
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name}`);
      router.push("/chat");
    } catch (error: any) {
      const message = error.response?.data?.message || "Synthesis Failed. Check credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    // Redirect to backend OAuth endpoint
    // The backend will then redirect to the provider's consent screen
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    window.location.href = `${apiUrl}/auth/${provider.toLowerCase()}`;
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative min-h-screen overflow-hidden py-12 md:py-20">
      <Toaster position="top-center" />
      
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
        <div className="absolute inset-0 bg-tertiary-fixed/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-margin-mobile md:px-0">
        <div className="bg-white/60 backdrop-blur-[20px] border border-white/20 rounded-xl p-8 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)]">
          <h1 className="font-headline-md text-headline-md text-primary text-center mb-3">Login</h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-center mb-8 px-2">
            Access the Atlas Terminal.
          </p>

          {/* OAuth Section - MOVED TO TOP */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleOAuth("Google")}
                className="flex items-center justify-center gap-3 py-2.5 px-4 bg-white/40 border border-white/60 rounded-lg hover:bg-white/60 transition-all active:scale-95 shadow-sm"
              >
                <FcGoogle className="text-xl" />
                <span className="font-label-md text-label-md text-on-surface font-medium">Google</span>
              </button>
              <button 
                onClick={() => handleOAuth("GitHub")}
                className="flex items-center justify-center gap-3 py-2.5 px-4 bg-white/40 border border-white/60 rounded-lg hover:bg-white/60 transition-all active:scale-95 shadow-sm"
              >
                <FaGithub className="text-xl text-[#1b1c1a]" />
                <span className="font-label-md text-label-md text-on-surface font-medium">GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center mt-8">
              <div className="flex-grow border-t border-surface-variant/30"></div>
              <span className="flex-shrink mx-4 font-label-sm text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Or use Credentials</span>
              <div className="flex-grow border-t border-surface-variant/30"></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                </span>
                <input 
                  className="block w-full pl-10 pr-3 py-3 bg-surface-container-low border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container transition-all shadow-inner placeholder:text-outline outline-none" 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">Access Key</label>
                <Link href="/reset-password" title="Forgot Password?" className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors">Forgot Key?</Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                </span>
                <input 
                  className="block w-full pl-10 pr-3 py-3 bg-surface-container-low border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container transition-all shadow-inner placeholder:text-outline outline-none" 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>
            
            <button 
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 px-4 bg-primary-container text-white rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary transition-all active:scale-[0.98] border-t border-white/10 disabled:opacity-50 font-bold uppercase tracking-[0.1em]" 
              type="submit"
            >
              {loading ? "Processing..." : "Login to Terminal"}
            </button>
          </form>
          
          <div className="mt-8 text-center pt-6 border-t border-surface-variant/20">
            <p className="font-body-md text-body-md text-on-surface-variant">
              New Architect? <Link href="/register" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors ml-1 font-bold">Apply for Protocol</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
