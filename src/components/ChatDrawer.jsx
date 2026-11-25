import { useCallback, useEffect, useRef, useState } from 'react';
import { ASK_AI, CERTIFICATIONS } from '../data/portfolio.js';

const API_URL = import.meta.env.VITE_RAG_API_URL || 'http://localhost:8000';
const SUBTITLE = "Kuldeep's portfolio assistant";
const OFFLINE_NOTE =
  "**Note:** As Nova's backend is deployed on Render, it sleeps within 15 minutes of inactivity, so answers may be affected in Offline Preview mode.";
const CONTACT_FOOTER = 'For further queries contact him at kuldeepsoni.dev@gmail.com.';
const WELCOME =
  "Hi! I'm Nova, Kuldeep's personal portfolio assistant. Ask me anything about his projects, skills, education, certifications or availability.";

// Nova's logo: a four-point nova star on the portfolio's orange accent.
// It always fills its parent box, so it can never be cropped.
function NovaLogo() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 64 64"
      style={{ display: 'block' }}
      role="img"
      aria-label="Nova logo"
    >
      <defs>
        <linearGradient id="nova-bg" x1="10" y1="4" x2="54" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f59a5c" />
          <stop offset="0.55" stopColor="#e06835" />
          <stop offset="1" stopColor="#b8441b" />
        </linearGradient>
        <radialGradient id="nova-glow" cx="32" cy="32" r="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#nova-bg)" />
      <circle cx="32" cy="32" r="29.5" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1" />
      <circle cx="32" cy="32" r="22" fill="url(#nova-glow)" />
      <path
        d="M32 9 C33.6 23 41 30.4 55 32 C41 33.6 33.6 41 32 55 C30.4 41 23 33.6 9 32 C23 30.4 30.4 23 32 9 Z"
        fill="#ffffff"
      />
      <path
        d="M48.5 11 C49.1 15.3 51 17.2 55.3 17.8 C51 18.4 49.1 20.3 48.5 24.6 C47.9 20.3 46 18.4 41.7 17.8 C46 17.2 47.9 15.3 48.5 11 Z"
        fill="#ffffff"
        fillOpacity="0.9"
      />
      <circle cx="16" cy="47.5" r="1.6" fill="#ffffff" fillOpacity="0.75" />
    </svg>
  );
}

// Escape everything (including quotes) first, then add a tiny bit of markdown.
function formatResponse(text) {
  if (!text) return '';
  let s = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`]+)`/g, '<code class="chat-code">$1</code>');
  s = s.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link">$1 ↗</a>'
  );
  s = s.replace(/^- (.*$)/gim, '<li style="margin-left:16px;">$1</li>');
   s = s.replace(/\n/g, '<br>');
  return s;
}

// Visitors should never see local-server instructions or a duplicate contact line
// (the contact line is added once, as the footer of every preview reply).
function cleanOffline(text) {
  let t = String(text || '');
  t = t.replace(/\[[^\]]*uvicorn[^\]]*\]\s*/gi, '');
  t = t.replace(/For (?:detailed questions|further details)[\s\S]*?kuldeepsoni\.dev@gmail\.com\**\.?/i, '');
  if (/uvicorn|agent\/backend/i.test(t)) t = '';
  t = t.trim();
  return t || "I can answer questions about Kuldeep's projects, skills, education, certifications and availability.";
}

// Offline Preview reply: Response, then a line break, then the Note, then the contact line.
function previewReply(q) {
  return `**Response:** ${offlineAnswer(q)}\n\n${OFFLINE_NOTE}\n\n${CONTACT_FOOTER}`;
}

function offlineAnswer(q) {
  const l = q.toLowerCase();
  const f = ASK_AI.fallback;
  if (l.includes('certif') || l.includes('badge') || l.includes('credential')) {
    return (
      'Kuldeep holds **' + CERTIFICATIONS.length + ' certificates**: ' +
      CERTIFICATIONS.map((c) => `${c.title} (${c.issuer}, ${c.date})`).join('; ') + '.'
    );
  }
  if (l.includes('project') || l.includes('strongest')) return cleanOffline(f.strongest);
  if (l.includes('intern') || l.includes('hire') || l.includes('available') || l.includes('job') || l.includes('educat')) return cleanOffline(f.internship);
  if (l.includes('rag') || l.includes('chroma') || l.includes('retrieval') || l.includes('skill')) return cleanOffline(f.rag);
  if (l.includes('saisa') || l.includes('attendance')) return cleanOffline(f.saisa);
  return cleanOffline(f.general);
}

