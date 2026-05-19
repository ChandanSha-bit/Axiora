"use client";
// WHY "use client"?
// This page uses React hooks (useState, useEffect, useRef) and browser events.
// Next.js 15 renders everything on the server by default. "use client" tells
// Next.js: "This component needs to run in the browser." Without it, hooks won't work.

import { useState, useEffect, useRef, useCallback } from "react";
// WHY useState?  → Tracks pieces of data that change over time (messages, loading, input text).
//                  When state changes, React re-renders the component automatically.
// WHY useEffect? → Runs code AFTER the component renders. We use it to auto-scroll
//                  to the latest message every time a new message is added.
// WHY useRef?    → Gives us a direct reference to a real DOM element (the bottom
//                  of the chat list) without causing a re-render. Perfect for scrolling.

import Link from "next/link";
import { useRouter } from "next/navigation";
// WHY useRouter? → Allows us to programmatically navigate (e.g., redirect to /login
//                  if the user is not authenticated).

import toast, { Toaster } from "react-hot-toast";
// WHY react-hot-toast? → Shows non-blocking success/error notifications to the user
//                         without interrupting their workflow.

import api from "@/lib/axios";
// WHY our custom Axios instance?
// This is the "Neural Bridge" — our centralized HTTP client.
// It automatically injects the JWT token into every request via its interceptor.
// We never have to manually write "Authorization: Bearer ..." anywhere.

import { useAuthStore } from "@/store/useAuthStore";
// WHY Zustand?
// This is our global state store. It holds the logged-in user's info and token.
// We use it here to:
//   1. Check if the user is logged in (for route protection)
//   2. Display the user's name in the UI

// --- TYPE DEFINITIONS ---
// WHY interfaces? → TypeScript interfaces define the "shape" of our data.
// This prevents bugs by ensuring we always use message objects correctly.
interface Message {
  role: "user" | "assistant"; // Can only be one of these two values
  content: string;
}

interface Chat {
  _id: string;
  title?: string;
  messages: Message[];
}

