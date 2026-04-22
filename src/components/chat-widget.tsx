"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowUpRight, CalendarClock, X } from "lucide-react";
import { API_URL } from "@/lib/utils";
import { useLocale } from "./locale-provider";
import type { Dict } from "@/lib/i18n";

type ChatRole = "user" | "bot";

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  at: number;
}

const SESSION_KEY = "alamops_chat_session";
const CALENDLY_URL = "https://calendly.com/ceo-alamops";

const CTA_TRIGGERS: RegExp[] = [
  /hablar con un? especialista/i,
  /llamada estrat[ée]gica/i,
  /agendar(la|\s+(una\s+)?(llamada|cita|reuni[oó]n))/i,
  /(book|schedule).*(call|meeting|session)/i,
  /talk to (a|an) (specialist|expert)/i,
  /strategy call/i,
];

function hasCallCta(text: string): boolean {
  return CTA_TRIGGERS.some((re) => re.test(text));
}

function cleanCtaLine(text: string): string {
  return text
    .replace(/^\s*[·•\-*]?\s*(hablar con un? especialista|talk to (a|an) (specialist|expert))\s*[→>»]*\s*$/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function genId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = genId();
    window.localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return genId();
  }
}

export function ChatWidget() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const sessionIdRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setMounted(true);
    sessionIdRef.current = loadSessionId();
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, sending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  }, [open]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !sending,
    [input, sending]
  );

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text) {
      setError(t.chat.errors.empty);
      return;
    }
    if (text.length > 2000) {
      setError(t.chat.errors.tooLong);
      return;
    }
    setError(null);

    const userMsg: ChatMessage = {
      id: genId(),
      role: "user",
      text,
      at: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionIdRef.current,
          locale,
        }),
      });

      if (res.status === 429) {
        setError(t.chat.errors.rateLimit);
        return;
      }
      if (!res.ok) {
        setError(t.chat.errors.failed);
        return;
      }

      const data = (await res.json()) as { output?: string };
      const output = (data.output ?? "").trim();
      if (!output) {
        setError(t.chat.errors.failed);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: genId(), role: "bot", text: output, at: Date.now() },
      ]);
    } catch {
      setError(t.chat.errors.offline);
    } finally {
      setSending(false);
    }
  }, [input, locale, t]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) handleSend();
    }
  };

  if (!mounted) return null;

  return (
    <div className="landing" aria-live="polite">
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="alamops-chat-panel"
        aria-label={t.chat.launcherLabel}
        className={[
          "fixed z-[70] bottom-6 right-6 md:bottom-8 md:right-8",
          "group",
          "transition-all duration-500 ease-out",
          open
            ? "opacity-0 scale-95 pointer-events-none translate-y-2"
            : "opacity-100 scale-100",
        ].join(" ")}
        style={{ fontFamily: "var(--font-serif)" }}
      >
        <span className="alam-chat-launcher">
          <span className="alam-chat-launcher__dot" aria-hidden />
          <span className="alam-chat-launcher__headline">
            {t.chat.launcherHeadline_a}{" "}
            <em>{t.chat.launcherHeadline_b}</em>
          </span>
          <span className="mono alam-chat-launcher__cta">
            <span>{t.chat.launcherLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden />
          </span>
        </span>
      </button>

      {/* Panel */}
      <div
        id="alamops-chat-panel"
        role="dialog"
        aria-modal="false"
        aria-label={`${t.chat.title_a} ${t.chat.title_b}`}
        className={[
          "fixed z-[75] bottom-0 right-0 md:bottom-8 md:right-8",
          "w-full md:w-[400px] h-[100dvh] md:h-[620px] md:max-h-[82vh]",
          "flex flex-col",
          "bg-[#faf8f3] text-[#1a1a17]",
          "border-t md:border border-[#1a1a17]/20",
          "shadow-[0_40px_80px_-30px_rgba(26,26,23,0.35)]",
          "transition-all duration-400 ease-out origin-bottom-right",
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 md:scale-95 pointer-events-none",
        ].join(" ")}
      >
        {/* Grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Header */}
        <header className="relative flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-[#1a1a17]/15">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="alam-chat-pulse w-1.5 h-1.5 bg-[#5a6a3a] rounded-full"
              />
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/55">
                {t.chat.status}
              </span>
            </div>
            <h2 className="text-[26px] leading-[0.95] font-light tracking-tight">
              {t.chat.title_a}{" "}
              <span className="italic text-[#5a6a3a]">{t.chat.title_b}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.chat.close}
            className="shrink-0 mt-1 w-8 h-8 flex items-center justify-center border border-[#1a1a17]/25 hover:bg-[#1a1a17] hover:text-[#faf8f3] transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </header>

        {/* Transcript */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6"
        >
          <IntroBlock />

          {messages.map((m) => (
            <MessageBlock key={m.id} msg={m} t={t} />
          ))}

          {sending && <TypingBlock label={t.chat.bot} />}

          {error && (
            <div
              role="alert"
              className="mono text-[10px] tracking-[0.25em] uppercase text-[#8a2a2a] border border-[#8a2a2a]/40 bg-[#8a2a2a]/5 px-3 py-2"
            >
              {error}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canSend) handleSend();
          }}
          className="relative border-t border-[#1a1a17]/15 bg-[#faf8f3]/80 backdrop-blur-sm"
        >
          <div className="px-5 pt-3 pb-2 flex items-center justify-end">
            <span className="mono text-[10px] tracking-[0.2em] uppercase text-[#1a1a17]/45 tabular-nums">
              {input.length}/2000
            </span>
          </div>
          <div className="px-5 pb-4 flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              maxLength={2000}
              placeholder={t.chat.placeholder}
              disabled={sending}
              aria-label={t.chat.placeholder}
              className="flex-1 resize-none bg-transparent text-[15px] leading-snug tracking-tight border-0 border-b border-[#1a1a17]/25 focus:outline-none focus:border-[#5a6a3a] py-2 placeholder:text-[#1a1a17]/35"
              style={{ fontFamily: "var(--font-serif)" }}
            />
            <button
              type="submit"
              disabled={!canSend}
              aria-label={sending ? t.chat.sending : t.chat.send}
              className="mono text-[10px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-4 py-3 hover:bg-[#5a6a3a] transition-colors disabled:opacity-40 disabled:hover:bg-[#1a1a17] whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>{sending ? t.chat.sending : t.chat.send}</span>
              {!sending && (
                <ArrowUpRight className="w-3 h-3 stroke-[1.5]" aria-hidden />
              )}
            </button>
          </div>
        </form>
      </div>

      <ChatWidgetStyles />
    </div>
  );
}

