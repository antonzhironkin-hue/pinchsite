import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  "hero", "market", "how", "audience", "franchise", "invest",
  "founder", "rnd", "geo", "media", "video", "cta"
];

const FOUNDER_IMG = "/founder.jpg";

const FACTORY_IMG = "/factory.jpg";

/* ─── SVG Icon System ─── */
const G = "url(#iconGrad)"; // gradient ref shorthand
const GradDef = () => (
  <defs>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#E63926" />
      <stop offset="100%" stopColor="#FF6B35" />
    </linearGradient>
  </defs>
);
const svgProps = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

const Icons = {
  robot: (
    <svg {...svgProps}><GradDef />
      <rect x="4" y="6" width="16" height="13" rx="3" stroke={G} strokeWidth="1.5"/>
      <circle cx="9" cy="13" r="1.5" fill={G}/>
      <circle cx="15" cy="13" r="1.5" fill={G}/>
      <path d="M12 2v4" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="2" r="1" fill={G}/>
      <path d="M1 12h3M20 12h3" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  check: (
    <svg {...svgProps}><GradDef />
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke={G} strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-5" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  growth: (
    <svg {...svgProps}><GradDef />
      <path d="M3 20l5-5 4 4 9-11" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 8h4v4" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  compact: (
    <svg {...svgProps}><GradDef />
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={G} strokeWidth="1.5"/>
      <path d="M3 12h18M12 3v18" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 8l4 4m0 0l4-4m-4 4V8" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  patent: (
    <svg {...svgProps}><GradDef />
      <circle cx="12" cy="10" r="7" stroke={G} strokeWidth="1.5"/>
      <path d="M12 3v-1M12 17v1" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 17l-1 5h8l-1-5" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 10l2 2 3-4" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  handshake: (
    <svg {...svgProps}><GradDef />
      <path d="M2 11l4-4h3l4 4-2 2" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 11l-4-4h-3l-4 4 2 2" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 15l2 2 2-2 2 2 2-2" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  gear: (
    <svg {...svgProps}><GradDef />
      <circle cx="12" cy="12" r="3" stroke={G} strokeWidth="1.5"/>
      <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  wallet: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="14" rx="2.5" stroke="white" strokeWidth="1.5"/>
      <path d="M2 11h20" stroke="white" strokeWidth="1.5"/>
      <path d="M16 15.5h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 6V5a2 2 0 012-2h8a2 2 0 012 2v1" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  store: (
    <svg {...svgProps}><GradDef />
      <path d="M3 9l1.5-6h15L21 9" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 9c0 1.657 1 3 2.5 3S8 10.657 8 9m0 0c0 1.657 1 3 2.5 3S13 10.657 13 9m0 0c0 1.657 1 3 2.5 3S18 10.657 18 9m0 0c0 1.657 1.5 3 3 3" stroke={G} strokeWidth="1.5"/>
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke={G} strokeWidth="1.5"/>
      <rect x="9" y="16" width="6" height="6" rx="1" stroke={G} strokeWidth="1.5"/>
    </svg>
  ),
  building: (
    <svg {...svgProps}><GradDef />
      <rect x="3" y="2" width="12" height="20" rx="2" stroke={G} strokeWidth="1.5"/>
      <rect x="15" y="8" width="6" height="14" rx="1" stroke={G} strokeWidth="1.5"/>
      <path d="M7 6h2M7 10h2M7 14h2M18 12h1M18 16h1" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 22v-4H7v4" stroke={G} strokeWidth="1.5"/>
    </svg>
  ),
  wrench: (
    <svg {...svgProps}><GradDef />
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  academic: (
    <svg {...svgProps}><GradDef />
      <path d="M12 3L2 8l10 5 10-5-10-5z" stroke={G} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 8v7" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 10.5v5c0 2 3 4 6 4s6-2 6-4v-5" stroke={G} strokeWidth="1.5"/>
    </svg>
  ),
  refresh: (
    <svg {...svgProps}><GradDef />
      <path d="M1 4v6h6" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 20v-6h-6" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bolt: (
    <svg {...svgProps}><GradDef />
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  mic: (
    <svg {...svgProps}><GradDef />
      <rect x="9" y="2" width="6" height="11" rx="3" stroke={G} strokeWidth="1.5"/>
      <path d="M5 10a7 7 0 0014 0" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 17v5M8 22h8" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  article: (
    <svg {...svgProps}><GradDef />
      <rect x="3" y="2" width="18" height="20" rx="2" stroke={G} strokeWidth="1.5"/>
      <path d="M7 7h10M7 11h10M7 15h6" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  podium: (
    <svg {...svgProps}><GradDef />
      <path d="M12 2a3 3 0 100 6 3 3 0 000-6z" stroke={G} strokeWidth="1.5"/>
      <path d="M12 11v4M8 22v-5a4 4 0 018 0v5" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 15l4 2M20 15l-4 2" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  play: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="white"/>
    </svg>
  ),
};

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Badge ─── */
function Badge({ children }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 16px",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "100px",
      fontSize: "13px",
      letterSpacing: "0.02em",
      color: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(8px)",
      background: "rgba(255,255,255,0.04)",
    }}>
      <span style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #E63926, #FF6B35)",
        flexShrink: 0,
      }} />
      {children}
    </span>
  );
}

/* ─── Bullet ─── */
function Bullet({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #E63926, #FF6B35)",
        flexShrink: 0,
      }} />
      {children}
    </div>
  );
}