export default function ChatDrawer({ open, onClose }) {
  const [messages, setMessages] = useState([{ role: 'assistant', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [online, setOnline] = useState(false);
  const [statusLabel, setStatusLabel] = useState(SUBTITLE);

  const historyRef = useRef([]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const onlineRef = useRef(false);

  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        onlineRef.current = true;
        setOnline(true);
        setStatusLabel(SUBTITLE);
        return true;
      }
    } catch (_) {
      /* backend asleep or offline */
    }
    onlineRef.current = false;
    setOnline(false);
    setStatusLabel(`${SUBTITLE} (Offline Preview mode)`);
    return false;
  }, []);

  // First check on load (this request also wakes a sleeping free-tier server).
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // Re-check often while asleep so the chat switches to live answers as soon as it is ready.
  useEffect(() => {
    const id = setInterval(checkHealth, online ? 30000 : 10000);
    return () => clearInterval(id);
  }, [checkHealth, online]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  const send = useCallback(
    async (question) => {
      const q = (question || '').trim();
      if (!q || busy) return;
      setMessages((m) => [...m, { role: 'user', text: q }]);
      setInput('');
      setBusy(true);

      const showPreview = () =>
        setMessages((m) => [
          ...m,
          { role: 'assistant', text: previewReply(q), sources: [{ id: 'kb', title: 'kuldeep_portfolio_knowledge_base_v2.md' }] },
        ]);

      try {
        const available = onlineRef.current || (await checkHealth());
        if (available) {
          const res = await fetch(`${API_URL}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: q, history: historyRef.current.slice(-6) }),
          });
          if (res.status === 429) {
            setMessages((m) => [
              ...m,
              { role: 'assistant', text: `Nova is receiving a lot of questions right now. ${CONTACT_FOOTER}` },
            ]);
            return;
          }
          if (!res.ok) throw new Error('ask failed');
          const data = await res.json();
          historyRef.current.push({ role: 'user', content: q }, { role: 'assistant', content: data.answer });
          setMessages((m) => [...m, { role: 'assistant', text: data.answer, sources: data.sources }]);
        } else {
          await new Promise((r) => setTimeout(r, 600));
          showPreview();
        }
      } catch (_) {
        // Any backend failure falls back to the knowledge-base preview, never a bare error.
        showPreview();
      } finally {
        setBusy(false);
      }
    },
    [busy, checkHealth]
  );

  return (
    <div className={`chat-drawer-container${open ? ' is-open' : ''}`} role="dialog" aria-label="Nova, Kuldeep Soni's personal portfolio assistant">
      <div className="chat-drawer-header">
        <div className="drawer-header-left">
          <div
            className="drawer-avatar"
            style={{
              width: 42,
              height: 42,
              minWidth: 42,
              flexShrink: 0,
              padding: 0,
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
              borderRadius: '50%',
              overflow: 'visible',
              display: 'block',
            }}
          >
            <NovaLogo />
          </div>
          <div className="drawer-header-meta">
            <h4>Nova</h4>
            <span>
              <span className="status-dot" style={{ background: online ? 'var(--badge-live)' : '#f59e0b' }} /> {statusLabel}
            </span>
          </div>
        </div>
        <button className="drawer-close-btn" onClick={onClose} aria-label="Close chat">×</button>
      </div>

      <div className="chat-drawer-messages" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role}${m.alert ? ' system-alert' : ''}`}>
            <span dangerouslySetInnerHTML={{ __html: formatResponse(m.text) }} />
            {m.sources?.length > 0 && (
              <div className="sources-accordion">
                <strong>Retrieved Sources:</strong>{' '}
                <span dangerouslySetInnerHTML={{ __html: formatResponse(m.sources.map((s) => s.title || s.id).join(', ')) }} />
              </div>
            )}
          </div>
        ))}
        {busy && (
          <div className="typing-indicator">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        )}
      </div>

      <div className="quick-prompts-bar">
        {ASK_AI.quickPrompts.map((p) => (
          <button key={p.label} className="prompt-chip" onClick={() => send(p.prompt)}>
            {p.label}
          </button>
        ))}
      </div>

      <form
        className="terminal-input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          placeholder="Ask Nova a question…"
          maxLength={500}
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-send" disabled={busy} aria-label="Send query">↗</button>
      </form>
    </div>
  );
}