function IntroBlock() {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-3 pb-1">
      <p className="text-[17px] leading-[1.45] tracking-tight">
        <span className="italic text-[#5a6a3a]">Hello.</span>{" "}
        {t.chat.intro}
      </p>
      <div className="h-px bg-[#1a1a17]/15 mt-2" />
    </div>
  );
}

function MessageBlock({ msg, t }: { msg: ChatMessage; t: Dict }) {
  const isUser = msg.role === "user";
  const showCta = !isUser && hasCallCta(msg.text);
  const body = showCta ? cleanCtaLine(msg.text) : msg.text;

  return (
    <div
      className={[
        "alam-chat-msg flex flex-col gap-1.5",
        isUser ? "items-end text-right" : "items-start text-left",
      ].join(" ")}
    >
      <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50 flex items-center gap-2">
        {!isUser && <span className="inline-block w-4 h-px bg-[#5a6a3a]" />}
        <span>{isUser ? t.chat.you : t.chat.bot}</span>
        {isUser && <span className="inline-block w-4 h-px bg-[#1a1a17]/40" />}
      </div>
      <div
        className={[
          "max-w-[88%] text-[15px] leading-[1.5] tracking-tight whitespace-pre-wrap",
          isUser
            ? "bg-[#1a1a17] text-[#faf8f3] px-4 py-3"
            : "border-l-2 border-[#5a6a3a] pl-4 pr-1 py-1",
        ].join(" ")}
      >
        {body}
      </div>
      {showCta && (
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="alam-chat-cta mt-2 ml-[2px] inline-flex items-center gap-3 bg-[#5a6a3a] text-[#faf8f3] pl-4 pr-3 py-3 border border-[#5a6a3a] hover:bg-[#1a1a17] hover:border-[#1a1a17] transition-colors max-w-[88%]"
        >
          <CalendarClock className="w-4 h-4 shrink-0 stroke-[1.5]" aria-hidden />
          <span className="flex flex-col items-start leading-tight">
            <span className="mono text-[10px] tracking-[0.3em] uppercase">
              {t.chat.cta.book}
            </span>
            <span className="text-[13px] tracking-tight opacity-85">
              {t.chat.cta.bookHint}
            </span>
          </span>
          <ArrowUpRight className="w-4 h-4 shrink-0 stroke-[1.5] ml-1" aria-hidden />
        </a>
      )}
    </div>
  );
}