/* ─── CTA Button ─── */
function CTAButton({ children, variant = "primary", onClick }) {
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={onClick}
      style={{
        padding: isPrimary ? "16px 36px" : "14px 32px",
        background: isPrimary
          ? "linear-gradient(135deg, #E63926 0%, #FF6B35 100%)"
          : "transparent",
        border: isPrimary ? "none" : "1px solid rgba(255,255,255,0.15)",
        borderRadius: "12px",
        color: "#fff",
        fontSize: isPrimary ? "16px" : "15px",
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.01em",
        transition: "all 0.3s ease",
        fontFamily: "inherit",
      }}
      onMouseEnter={e => {
        if (isPrimary) {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 8px 32px rgba(230,57,38,0.4)";
        } else {
          e.target.style.background = "rgba(255,255,255,0.06)";
        }
      }}
      onMouseLeave={e => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "none";
        if (!isPrimary) e.target.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}

/* ─── Section Title ─── */
function SectionTitle({ label, title, subtitle, align = "center" }) {
  return (
    <FadeIn>
      <div style={{ textAlign: align, marginBottom: "56px" }}>
        {label && (
          <div style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#E63926",
            marginBottom: "16px",
          }}>{label}</div>
        )}
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#fff",
          margin: 0,
          maxWidth: align === "center" ? "700px" : "none",
          marginLeft: align === "center" ? "auto" : 0,
          marginRight: align === "center" ? "auto" : 0,
        }}>{title}</h2>
        {subtitle && (
          <p style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "16px",
            lineHeight: 1.6,
            maxWidth: "560px",
            marginLeft: align === "center" ? "auto" : 0,
            marginRight: align === "center" ? "auto" : 0,
          }}>{subtitle}</p>
        )}
      </div>
    </FadeIn>
  );
}

/* ─── Card ─── */
function Card({ icon, title, desc, delay = 0, accent = false }) {
  return (
    <FadeIn delay={delay}>
      <div style={{
        background: accent
          ? "linear-gradient(145deg, rgba(230,57,38,0.12) 0%, rgba(255,107,53,0.06) 100%)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${accent ? "rgba(230,57,38,0.25)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "20px",
        padding: "36px 28px",
        height: "100%",
        transition: "all 0.4s ease",
        cursor: "default",
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = accent ? "rgba(230,57,38,0.5)" : "rgba(255,255,255,0.15)";
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = accent ? "rgba(230,57,38,0.25)" : "rgba(255,255,255,0.06)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ fontSize: "32px", marginBottom: "18px", width: "32px", height: "32px" }}>{icon}</div>
        <h3 style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}>{title}</h3>
        <p style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.65,
          margin: 0,
        }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

/* ─── Step ─── */
function Step({ num, title, desc, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        padding: "28px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #E63926 0%, #FF6B35 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "18px",
          color: "#fff",
          flexShrink: 0,
        }}>{num}</div>
        <div>
          <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>{title}</h4>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Timeline Item ─── */
function TimelineItem({ year, text, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        position: "relative",
        paddingLeft: "24px",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: "8px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#E63926",
          boxShadow: "0 0 12px rgba(230,57,38,0.5)",
        }} />
        <div>
          {year && <div style={{ fontSize: "13px", fontWeight: 700, color: "#E63926", marginBottom: "4px" }}>{year}</div>}
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{text}</p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Stat ─── */
function Stat({ value, label, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #E63926, #FF6B35)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.1,
        }}>{value}</div>
        <div style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.45)",
          marginTop: "8px",
          letterSpacing: "0.02em",
        }}>{label}</div>
      </div>
    </FadeIn>
  );
}