export default function ChatPage() {
  // --- STATE ---
  // WHY separate state variables? → Each piece of data has a specific, single job.
  // This is the "Single Responsibility Principle."

  const [messages, setMessages] = useState<Message[]>([]);
  // ^ Holds the array of all chat messages displayed on screen

  const [input, setInput] = useState("");
  // ^ Tracks what the user is typing in the textarea (controlled input)

  const [loading, setLoading] = useState(false);
  // ^ True when we are waiting for the AI to respond. Used to show a loading indicator.

  const [chatId, setChatId] = useState<string | null>(null);
  // ^ Stores the current conversation's MongoDB ID. null = new conversation.
  //   We send this to the backend so it knows to add to the existing chat,
  //   not create a brand new one every time.

  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  // ^ Holds the list of all past conversations shown in the sidebar.


  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  // ^ Tracks which chat's three-dots menu dropdown is currently open.
  const [renamingId, setRenamingId] = useState<string | null>(null);
  // ^ Tracks which chat is currently being renamed.
  const [renameTitle, setRenameTitle] = useState("");
  // ^ Tracks the input text for renaming.

  // Listen for clicks outside to dismiss the three-dots dropdown menu
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveMenuId(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // --- RESIZABLE SIDEBAR STATES & HANDLERS ---
  const [sidebarWidth, setSidebarWidth] = useState(208); // Default to 208px (w-52)
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Prevent text selection when dragging
  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth < 100) {
        setIsCollapsed(true); // Snap to collapse when dragged too small
      } else {
        setIsCollapsed(false);
        const clampedWidth = Math.max(150, Math.min(newWidth, 380)); // Min 150px, Max 380px
        setSidebarWidth(clampedWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  // --- REFS & HOOKS ---
  const bottomRef = useRef<HTMLDivElement>(null);
  // ^ A direct pointer to an invisible div at the bottom of the chat.
  //   We use .scrollIntoView() on this to auto-scroll to the latest message.

  const router = useRouter();
  const { user } = useAuthStore();
  // ^ Read the current user from our global Zustand store.

  // --- ROUTE PROTECTION ---
  // WHY? → The chat page is PRIVATE. If someone navigates to /chat without
  // being logged in (no user in the store), we immediately redirect them to /login.
  // This runs once when the component mounts.
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // --- LOAD CHAT HISTORY (On Mount) ---
  // WHY useEffect with []? → The empty array [] means "run this only ONCE,
  // when the component first appears on screen." Perfect for initial data fetching.
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/chat");
        // Our Axios client auto-adds the JWT token here.
        // The backend's protect middleware validates it and returns this user's chats.
        setChatHistory(res.data.data);
      } catch {
        // Silently fail — history is a "nice to have," not critical for the page to work.
      }
    };
    if (user) fetchHistory(); // Only fetch if logged in
  }, [user]);

  // --- AUTO-SCROLL ---
  // WHY useEffect with [messages]? → The [messages] dependency means "run this
  // every time the messages array changes." After any new message is added,
  // this automatically scrolls the user down to see it.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- SEND MESSAGE HANDLER ---
  // WHY async/await? → Talking to the backend takes time (network request).
  // async/await lets us "pause" and wait for the response without freezing the UI.
  const handleSend = async () => {
    // Don't send empty messages or send while already waiting for AI
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };

    // 1. OPTIMISTIC UI UPDATE
    // WHY? → We add the user's message to the screen IMMEDIATELY before the
    // server responds. This makes the app feel instant and responsive.
    // If the server fails, we can show an error.
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear the input box right away
    setLoading(true); // Show the "thinking" indicator

    try {
      // 2. SEND TO BACKEND
      // POST /api/chat sends the user's message + the current chatId.
      // The backend saves it, queries Groq (Llama 3), and returns the full updated chat.
      const res = await api.post("/chat", {
        message: userMessage.content,
        chatId: chatId, // null on first message → backend creates new chat
      });

      const updatedChat = res.data.data;

      // 3. UPDATE STATE WITH REAL DATA
      // Now we replace our optimistic messages with the full, real message list
      // from the database (which includes the AI's response).
      setMessages(updatedChat.messages);
      setChatId(updatedChat._id); // Save the chatId for all future messages in this conversation

      // UPDATE ENERGY STATE
      if (res.data.energy !== undefined) {
        useAuthStore.getState().updateEnergy(res.data.energy);
      }

      // 4. UPDATE SIDEBAR HISTORY
      // If this is a new chat, add it to the sidebar list.
      setChatHistory((prev) => {
        const exists = prev.find((c) => c._id === updatedChat._id);
        if (!exists) return [updatedChat, ...prev];
        return prev;
      });

    } catch (error: any) {
      console.error('❌ Chat request failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.message);
      
      const errorMessage = error.response?.data?.message || error.message || 'Neural link failed. Please try again.';
      toast.error(errorMessage);
      
      // Remove the optimistic message since the request failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false); // Always stop loading, success or failure
    }
  };

  // --- KEYBOARD HANDLER ---
  // WHY? → Industry standard UX: Press Enter to send, Shift+Enter for new line.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Stop the default Enter (which adds a newline)
      handleSend();
    }
  };

  // --- NEW CHAT ---
  const handleNewChat = () => {
    setMessages([]);
    setChatId(null);
    setInput("");
  };

  // --- RENAME CHAT ---
  const handleRenameConfirm = async (id: string) => {
    const trimmed = renameTitle.trim();
    if (!trimmed) {
      setRenamingId(null);
      return;
    }
    try {
      const res = await api.put(`/chat/${id}`, { title: trimmed });
      setChatHistory((prev) =>
        prev.map((c) => (c._id === id ? { ...c, title: res.data.data.title } : c))
      );
      toast.success("Conversation renamed.");
    } catch {
      toast.error("Failed to rename conversation.");
    } finally {
      setRenamingId(null);
    }
  };

  // --- DELETE CHAT ---
  const handleDeleteChat = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;

    try {
      await api.delete(`/chat/${id}`);
      // Remove from local state instantly — no page reload needed
      setChatHistory(prev => prev.filter(c => c._id !== id));
      // If the deleted chat was the active one, clear the chat area
      if (chatId === id) handleNewChat();
      toast.success('Conversation deleted.');
    } catch {
      toast.error('Failed to delete conversation.');
    }
  };

  // --- RENDER ---
  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden antialiased bg-gradient-to-br from-surface-bright to-tertiary-fixed text-on-background">
      <Toaster position="top-center" />

      {/* ========== SIDEBAR ========== */}
      <nav
        className={`hidden md:flex flex-col h-full z-40 bg-tertiary-fixed/40 backdrop-blur-xl border-r border-white/20 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] flex-shrink-0 relative ${
          isResizing ? "" : "transition-all duration-300"
        }`}
        style={{
          width: isCollapsed ? 0 : sidebarWidth,
          paddingLeft: isCollapsed ? 0 : "12px",
          paddingRight: isCollapsed ? 0 : "12px",
          paddingTop: isCollapsed ? 0 : "20px",
          paddingBottom: isCollapsed ? 0 : "20px",
          opacity: isCollapsed ? 0 : 1,
          overflow: "hidden",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-6 px-2">
          <div className="w-8 h-8 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-[18px] text-[#1b1c1a] font-medium leading-tight">Atlas</h1>
            <p className="font-label-sm text-[11px] text-on-surface-variant">Creative Partner</p>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="w-full mb-6 py-2.5 px-3 bg-[#1b1c1a] text-white rounded-xl font-label-md text-sm flex items-center justify-center gap-2 hover:bg-black transition-all duration-300 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add_box</span>
          New Chat
        </button>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1">
          <p className="px-2 mb-1.5 font-label-sm text-[11px] text-outline uppercase tracking-wider">History</p>
          {chatHistory.length === 0 && (
            <p className="px-2 text-[12px] text-on-surface-variant/50 italic">No conversations yet.</p>
          )}
          {chatHistory.map((chat) => (
            <div
              key={chat._id}
              className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                chatId === chat._id
                  ? "bg-surface-container-high/50 text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
              onClick={() => {
                if (renamingId !== chat._id) {
                  setMessages(chat.messages);
                  setChatId(chat._id);
                }
              }}
            >
              <span className="material-symbols-outlined text-[16px] flex-shrink-0">chat_bubble_outline</span>
              
              {renamingId === chat._id ? (
                <input
                  type="text"
                  value={renameTitle}
                  onChange={(e) => setRenameTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameConfirm(chat._id);
                    if (e.key === "Escape") setRenamingId(null);
                  }}
                  onBlur={() => handleRenameConfirm(chat._id)}
                  className="bg-white border border-outline/35 rounded px-1.5 py-0.5 text-[11px] w-full text-on-surface outline-none focus:border-[#1b1c1a] focus:ring-1 focus:ring-[#1b1c1a]/10"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span className="truncate text-[12px] flex-1">
                    {chat.title || chat.messages[0]?.content.slice(0, 26) || "New Conversation"}
                  </span>

                  {/* Dropdown Menu Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === chat._id ? null : chat._id);
                    }}
                    title="Options"
                    className="flex-shrink-0 p-0.5 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-[#1b1c1a] hover:bg-white/60"
                  >
                    <span className="material-symbols-outlined text-[15px] font-bold">more_horiz</span>
                  </button>

                  {/* Dropdown Content */}
                  {activeMenuId === chat._id && (
                    <div
                      className="absolute right-1 top-7 z-50 min-w-[90px] bg-white border border-outline/10 shadow-lg rounded-lg py-0.5 flex flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setRenamingId(chat._id);
                          setRenameTitle(chat.title || chat.messages[0]?.content || "New Conversation");
                          setActiveMenuId(null);
                        }}
                        className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-on-surface hover:bg-surface-container-high transition-colors w-full text-left font-medium"
                      >
                        <span className="material-symbols-outlined text-[13px]">edit</span>
                        Rename
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteChat(chat._id);
                          setActiveMenuId(null);
                        }}
                        className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 transition-colors w-full text-left font-medium"
                      >
                        <span className="material-symbols-outlined text-[13px]">delete</span>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Settings Option — Placed where Neural Energy was */}
        <div className="mt-auto pt-2 px-2">
          <Link href="/settings" className="group flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-300 text-sm">
            <span className="material-symbols-outlined text-outline group-hover:text-[#1b1c1a] text-[20px]">settings</span>
            Settings
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto pt-4 border-t border-white/20 flex flex-col gap-1">
          {/* Show logged-in user name */}
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-[#1b1c1a]/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[16px] text-[#1b1c1a]">person</span>
            </div>
            <span className="font-label-md text-[13px] text-on-surface truncate">{user?.name || "Architect"}</span>
          </div>
          <Link href="/pricing" className="mt-2 w-full py-2 border border-[#1b1c1a]/20 text-[#1b1c1a] rounded-lg font-label-md text-sm hover:bg-[#1b1c1a] hover:text-white transition-colors text-center block">
            Upgrade Pro
          </Link>
        </div>
      </nav>

      {/* Resizer Handle */}
      {!isCollapsed && (
        <div
          onMouseDown={startResizing}
          onDoubleClick={() => setIsCollapsed(true)}
          className="hidden md:block w-1.5 h-full cursor-col-resize hover:bg-[#1b1c1a]/5 active:bg-[#1b1c1a]/10 z-50 flex-shrink-0 relative group"
          style={{ marginLeft: "-3px" }}
        >
          {/* Visual Line inside resizer */}
          <div
            className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] transition-colors h-full ${
              isResizing ? "bg-[#1b1c1a]/40" : "bg-[#1b1c1a]/10 group-hover:bg-[#1b1c1a]/20"
            }`}
          />
        </div>
      )}

      {/* ========== MAIN AREA ========== */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">

        {/* Top Bar */}
        <div className="hidden md:flex sticky top-0 z-30 justify-between items-center w-full h-16 px-8 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 text-on-surface-variant hover:text-[#1b1c1a] hover:bg-surface-container-high rounded-lg transition-all flex items-center justify-center"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                {isCollapsed ? "menu" : "menu_open"}
              </span>
            </button>
            <span className="text-[#1b1c1a] font-semibold border-b-2 border-[#1b1c1a] pb-1 font-label-md text-label-md">Chat</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { useAuthStore.getState().logout(); router.push("/login"); }}
              className="text-on-surface-variant hover:text-[#1b1c1a] transition-colors font-label-sm text-[13px] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Logout
            </button>
          </div>
        </div>

        {/* ========== MESSAGES AREA ========== */}
        <div className="flex-1 overflow-y-auto w-full flex flex-col">
          <div className="p-4 md:p-8 flex-1 flex flex-col gap-4 max-w-2xl mx-auto w-full">

          {/* EMPTY STATE — Shown when there are no messages yet */}
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#1b1c1a]/5 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px] text-[#1b1c1a]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <h2 className="font-headline-sm text-[26px] text-[#1b1c1a] mb-2 leading-tight">How can I assist today?</h2>
              <p className="font-body-md text-[15px] text-on-surface-variant mb-8 max-w-lg">
                Powered by Groq Llama 3 — the fastest AI on earth.
              </p>
              {/* Suggestion Cards — clicking fills the input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {[
                  { icon: "code", title: "Explain JavaScript promises", prompt: "Explain JavaScript promises in simple terms with examples." },
                  { icon: "fitness_center", title: "Create a workout plan", prompt: "Create a 3-day beginner workout plan focusing on core strength." },
                  { icon: "edit_note", title: "Draft a professional email", prompt: "Help me write a professional follow-up email to a client." },
                  { icon: "self_improvement", title: "Guided breathing exercise", prompt: "Walk me through a 5-minute box breathing routine." },
                ].map((s) => (
                  <button
                    key={s.title}
                    onClick={() => setInput(s.prompt)}
                    // WHY onClick sets input? → Clicking a suggestion fills the textarea
                    // so the user can review and edit before sending. Better UX than auto-sending.
                    className="bg-white/50 backdrop-blur-[20px] border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] p-4 rounded-2xl text-left hover:bg-white/70 transition-all duration-300 group flex flex-col gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-[#1b1c1a] transition-colors">{s.icon}</span>
                    <h3 className="font-label-md text-[14px] text-on-surface">{s.title}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGE BUBBLES */}
          {messages.map((msg, index) => (
            <div
              key={index}
              // WHY dynamic className? → User messages align right, AI messages align left.
              // This is the standard chat UI pattern (WhatsApp, ChatGPT etc.)
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {/* AI Avatar — only show for assistant messages */}
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[70%] px-3.5 py-2 rounded-2xl font-body-md text-[14px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#1b1c1a] text-white rounded-tr-sm"    // User: dark bubble, right-aligned
                    : "bg-white/60 backdrop-blur-sm text-on-surface border border-white/40 rounded-tl-sm" // AI: glass bubble, left-aligned
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* LOADING INDICATOR — Shown while waiting for AI response */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#1b1c1a] text-white flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl rounded-tl-sm px-3.5 py-2 flex items-center gap-2">
                {/* Animated typing dots — classic "AI is thinking" indicator */}
                <span className="w-2 h-2 rounded-full bg-on-surface-variant animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-on-surface-variant animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-on-surface-variant animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* SCROLL ANCHOR — This invisible div is always at the bottom.
              useEffect scrolls to it whenever messages update. */}
          <div ref={bottomRef} />
        </div>
      </div>

        {/* ========== INPUT AREA ========== */}
        <div className="p-4 md:p-6 pt-0 w-full max-w-2xl mx-auto flex-shrink-0">
          <div className="bg-white/50 backdrop-blur-[20px] border border-white/40 shadow-[0_10px_40px_-10px_rgba(27,48,34,0.08)] rounded-[20px] p-1.5 flex items-end gap-1 focus-within:border-[#1b1c1a]/30 focus-within:ring-2 focus-within:ring-[#1b1c1a]/10 transition-all duration-300">
            <div className="flex items-center gap-0.5 mb-0.5 ml-1">
              <button className="p-2 text-on-surface-variant hover:text-[#1b1c1a] hover:bg-white/60 transition-all flex-shrink-0 rounded-full" title="Attach file">
                <span className="material-symbols-outlined text-[22px]">attach_file</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-[#1b1c1a] hover:bg-white/60 transition-all flex-shrink-0 rounded-full" title="Image Generation">
                <span className="material-symbols-outlined text-[22px]">image</span>
              </button>
            </div>

            {/* CONTROLLED TEXTAREA
                WHY controlled? → value={input} + onChange keeps React in charge
                of the input. This is the "Single Source of Truth" pattern — the
                textarea always shows exactly what is in our `input` state. */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 py-2.5 px-2 font-body-md text-[14px] text-on-surface placeholder:text-on-surface-variant/60 outline-none disabled:opacity-50"
              placeholder={loading ? "Atlas is thinking..." : "Ask anything... (Enter to send)"}
              rows={1}
              style={{ minHeight: "44px" }}
            />

            {/* SEND BUTTON */}
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2.5 bg-[#1b1c1a] text-white rounded-[14px] hover:bg-black transition-colors flex-shrink-0 shadow-sm flex items-center justify-center mb-0.5 mr-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
            </button>
          </div>
          <p className="text-center font-label-sm text-[11px] text-on-surface-variant mt-2 opacity-70">
            Atlas uses Groq Llama 3. Verify important information independently.
          </p>
        </div>
      </main>
    </div>
  );
}