function TypingBlock({ label }: { label: string }) {
  return (
    <div className="alam-chat-msg flex flex-col gap-1.5 items-start">
      <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/50 flex items-center gap-2">
        <span className="inline-block w-4 h-px bg-[#5a6a3a]" />
        <span>{label}</span>
      </div>
      <div className="border-l-2 border-[#5a6a3a] pl-4 py-1 flex items-center gap-1.5">
        <span className="alam-chat-dot" />
        <span className="alam-chat-dot" style={{ animationDelay: "0.15s" }} />
        <span className="alam-chat-dot" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}

function ChatWidgetStyles() {
  return (
    <style jsx global>{`
      .alam-chat-launcher {
        position: relative;
        display: grid;
        grid-template-columns: auto;
        gap: 8px;
        padding: 16px 18px 14px 18px;
        background: #faf8f3;
        color: #1a1a17;
        border: 1.5px solid #1a1a17;
        box-shadow: 6px 6px 0 0 #1a1a17;
        min-width: 220px;
        text-align: left;
        transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
          box-shadow 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
          background 0.3s ease;
        transform: rotate(-1deg);
      }
      .alam-chat-launcher:hover {
        transform: rotate(0deg) translate(-2px, -2px);
        box-shadow: 10px 10px 0 0 #5a6a3a;
        background: #faf8f3;
      }
      .alam-chat-launcher__headline {
        font-family: var(--font-serif);
        font-weight: 300;
        font-size: 20px;
        line-height: 1;
        letter-spacing: -0.01em;
      }
      .alam-chat-launcher__headline em {
        font-style: italic;
        color: #5a6a3a;
      }
      .alam-chat-launcher__cta {
        margin-top: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        font-size: 10px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: #1a1a17;
        border-top: 1px solid rgba(26, 26, 23, 0.2);
        padding-top: 8px;
      }
      .alam-chat-launcher__dot {
        position: absolute;
        top: 10px;
        right: 12px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #5a6a3a;
        box-shadow: 0 0 0 0 rgba(90, 106, 58, 0.55);
        animation: alam-chat-pulse 2s ease-in-out infinite;
      }

      .alam-chat-pulse {
        box-shadow: 0 0 0 0 rgba(90, 106, 58, 0.6);
        animation: alam-chat-pulse 1.8s ease-in-out infinite;
      }

      @keyframes alam-chat-pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(90, 106, 58, 0.5);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(90, 106, 58, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(90, 106, 58, 0);
        }
      }

      .alam-chat-msg {
        animation: alam-chat-reveal 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      }
      @keyframes alam-chat-reveal {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .alam-chat-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #5a6a3a;
        display: inline-block;
        animation: alam-chat-bounce 1.1s ease-in-out infinite;
      }
      @keyframes alam-chat-bounce {
        0%,
        80%,
        100% {
          transform: translateY(0);
          opacity: 0.35;
        }
        40% {
          transform: translateY(-4px);
          opacity: 1;
        }
      }

      @media (max-width: 640px) {
        .alam-chat-launcher {
          min-width: 0;
          padding: 14px 16px 12px 16px;
          box-shadow: 4px 4px 0 0 #1a1a17;
        }
        .alam-chat-launcher:hover {
          box-shadow: 7px 7px 0 0 #5a6a3a;
        }
        .alam-chat-launcher__headline {
          font-size: 17px;
        }
      }
    `}</style>
  );
}