/* ─── Country Pill ─── */
function CountryPill({ flag, name, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "100px",
        fontSize: "15px",
        color: "rgba(255,255,255,0.8)",
      }}>
        <span style={{ fontSize: "22px" }}>{flag}</span>
        {name}
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
  const [scrollY, setScrollY] = useState(0);

  const submitForm = async () => {
    if (!formData.name || !formData.email) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 2500);
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5aefd333-4c4a-4fde-839e-d1b855dc8089",
          subject: "Новая заявка с сайта Pinch Pita",
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message || "—",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollToCTA = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const px = "clamp(20px, 5vw, 120px)";

  return (
    <div style={{
      background: "#0A0A0A",
      color: "#fff",
      fontFamily: "'Manrope', 'SF Pro Display', -apple-system, sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(230,57,38,0.3); color: #fff; }
        input, textarea {
          font-family: 'Manrope', sans-serif;
        }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes gridMove { 0%{transform:translateY(0)} 100%{transform:translateY(60px)} }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrollY > 50 ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          fontSize: "18px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #E63926, #FF6B35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 800,
          }}>P</div>
          PINCH PITA
        </div>
        <button onClick={scrollToCTA} style={{
          padding: "10px 24px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.3s ease",
        }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.06)"}
        >Сотрудничество</button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: `140px ${px} 100px`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridMove 8s linear infinite",
          opacity: 0.5,
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,57,38,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(40px, 6vw, 80px)",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          flexWrap: "wrap",
        }}>
          {/* Left — Text */}
          <div style={{ flex: "1 1 480px", minWidth: "280px" }}>
            <FadeIn>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
                <Badge>Патент с 2021 года</Badge>
                <Badge>Партнёр: Coca-Cola</Badge>
                <Badge>5 лет разработки</Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 style={{
                fontSize: "clamp(36px, 5.5vw, 68px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}>
                Никита Дубинин
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{
                fontSize: "clamp(17px, 2.2vw, 22px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                maxWidth: "520px",
                lineHeight: 1.5,
                marginTop: "20px",
              }}>
                Инженер-изобретатель новой индустрии автоматизированного фастфуда
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.3)",
                marginTop: "14px",
                letterSpacing: "0.08em",
                fontWeight: 500,
              }}>
                РОССИЯ · КИТАЙ · СИНГАПУР · ВЕЛИКОБРИТАНИЯ
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div style={{ marginTop: "40px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <CTAButton onClick={scrollToCTA}>Обсудить сотрудничество</CTAButton>
                <CTAButton variant="secondary">Узнать больше ↓</CTAButton>
              </div>
            </FadeIn>
          </div>

          {/* Right — Photo */}
          <FadeIn delay={0.3} className="hero-photo-wrap">
            <div style={{
              flex: "0 1 400px",
              maxWidth: "420px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                inset: "-20%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(230,57,38,0.1) 0%, transparent 65%)",
                filter: "blur(50px)",
                zIndex: 0,
              }} />
              <img
                src={FOUNDER_IMG}
                alt="Pinch Pita — автомат"
                style={{
                  width: "100%",
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ NEW MARKET CATEGORY ═══ */}
      <section style={{ padding: `100px ${px}` }}>
        <SectionTitle
          label="Новая категория"
          title="Полностью автоматизированный фастфуд"
          subtitle="Мы создаём новый сегмент рынка — без персонала, без кухни, без ограничений"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}>
          <Card icon={Icons.robot} title="Без персонала" desc="Автомат полностью заменяет кухню и сотрудников" delay={0} />
          <Card icon={Icons.check} title="Стабильное качество" desc="Исключён человеческий фактор — каждый хот-дог идеален" delay={0.1} />
          <Card icon={Icons.growth} title="Масштабируемость" desc="Производство до 4 000 автоматов в месяц" delay={0.2} accent />
          <Card icon={Icons.compact} title="Компактность" desc="Всего 1 м² — подходит для любой локации" delay={0.3} />
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{
        padding: `100px ${px}`,
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <SectionTitle
            label="Как это работает"
            title="Полный цикл приготовления внутри автомата"
          />
          <Step num="1" title="Заказ" desc="Клиент выбирает позицию и оплачивает" delay={0} />
          <Step num="2" title="Запуск" desc="Автомат запускает процесс приготовления" delay={0.1} />
          <Step num="3" title="Приготовление" desc="Хот-дог готовится внутри системы по запатентованной технологии" delay={0.2} />
          <Step num="4" title="Выдача" desc="Готовый продукт выдаётся за считанные секунды" delay={0.3} />
        </div>
      </section>

      {/* ═══ AUDIENCE ═══ */}
      <section style={{ padding: `100px ${px}` }}>
        <SectionTitle
          label="Для кого"
          title="Проект для амбициозных партнёров"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
          {/* Investors */}
          <FadeIn delay={0}>
            <div style={{
              background: "linear-gradient(160deg, rgba(230,57,38,0.1) 0%, rgba(10,10,10,0.8) 50%)",
              border: "1px solid rgba(230,57,38,0.15)",
              borderRadius: "24px",
              padding: "40px 32px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #E63926, #FF6B35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                marginBottom: "24px",
              }}>{Icons.wallet}</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "16px" }}>Инвесторы</h3>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, flex: 1 }}>
                <Bullet>Глобальное масштабирование</Bullet>
                <Bullet>4 000 автоматов / месяц</Bullet>
                <Bullet>20 стран к 2026 году</Bullet>
                <Bullet>Запатентованная технология</Bullet>
              </div>
              <div style={{ marginTop: "28px" }}>
                <CTAButton onClick={scrollToCTA}>Стать инвестором</CTAButton>
              </div>
            </div>
          </FadeIn>

          {/* Franchise */}
          <FadeIn delay={0.1}>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "24px",
              padding: "40px 32px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                marginBottom: "24px",
              }}>{Icons.store}</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "16px" }}>Франчайзи</h3>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, flex: 1 }}>
                <Bullet>Запуск за 1 час</Bullet>
                <Bullet>Обслуживание раз в 3 дня</Bullet>
                <Bullet>Не требует персонала</Bullet>
                <Bullet>Площадь от 1 м²</Bullet>
              </div>
              <div style={{ marginTop: "28px" }}>
                <CTAButton variant="secondary" onClick={scrollToCTA}>Получить условия</CTAButton>
              </div>
            </div>
          </FadeIn>

          {/* Property owners */}
          <FadeIn delay={0.2}>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "24px",
              padding: "40px 32px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                marginBottom: "24px",
              }}>{Icons.building}</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "16px" }}>Владельцы площадей</h3>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, flex: 1 }}>
                <Bullet>Дополнительный доход</Bullet>
                <Bullet>Компактное размещение</Bullet>
                <Bullet>Полная автоматизация</Bullet>
                <Bullet>Привлечение трафика</Bullet>
              </div>
              <div style={{ marginTop: "28px" }}>
                <CTAButton variant="secondary" onClick={scrollToCTA}>Узнать подробности</CTAButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FRANCHISE ═══ */}
      <section style={{
        padding: `100px ${px}`,
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionTitle
            label="Франшиза"
            title="Готовая модель бизнеса с быстрым запуском"
          />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}>
            {[
              { val: "1 час", label: "Установка" },
              { val: "3 дня", label: "Цикл обслуживания" },
              { val: "0", label: "Сотрудников" },
              { val: "1 м²", label: "Площадь" },
            ].map((s, i) => <Stat key={i} value={s.val} label={s.label} delay={i * 0.1} />)}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center" }}>
              <CTAButton onClick={scrollToCTA}>Получить презентацию</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INVESTMENT ═══ */}
      <section style={{ padding: `100px ${px}` }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "linear-gradient(160deg, rgba(230,57,38,0.06) 0%, rgba(10,10,10,0.6) 40%)",
          border: "1px solid rgba(230,57,38,0.1)",
          borderRadius: "28px",
          padding: "clamp(40px, 6vw, 80px)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: "-50%",
            right: "-30%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(230,57,38,0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }} />
          <SectionTitle
            label="Инвестиции"
            title="Масштабирование производства и выход на глобальный рынок"
            align="left"
          />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "32px",
            marginBottom: "40px",
            position: "relative",
          }}>
            <Stat value="4 000" label="Автоматов в месяц" delay={0} />
            <Stat value="20+" label="Стран к 2026" delay={0.1} />
            <Stat value="5" label="Лет разработки" delay={0.2} />
          </div>
          <FadeIn delay={0.3}>
            <CTAButton onClick={scrollToCTA}>Запросить инвестиционные условия</CTAButton>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOUNDER ═══ */}
      <section style={{
        padding: `100px ${px}`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionTitle
            label="Основатель"
            title="История, которая стоит за технологией"
          />
          <div style={{
            display: "flex",
            gap: "clamp(32px, 5vw, 60px)",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}>
          {/* Left — Timeline */}
          <div style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            paddingLeft: "20px",
          }}>
            <TimelineItem text="В 19 лет — директор по развитию в строительной компании" delay={0} />
            <TimelineItem text="Быстрый рост: крупные проекты и амбициозные задачи" delay={0.05} />
            <TimelineItem text="Переосмысление пути и полный перезапуск с нуля" delay={0.1} />
            <TimelineItem year="2021" text="Начало разработки собственной технологии — прототипы в гараже" delay={0.2} />
            <TimelineItem text="Сотрудничество с учёными и научными институтами" delay={0.25} />
            <TimelineItem text="5 моделей, годы итераций и инженерных прорывов" delay={0.3} />
            <TimelineItem year="Сегодня" text="Финальный продукт — результат многолетней инженерной работы" delay={0.35} />
          </div>

          {/* Right — Photo */}
          <FadeIn delay={0.3}>
            <div style={{
              flex: "0 1 360px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                inset: "-15%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(230,57,38,0.08) 0%, transparent 60%)",
                filter: "blur(40px)",
                zIndex: 0,
              }} />
              <img
                src={FACTORY_IMG}
                alt="Производство Pinch Pita"
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                }}
              />
              <p style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
                marginTop: "12px",
                textAlign: "center",
                fontWeight: 500,
              }}>Производство вендинговых автоматов</p>
            </div>
          </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ R&D ═══ */}
      <section style={{
        padding: `100px ${px}`,
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <SectionTitle
          label="R&D"
          title="5 лет инженерной разработки"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          <Card icon={Icons.wrench} title="5 прототипов" desc="Каждая модель — шаг к совершенству" delay={0} />
          <Card icon={Icons.academic} title="Научные институты" desc="Работа с ведущими исследователями и лабораториями" delay={0.1} />
          <Card icon={Icons.refresh} title="Итерации" desc="Постоянное совершенствование каждого элемента системы" delay={0.2} />
          <Card icon={Icons.bolt} title="Инженерная сложность" desc="Уникальная запатентованная технология приготовления" delay={0.3} accent />
        </div>
      </section>

      {/* ═══ GEOGRAPHY ═══ */}
      <section style={{ padding: `100px ${px}` }}>
        <SectionTitle
          label="География"
          title="Международное развитие"
        />
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "14px",
          maxWidth: "800px",
          margin: "0 auto",
        }}>
          <CountryPill flag="🇷🇺" name="Россия" delay={0} />
          <CountryPill flag="🇰🇿" name="Казахстан" delay={0.05} />
          <CountryPill flag="🇨🇳" name="Китай" delay={0.1} />
          <CountryPill flag="🇸🇬" name="Сингапур" delay={0.15} />
          <CountryPill flag="🇬🇧" name="Великобритания" delay={0.2} />
          <CountryPill flag="🇦🇪" name="ОАЭ" delay={0.25} />
        </div>
        <FadeIn delay={0.3}>
          <p style={{
            textAlign: "center",
            marginTop: "32px",
            fontSize: "15px",
            color: "rgba(255,255,255,0.35)",
            fontWeight: 500,
          }}>Расширение до 20+ стран в 2026 году</p>
        </FadeIn>
      </section>

      {/* ═══ MEDIA ═══ */}
      <section style={{
        padding: `80px ${px}`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <SectionTitle
          label="Медиа"
          title="О проекте будут говорить"
        />
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}>
          {[
            { icon: Icons.mic, label: "Интервью" },
            { icon: Icons.article, label: "Публикации" },
            { icon: Icons.podium, label: "Выступления" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "16px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 600,
                padding: "20px 32px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
              }}>
                <span style={{ width: "24px", height: "24px", flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ VIDEO ═══ */}
      <section style={{ padding: `80px ${px}` }}>
        <SectionTitle
          label="Видео"
          title="Посмотрите систему в действии"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          maxWidth: "960px",
          margin: "0 auto",
        }}>
          {[
            { title: "Презентация продукта", videoId: "74UzAlq2gjU" },
            { title: "Автомат в работе",     videoId: "Xtn4qF6So-U" },
          ].map((item, i) => {
            const [playing, setPlaying] = useState(false);
            return (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "#111",
                      cursor: playing ? "default" : "pointer",
                    }}
                    onClick={() => !playing && setPlaying(true)}
                  >
                    {playing ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}?rel=0&modestbranding=1&autoplay=1`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      />
                    ) : (
                      <>
                        {/* YouTube thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                          }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        {/* Dark overlay */}
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(160deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)",
                          transition: "background 0.3s ease",
                        }} />
                        {/* Play button */}
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <div style={{
                            width: "68px",
                            height: "68px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #E63926, #FF6B35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                            boxShadow: "0 8px 32px rgba(230,57,38,0.4)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = "scale(1.1)";
                              e.currentTarget.style.boxShadow = "0 12px 40px rgba(230,57,38,0.6)";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "0 8px 32px rgba(230,57,38,0.4)";
                            }}
                          >{Icons.play}</div>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    paddingLeft: "4px",
                  }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#E63926",
                      boxShadow: "0 0 8px rgba(230,57,38,0.5)",
                    }} />
                    <span style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 600,
                    }}>{item.title}</span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section id="cta-section" style={{
        padding: `100px ${px}`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute",
          bottom: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,57,38,0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }} />

        <div style={{
          maxWidth: "520px",
          margin: "0 auto",
          position: "relative",
        }}>
          <SectionTitle
            label="Связаться"
            title="Обсудить сотрудничество"
            subtitle="Оставьте заявку для получения условий франшизы или инвестиционного предложения"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { key: "name", placeholder: "Имя", type: "text" },
              { key: "email", placeholder: "Email", type: "email" },
            ].map(f => (
              <FadeIn key={f.key} delay={0.1}>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={formData[f.key]}
                  onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    color: "#fff",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(230,57,38,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </FadeIn>
            ))}
            <FadeIn delay={0.2}>
              <textarea
                placeholder="Сообщение"
                rows={4}
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: "15px",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(230,57,38,0.4)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <CTAButton onClick={submitForm}>
                {formStatus === "sending" ? "Отправка..." : 
                 formStatus === "success" ? "Отправлено!" : 
                 formStatus === "error" ? "Заполните имя и email" : 
                 "Отправить"}
              </CTAButton>
              {formStatus === "success" && (
                <p style={{
                  marginTop: "16px",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                }}>Спасибо! Мы свяжемся с вами в ближайшее время.</p>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: `40px ${px}`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>
          © 2026 Pinch Pita — All rights reserved
        </div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>
          Автоматизированные вендинговые системы
        </div>
      </footer>
    </div>
  );
}
