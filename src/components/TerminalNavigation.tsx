"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Terminal Navigation — اضغط `/` في أي مكان، تفتح نافذة terminal.
 *
 * Commands:
 *   help         عرض الأوامر المتاحة
 *   about        انتقل لقسم About
 *   skills       انتقل لقسم Skills
 *   experience   انتقل لقسم Experience
 *   projects    انتقل لقسم Projects
 *   contact      انتقل لقسم Contact
 *   whoami       نبذة عن أحمد
 *   ls           قايمة الأقسام
 *   clear        امسح الـ terminal
 *   sudo         🤫
 *
 * - Up/Down arrows للتنقل في تاريخ الأوامر
 * - ESC للإغلاق
 * - مش بـ يفتح لو المستخدم بـ يكتب في input/textarea
 */
type Cmd = {
  name: string;
  description: string;
  run: (args: string[], print: (text: string) => void) => void;
};

const COMMANDS: Cmd[] = [
  {
    name: "help",
    description: "Show available commands",
    run: (_, print) => {
      print("Available commands:");
      COMMANDS.forEach(c => print(`  ${c.name.padEnd(12)} ${c.description}`));
    },
  },
  {
    name: "about",
    description: "Go to About section",
    run: (_, print) => {
      print("→ navigating to /about");
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("achievement", { detail: { id: "used_terminal" } }));
    },
  },
  {
    name: "skills",
    description: "Go to Skills section",
    run: (_, print) => {
      print("→ navigating to /skills");
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("achievement", { detail: { id: "used_terminal" } }));
    },
  },
  {
    name: "experience",
    description: "Go to Experience section",
    run: (_, print) => {
      print("→ navigating to /experience");
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("achievement", { detail: { id: "used_terminal" } }));
    },
  },
  {
    name: "projects",
    description: "Go to Projects section",
    run: (_, print) => {
      print("→ navigating to /projects");
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("achievement", { detail: { id: "used_terminal" } }));
    },
  },
  {
    name: "contact",
    description: "Go to Contact section",
    run: (_, print) => {
      print("→ navigating to /contact");
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("achievement", { detail: { id: "used_terminal" } }));
    },
  },
  {
    name: "whoami",
    description: "About Ahmed",
    run: (_, print) => {
      print("ahmed_ezzat_allam");
      print("  Computer Science & AI Undergraduate");
      print("  Zewail City of Science and Technology");
      print("  Building intelligent systems, automation and data-driven products");
    },
  },
  {
    name: "ls",
    description: "List sections",
    run: (_, print) => {
      print("about/   skills/   experience/   projects/   contact/");
    },
  },
  {
    name: "clear",
    description: "Clear terminal",
    run: (_, print) => {
      // لما الـ terminal بـ يشوف "clear" في الـ history، بـ يمسحها
      print("__CLEAR__");
    },
  },
  {
    name: "sudo",
    description: "??",
    run: (args, print) => {
      if (args.length === 0) {
        print("nice try. press ↑↑↓↓←→←→BA somewhere else. 👀");
      } else {
        print(`sudo: ${args.join(" ")}: command not found (but nice try)`);
      }
    },
  },
];

export default function TerminalNavigation() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ text: string; isPrompt?: boolean }[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // فتح بالـ `/` و إغلاق بـ ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA";

      if (e.key === "/" && !inInput && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus لما تفتح
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setInput("");
      setHistIdx(-1);
    }
  }, [open]);

  // Auto-scroll للآخر
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [lines]);

  const print = (text: string) => {
    setLines(prev => {
      if (text === "__CLEAR__") return [];
      return [...prev, { text }];
    });
  };

  const execute = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setLines(prev => [...prev, { text: `$ ${trimmed}`, isPrompt: true }]);
    setCmdHistory(h => [...h, trimmed]);
    setHistIdx(-1);

    const [name, ...args] = trimmed.split(/\s+/);
    const command = COMMANDS.find(c => c.name === name);
    if (command) {
      command.run(args, print);
    } else {
      print(`command not found: ${name}. type "help" for available commands.`);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      if (cmdHistory.length > 0) {
        setHistIdx(newIdx);
        setInput(cmdHistory[newIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const newIdx = histIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4 pb-4"
      onClick={() => setOpen(false)}
      style={{ animation: "fade-in 200ms ease-out" }}
    >
      <div
        className="w-full max-w-2xl h-[60vh] md:h-[420px] bg-[#0B0B0B] border border-white/15 flex flex-col font-mono text-sm shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ borderRadius: 8, animation: "terminal-pop 200ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-white/50 text-xs uppercase tracking-widest ml-2">
              ahmed@portfolio: ~
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/40 hover:text-white text-xs uppercase tracking-widest"
          >
            [ESC]
          </button>
        </div>

        {/* History */}
        <div ref={historyRef} className="flex-1 overflow-y-auto p-4 text-white/85 space-y-1 leading-relaxed">
          {lines.length === 0 && (
            <>
              <p className="text-white/50">Welcome to the terminal. Type "help" for commands.</p>
              <p className="text-white/30 text-xs mt-2">Hint: try /, help, about, whoami, ls, sudo</p>
            </>
          )}
          {lines.map((line, i) => (
            <p
              key={i}
              className={line.isPrompt ? "text-red-500" : ""}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {line.text}
            </p>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
          <span className="text-red-500 font-bold">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
            data-cursor="link"
          />
        </form>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes terminal-pop {
          from { opacity: 0; transform: scale(0.96) translateY(20px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
      `}</style>
    </div>
  );
}
