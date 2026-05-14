import { useState, useEffect, useRef, useCallback } from "react";
import {
  SiReact,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiExpress,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiFirebase,
  SiGithubactions,
  SiPostman,
  SiFigma
} from "react-icons/si";
import {
  FaAws,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaVuejs,
  FaBootstrap,
  FaDatabase,
  FaCloud,
  FaServer,
  FaGithub,
  FaGitAlt,
  FaCode,
  FaTools,
  FaPaintBrush,
  FaRobot,
  FaLinux
} from "react-icons/fa";

/* ─── DATA ─────────────────────────────────────────────────── */
const NAV = ["Home","About","Skills","Projects","Resume","Certifications","Contact"];

const SKILLS = {
  "Languages":      { icon:"⟨/⟩", color:"#00d4ff", items:["Python","JavaScript","TypeScript","Java","C++","SQL","Rust"] },
  "Frontend":       { icon:"◻",   color:"#a855f7", items:["React","Next.js","Tailwind CSS","HTML5","CSS3","Redux","Framer Motion"] },
  "Backend":        { icon:"⚙",   color:"#10b981", items:["Node.js","Express","FastAPI","Django","REST APIs","GraphQL","gRPC"] },
  "Databases":      { icon:"◫",   color:"#f59e0b", items:["PostgreSQL","MongoDB","MySQL","Redis","Firebase","Supabase","Pinecone"] },
  "AI / ML":        { icon:"◉",   color:"#ec4899", items:["TensorFlow","PyTorch","LangChain","OpenAI API","HuggingFace","Scikit-learn"] },
  "Tools & DevOps": { icon:"◈",   color:"#06b6d4", items:["Git","Docker","AWS","Vercel","Linux","Figma","GitHub Actions"] },
};

const PROJECTS = [
  { name:"CoCo Net",   desc:"As a campus project, I developed the CoCo Net mobile application to address the ongoing issues caused by the economic crisis in Sri Lanka, particularly the coconut shortage. Due to the lack of proper communication and supply tracking, both farmers and distributors face difficulties in managing coconut availability and pricing. \n This application was designed to solve these problems by providing a centralized digital platform for real-time stock updates, location-based tracking, and direct interaction between farmers and distributors. Currently, there is no dedicated application focused on this specific purpose, and this project aims to be one of the first solutions to bridge that gap.", tech:["Android","Java","Android Studio","Kotlin DSL","AndroidX","Material UI","Firebase","Firebase Authentication","Cloud Firestore","Firebase Storage","Firebase Analytics","Google Maps SDK","Google Location Services","Google Places API","OkHttp","Gson","Glide"], github:"https://github.com/MohomadSajid-Dev/CoCo-Net", demo:"#", accent:"#f59e0b", tag:"Mobile" },
  { name:"Mini Mates", desc:"This project was developed as part of our coursework in collaboration with a real client from Sussex College, Anuradhapura. Working as a team of five, we gathered requirements, built the system, and successfully received feedback from the client. It was a web-based Preschool Management System that streamlines student management, attendance, fee handling, and communication. The system improves efficiency, reduces manual work, and provides a centralized, user-friendly experience. ", tech:["ReactJS", "Tailwind CSS", "Vite", "Recharts", "Node.js", "Express.js", "PostgreSQL", "Firebase Authenthication","Vercel","Redis"], github:"https://github.com/MohomadSajid-Dev/Mini-Mates.git", demo:"#", accent:"#00d4ff", tag:"Full Stack", tag:"Web" },
];

const CONTACT = [
  { label:"Email",    value:"mohomadsajid.dev@gmail.com", href:"mailto:mohomadsajid.dev@gmail.com",  svg:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label:"GitHub",   value:"github.com/MohomadSajid-Dev",    href:"https://github.com/MohomadSajid-Dev",                          svg:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
  { label:"LinkedIn", value:"www.linkedin.com/in/mohomadsajid",   href:"https://www.linkedin.com/in/mohomadsajid",                          svg:"M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
  { label:"WhatsApp", value:"077 213 6949",               href:"https://wa.me/94772136949",   svg:"M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" },
];

const EDUCATION = [
  { year:"2023", title:"Bachelor of Software Engineering Honours", org:"University Name · Open University of Sri Lanka", desc:"I am a third year undergraduate student seeking to enter the software industry to undertake my internship. I aim to gain practical experience, enhance my technical and professional skills and apply my academic knowledge in real world environments to support my future growth and long term career success" },
  { year:"2020", title:"G.C.E. Advanced Level", org:"School Name · A / K. B. Rathnayeka College", desc:"Completed GCE A/Ls in the Arts stream, with strong skills in critical thinking, communication and analytical skills." },
  { year:"2017", title:"G.C.E. Ordinary Level", org:"School Name · A / K. B. Rathnayeka College", desc:"Completed GCE O/L examinations with commendable results in all subjects, building a strong foundation for further studies." },
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    department: "Dept. of Information Technology · CODL",
    year: "2024",
    code: "OofZWdHCW9",
    color: "#00d4ff",
    icon: "🌐",
    tag: "Design",
    verifyUrl: "https://open.uom.lk/verify",
  },
  {
    id: 2,
    title: "Java Intermediate",
    issuer: "SoloLearn",
    department: "Certificate CC-XHJT2E5E",
    year: "2024",
    code: "CC-XHJT2E5E",
    color: "#f59e0b",
    icon: "☕",
    tag: "Language",
    verifyUrl: "https://www.sololearn.com/certificates/CC-XHJT2E5E",
  },
  {
    id: 3,
    title: "Python Language",
    issuer: "SoloLearn",
    department: "Recognized Online Course",
    year: "2024",
    code: "SL-PYTHON",
    color: "#60a5fa",
    icon: "🐍",
    tag: "Language",
    verifyUrl: "https://www.sololearn.com",
  },
  {
    id: 4,
    title: "Quality Assurance",
    issuer: "SoloLearn",
    department: "Recognized Online Course",
    year: "2024",
    code: "SL-QA",
    color: "#10b981",
    icon: "✅",
    tag: "Testing",
    verifyUrl: "https://www.sololearn.com",
  },
  {
    id: 5,
    title: "C Language",
    issuer: "SoloLearn",
    department: "Recognized Online Course",
    year: "2024",
    code: "SL-C",
    color: "#a855f7",
    icon: "⚙️",
    tag: "Language",
    verifyUrl: "https://www.sololearn.com",
  },
  {
    id: 6,
    title: "Diploma in Information Technology",
    issuer: "Esoft Metro Campus",
    department: "Merit Distinction · 1 Year Program",
    year: "2022",
    code: "ESOFT-DIT-2022",
    color: "#ec4899",
    icon: "🎓",
    tag: "Diploma",
    verifyUrl: "#",
  },
  {
    id: 7,
    title: "Diploma in English",
    issuer: "Rajarata University of Sri Lanka",
    department: "Merit Distinction · 1 Year Program",
    year: "2022",
    code: "RUSL-ENG-2022",
    color: "#06b6d4",
    icon: "📖",
    tag: "Language",
    verifyUrl: "#",
  },
  {
    id: 8,
    title: "Diploma in English",
    issuer: "Esoft Metro Campus",
    department: "Merit Distinction · 1 Year Program",
    year: "2022",
    code: "ESOFT-ENG-2022",
    color: "#f97316",
    icon: "✍️",
    tag: "Language",
    verifyUrl: "#",
  },
  {
    id: 9,
    title: "Information Technology Project",
    issuer: "Nena Piyesa",
    department: "Higher Certificate Training Program",
    year: "2011",
    code: "NP-IT-2011",
    color: "#84cc16",
    icon: "💡",
    tag: "IT",
    verifyUrl: "#",
  },
];

const GLOBE_TECH = [
  { name: "Java", Icon: FaJava, color: "#f59e0b" },
  { name: "JavaScript", Icon: SiJavascript, color: "#facc15" },
  { name: "TypeScript", Icon: SiTypescript, color: "#38bdf8" },
  { name: "Python", Icon: SiPython, color: "#60a5fa" },
  { name: "HTML5", Icon: FaHtml5, color: "#fb7185" },
  { name: "CSS3", Icon: FaCss3Alt, color: "#0ea5e9" },
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Vue.js", Icon: FaVuejs, color: "#34d399" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#22c55e" },
  { name: "Express", Icon: SiExpress, color: "#cbd5e1" },
  { name: "TailwindCSS", Icon: SiTailwindcss, color: "#22d3ee" },
  { name: "Bootstrap", Icon: FaBootstrap, color: "#a78bfa" },
  { name: "MongoDB", Icon: SiMongodb, color: "#22c55e" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#60a5fa" },
  { name: "MySQL", Icon: FaDatabase, color: "#38bdf8" },
  { name: "Firebase", Icon: SiFirebase, color: "#f59e0b" },
  { name: "Cloudinary", Icon: FaCloud, color: "#0ea5e9" },
  { name: "REST APIs", Icon: FaServer, color: "#14b8a6" },
  { name: "AWS", Icon: FaAws, color: "#f59e0b" },
  { name: "Vercel", Icon: FaCode, color: "#e2e8f0" },
  { name: "Render", Icon: FaCode, color: "#c084fc" },
  { name: "Neon", Icon: FaCode, color: "#22d3ee" },
  { name: "Docker", Icon: SiDocker, color: "#38bdf8" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "#818cf8" },
  { name: "Git", Icon: SiGit, color: "#f97316" },
  { name: "GitHub", Icon: FaGithub, color: "#e2e8f0" },
  { name: "VS Code", Icon: FaCode, color: "#38bdf8" },
  { name: "IntelliJ IDEA", Icon: FaCode, color: "#f472b6" },
  { name: "Eclipse", Icon: FaCode, color: "#a78bfa" },
  { name: "Android Studio", Icon: FaCode, color: "#4ade80" },
  { name: "Postman", Icon: SiPostman, color: "#fb923c" },
  { name: "Figma", Icon: SiFigma, color: "#f472b6" },
  { name: "Canva", Icon: FaPaintBrush, color: "#22d3ee" },
  { name: "Photoshop", Icon: FaPaintBrush, color: "#60a5fa" },
  { name: "Selenium", Icon: FaTools, color: "#10b981" },
  { name: "JMeter", Icon: FaTools, color: "#fbbf24" },
  { name: "Linux", Icon: FaLinux, color: "#facc15" },
  { name: "GitHub Copilot", Icon: FaRobot, color: "#a3e635" },
  { name: "ChatGPT", Icon: FaRobot, color: "#34d399" },
  { name: "Claude", Icon: FaRobot, color: "#f59e0b" },
  { name: "Cursor", Icon: FaCode, color: "#67e8f9" },
  { name: "Perplexity", Icon: FaCode, color: "#22d3ee" }
];

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useScrollDirection() {
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) > 4) {
        setDirection(delta > 0 ? "down" : "up");
        lastY = currentY;
      }

      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return direction;
}

function useActiveSection() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const ids = NAV.map(n => n.toLowerCase());
    const headerOffset = 80; // approx navbar height + breathing room

    let raf = 0;
    const update = () => {
      const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
      if (!sections.length) return;

      let current = sections[0];
      for (const el of sections) {
        const top = el.getBoundingClientRect().top;
        if (top - headerOffset <= 0) current = el;
      }

      setActive(current.id.charAt(0).toUpperCase() + current.id.slice(1));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

/* ─── COMPONENTS ─────────────────────────────────────────────── */

function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, nodes, raf;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      nodes = Array.from({ length: 90 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
        r: Math.random() * 2 + .5, pulse: Math.random() * Math.PI * 2,
        color: Math.random() > .6 ? [0,212,255] : Math.random() > .5 ? [168,85,247] : [16,185,129],
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += .02;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        const alpha = .3 + Math.sin(n.pulse) * .2;
        const [r,g,b] = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * .08})`;
        ctx.fill();
      });
      nodes.forEach((a, i) => nodes.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          const t = 1 - d / 130;
          const [r,g,b2] = a.color;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${r},${g},${b2},${t * .18})`;
          ctx.lineWidth = t * 1.2;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0, opacity:0.6 }} />;
}

function CursorFX() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -300, y: -300 });
  const ring_pos = useRef({ x: -300, y: -300 });
  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * .12;
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * .12;
      if (dot.current) { dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`; }
      if (ring.current) { ring.current.style.transform = `translate(${ring_pos.current.x - 20}px, ${ring_pos.current.y - 20}px)`; }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position:"fixed", top:0, left:0, width:8, height:8, background:"#00d4ff", borderRadius:"50%", pointerEvents:"none", zIndex:99999, mixBlendMode:"screen", willChange:"transform" }} />
      <div ref={ring} style={{ position:"fixed", top:0, left:0, width:40, height:40, border:"1.5px solid rgba(0,212,255,0.5)", borderRadius:"50%", pointerEvents:"none", zIndex:99998, willChange:"transform" }} />
    </>
  );
}

function ScanLine() {
  return (
    <div style={{
      position:"fixed", inset:0, pointerEvents:"none", zIndex:50, overflow:"hidden",
      background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)",
    }} />
  );
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const direction = useScrollDirection();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${direction === "down" ? "32px" : "-32px"})`,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      willChange: "opacity, transform",
      ...style,
    }}>
      {children}
    </div>
  );
}

function GlowCard({ children, accent = "#00d4ff", style = {}, className = "" }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={className}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? accent + "55" : "rgba(255,255,255,0.07)"}`,
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        transition: "all 0.4s cubic-bezier(.23,1,.32,1)",
        transform: hov ? "translateY(-6px) scale(1.005)" : "none",
        boxShadow: hov ? `0 20px 60px ${accent}18, 0 0 0 1px ${accent}22` : "none",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {hov && <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 0%, ${accent}08 0%, transparent 60%)`, pointerEvents:"none" }} />}
      {children}
    </div>
  );
}

function TypeWriter({ phrases, speed = 55, pauseDuration = 1800 }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const current = phrases[phraseIndex];
    if (!isDeleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayed.length === current.length) {
      const t = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex(i => (i + 1) % phrases.length);
    }
  }, [displayed, isDeleting, phraseIndex, phrases, speed, pauseDuration]);

  return <span>{displayed}<span style={{ opacity: cursor ? 1 : 0, color:"#00d4ff" }}>_</span></span>;
}

function SkillBar({ level, color }) {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  return (
    <div ref={ref} style={{ height:3, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden", marginTop:8 }}>
      <div style={{
        height:"100%", borderRadius:2,
        background: `linear-gradient(90deg, ${color}, ${color}99)`,
        width: vis ? `${level}%` : "0%",
        transition: "width 1.2s cubic-bezier(.23,1,.32,1) 0.3s",
        boxShadow: vis ? `0 0 8px ${color}88` : "none",
      }} />
    </div>
  );
}

function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const vis = useIntersection(ref);
  useEffect(() => {
    if (!vis) return;
    const dur = 1600, start = performance.now();
    const step = t => {
      const p = Math.min((t - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function HexGrid() {
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04, pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hex" x="0" y="0" width="56" height="64" patternUnits="userSpaceOnUse">
          <polygon points="28,2 52,16 52,48 28,62 4,48 4,16" fill="none" stroke="#00d4ff" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
  const scramble = str => str.split("").map((c, i) =>
    glitch && Math.random() > .7 ? chars[Math.floor(Math.random() * chars.length)] : c
  ).join("");
  return <span>{glitch ? scramble(text) : text}</span>;
}

/* ─── 3D SKILLS GLOBE SECTION ────────────────────────────────── */
function FloatingSkillsSection({ dark, sub, accent, border }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const iconRefs = useRef([]);
  const rafRef = useRef(null);
  const dragRef = useRef({ down: false, x: 0, y: 0 });
  const hoverIndexRef = useRef(-1);
  const projectedRef = useRef([]);
  const motionRef = useRef({ rotX: -0.18, rotY: 0.25, velX: 0.0016, velY: 0.0022 });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");

    const points = GLOBE_TECH.map((tech, i) => {
      const y = 1 - (i / (GLOBE_TECH.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { ...tech, x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
    });

    let w = 0;
    let h = 0;
    let dpr = Math.max(window.devicePixelRatio || 1, 1);

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      dpr = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rotatePoint = (p, ax, ay) => {
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);

      const y1 = p.y * cx - p.z * sx;
      const z1 = p.y * sx + p.z * cx;
      const x2 = p.x * cy + z1 * sy;
      const z2 = -p.x * sy + z1 * cy;
      return { x: x2, y: y1, z: z2 };
    };

    const draw = () => {
      const { velX, velY } = motionRef.current;
      motionRef.current.rotX += velX;
      motionRef.current.rotY += velY;
      motionRef.current.velX *= 0.985;
      motionRef.current.velY *= 0.985;

      if (!dragRef.current.down) {
        motionRef.current.velY += 0.000035;
      }

      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.56;
      const globeR = Math.min(w, h) * 0.3;

      const coreGradient = ctx.createRadialGradient(cx, cy, globeR * 0.1, cx, cy, globeR * 1.05);
      coreGradient.addColorStop(0, "rgba(0,212,255,0.23)");
      coreGradient.addColorStop(0.55, "rgba(95,58,255,0.08)");
      coreGradient.addColorStop(1, "rgba(10,14,30,0)");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, globeR * 1.1, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 6; i += 1) {
        const ringR = globeR * (0.55 + i * 0.1);
        ctx.beginPath();
        ctx.ellipse(cx, cy, ringR, ringR * 0.36, 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const projected = points.map((p, index) => {
        const rot = rotatePoint(p, motionRef.current.rotX, motionRef.current.rotY);
        const depth = (rot.z + 1) / 2;
        const scale = 0.56 + depth * 0.9;
        return {
          index,
          ...points[index],
          x: cx + rot.x * globeR * 1.05,
          y: cy + rot.y * globeR * 1.05,
          z: rot.z,
          depth,
          scale
        };
      });
      projectedRef.current = projected;

      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < globeR * 0.62) {
            const alpha = ((1 - dist / (globeR * 0.62)) * (a.depth + b.depth)) / 6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(103,232,249,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      projected.sort((a, b) => a.depth - b.depth).forEach((p) => {
        const isHovered = hoverIndexRef.current === p.index;
        const node = iconRefs.current[p.index];
        if (!node) return;
        const yFloat = Math.sin(Date.now() * 0.002 + p.index) * 1.4;
        node.style.left = `${p.x}px`;
        node.style.top = `${p.y + yFloat}px`;
        node.style.transform = `translate(-50%, -50%) scale(${p.scale * (isHovered ? 1.16 : 1)})`;
        node.style.zIndex = `${Math.floor(p.depth * 100)}`;
        node.style.opacity = `${0.28 + p.depth * 0.9}`;
        node.style.borderColor = isHovered ? `${p.color}` : "rgba(103,232,249,0.34)";
        node.style.boxShadow = isHovered
          ? `0 0 24px ${p.color}88, 0 0 48px ${p.color}44`
          : "0 0 18px rgba(0,212,255,0.28)";
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(3,7,18,0.78)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,212,255,0.55)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = "#67e8f9";
      ctx.font = "700 11px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SKILLS", cx, cy + 0.5);

      rafRef.current = requestAnimationFrame(draw);
    };

    const updateHover = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      let hit = -1;
      let best = 99999;
      projectedRef.current.forEach((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const r = 19 * p.scale;
        if (d < r && d < best) {
          hit = p.index;
          best = d;
        }
      });
      hoverIndexRef.current = hit;
      setHovered(hit >= 0 ? { ...GLOBE_TECH[hit], x: x + 20, y: y - 16 } : null);
    };

    const onDown = (e) => {
      dragRef.current = { down: true, x: e.clientX, y: e.clientY };
      motionRef.current.velX *= 0.6;
      motionRef.current.velY *= 0.6;
    };
    const onMove = (e) => {
      updateHover(e.clientX, e.clientY);
      if (!dragRef.current.down) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      dragRef.current.x = e.clientX;
      dragRef.current.y = e.clientY;
      motionRef.current.rotY += dx * 0.0045;
      motionRef.current.rotX += dy * 0.0038;
      motionRef.current.velY = dx * 0.00055;
      motionRef.current.velX = dy * 0.00048;
    };
    const onUp = () => { dragRef.current.down = false; };
    const onLeave = () => {
      dragRef.current.down = false;
      hoverIndexRef.current = -1;
      setHovered(null);
    };

    resize();
    draw();
    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="skills" style={{ padding: "120px clamp(16px,5%,80px)", maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <div className="sec-label" style={{ color: "#a855f7", marginBottom: 14 }}></div>
          <h2 className="sec-title"><span className="grad-text">Skills &</span> Technologies</h2>
          <p style={{ color: sub, margin: "14px auto 0", fontSize: 15, maxWidth: 620 }}>
            Below are the some skills and technologies I have learned and actively use to grow and develop my professional career.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div
          className="skills-globe-wrap"
          ref={wrapRef}
          style={{
            height: 560,
            borderRadius: 34,
            border: `1px solid ${border}`,
            background: dark
              ? "radial-gradient(circle at 50% 40%, rgba(25,40,95,0.35), rgba(5,9,24,0.86) 58%, rgba(2,4,16,0.98) 100%)"
              : "radial-gradient(circle at 50% 40%, rgba(165,236,255,0.45), rgba(206,227,248,0.78) 58%, rgba(232,242,255,0.94) 100%)",
            position: "relative",
            overflow: "hidden",
            boxShadow: dark ? "0 25px 90px rgba(0,0,0,0.55), inset 0 0 140px rgba(0,212,255,0.08)" : "0 20px 55px rgba(15, 23, 42, 0.08)"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(rgba(148,163,184,0.35) 0.8px, transparent 0.8px)",
              backgroundSize: "16px 16px",
              opacity: dark ? 0.18 : 0.14,
              pointerEvents: "none"
            }}
          />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {GLOBE_TECH.map((t, i) => (
              <div
                key={t.name}
                ref={(el) => { iconRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(5,10,25,0.56)",
                  border: "1px solid rgba(103,232,249,0.34)",
                  color: t.color,
                  transform: "translate(-50%, -50%)",
                  transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                  backdropFilter: "blur(8px)"
                }}
              >
                <t.Icon size={16} />
              </div>
            ))}
          </div>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }} />
          {hovered && (
            <div
              style={{
                position: "absolute",
                left: hovered.x,
                top: hovered.y,
                pointerEvents: "none",
                background: "rgba(2,6,23,0.9)",
                border: `1px solid ${hovered.color}`,
                borderRadius: 12,
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 700,
                color: "#e2e8f0",
                boxShadow: `0 0 24px ${hovered.color}55`
              }}
            >
              {hovered.name}
            </div>
          )}

          <div style={{ position: "absolute", left: 22, bottom: 22, color: sub, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: ".08em" }}>
            DRAG_TO_ROTATE · HOVER_TO_INSPECT
          </div>
          <div style={{ position: "absolute", right: 20, top: 20, display: "flex", gap: 6 }}>
            {[accent, "#a855f7", "#10b981"].map((c) => (
              <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: `0 0 14px ${c}` }} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function CertificationsSection({ dark, sub, accent, border, txt, bg }) {
  return (
    <section
      id="certifications"
      style={{
        padding: "120px clamp(16px,5%,80px)",
        maxWidth: 1300,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ── Header ── */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            className="sec-label"
            style={{ color: "#06b6d4", marginBottom: 14 }}
          >
            
          </div>
          <h2 className="sec-title">
            <span className="grad-text">Verified</span> Credentials
          </h2>
        </div>
      </FadeIn>

      {/* ── Cards grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          gap: 20,
        }}
      >
        {CERTIFICATIONS.map((cert, i) => (
          <FadeIn key={cert.id} delay={i * 0.06}>
            <div
              className="cert-glass"
              style={{
                background: dark
                  ? `rgba(5,10,30,0.55)`
                  : `rgba(255,255,255,0.55)`,
                border: `1px solid ${cert.color}28`,
                boxShadow: `0 8px 40px ${cert.color}14, inset 0 1px 0 rgba(255,255,255,0.08)`,
                backdropFilter: "blur(28px) saturate(1.6)",
                WebkitBackdropFilter: "blur(28px) saturate(1.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 24px 70px ${cert.color}30, 0 0 0 1px ${cert.color}44, inset 0 1px 0 rgba(255,255,255,0.14)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 40px ${cert.color}14, inset 0 1px 0 rgba(255,255,255,0.08)`;
              }}
            >
              {/* liquid blobs */}
              <div
                className="cert-blob cert-blob-1"
                style={{
                  width: 140,
                  height: 140,
                  top: -40,
                  right: -30,
                  background: cert.color,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
              <div
                className="cert-blob cert-blob-2"
                style={{
                  width: 100,
                  height: 100,
                  bottom: -20,
                  left: -20,
                  background: cert.color,
                  animationDelay: `${i * 0.4 + 2}s`,
                }}
              />

              {/* shimmer overlay */}
              <div className="cert-shimmer" />

              {/* card content */}
              <div className="cert-glass-inner">
                {/* top row: icon + tag + year */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `${cert.color}18`,
                      border: `1px solid ${cert.color}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      backdropFilter: "blur(10px)",
                      flexShrink: 0,
                    }}
                  >
                    {cert.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                    <span
                      className="cert-tag"
                      style={{
                        background: `${cert.color}18`,
                        border: `1px solid ${cert.color}35`,
                        color: cert.color,
                      }}
                    >
                      {cert.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: sub,
                        fontWeight: 600,
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* title */}
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: txt,
                      lineHeight: 1.35,
                      marginBottom: 4,
                    }}
                  >
                    {cert.title}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 12,
                      color: cert.color,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {cert.issuer}
                  </div>
                </div>

                {/* dept */}
                <div
                  style={{
                    fontSize: 11.5,
                    color: sub,
                    lineHeight: 1.6,
                    paddingTop: 8,
                    borderTop: `1px solid ${cert.color}18`,
                  }}
                >
                  {cert.department}
                </div>

                {/* bottom: code + verify */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: sub,
                      letterSpacing: ".1em",
                      opacity: 0.7,
                    }}
                  >
                    #{cert.code}
                  </span>
                  {cert.verifyUrl !== "#" ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-btn"
                      style={{
                        background: `${cert.color}15`,
                        border: `1px solid ${cert.color}35`,
                        color: cert.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${cert.color}28`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${cert.color}15`;
                      }}
                    >
                      Verify ↗
                    </a>
                  ) : (
                    <span
                      className="cert-verify-btn"
                      style={{
                        background: `rgba(255,255,255,0.04)`,
                        border: `1px solid ${border}`,
                        color: sub,
                      }}
                    >
                      Issued ✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [lastSentAt, setLastSentAt] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState("");
  const activeSection = useActiveSection();
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(""), 2600);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth", block:"start" });
    setMenuOpen(false);
  };

  const RATE_LIMIT_MS = 60 * 1000;

  const handleSend = async () => {
    if (honeypot) return;
    if (!form.name || !form.email || !form.message || sending) return;

    const waitMs = RATE_LIMIT_MS - (Date.now() - lastSentAt);
    if (waitMs > 0) {
      setSendError(`Please wait ${Math.ceil(waitMs / 1000)} seconds before sending again.`);
      return;
    }

    setSending(true);
    setSendError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/mohomadsajid.dev@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
          _subject: `Portfolio message from ${form.name}`,
          _replyto: form.email,
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("Message delivery failed.");
      }

      setSent(true);
      setForm({ name:"", email:"", message:"" });
      setHoneypot("");
      setLastSentAt(Date.now());
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      setSendError("Couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const filters = ["All", "Full Stack", "Web", "Mobile", "Frontend", "Backend"];
  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === activeFilter);

  const D = dark;
  const bg = D ? "#030712" : "#f0f9ff";
  const surface = D ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.75)";
  const border = D ? "rgba(255,255,255,0.08)" : "rgba(0,150,200,0.18)";
  const txt = D ? "#dbe4f0" : "#0f172a";
  const sub = D ? "#8ea0b5" : "#475569";
  const accent = "#00d4ff";

  return (
    <div style={{ fontFamily:"'Syne', 'Poppins', sans-serif", background:bg, minHeight:"100vh", color:txt, overflowX:"hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; overflow-x:hidden; }
        body { cursor:none; overflow-x:hidden; }
        #root { overflow-x:hidden; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#00d4ff,#a855f7); border-radius:2px; }
        ::selection { background:rgba(0,212,255,0.25); }

        .mono { font-family:'JetBrains Mono',monospace; }

        .nav-pill {
          background:none; border:none; font-family:inherit; font-size:12.5px; font-weight:600;
          letter-spacing:.05em; cursor:none; padding:7px 16px; border-radius:50px;
          transition:all .25s; color:${sub}; position:relative;
        }
        .nav-pill:hover { color:${accent}; }
        .nav-pill.active { color:${accent}; background:rgba(0,212,255,0.1); }
        .nav-pill.active::after {
          content:''; position:absolute; bottom:-1px; left:50%; transform:translateX(-50%);
          width:4px; height:4px; background:${accent}; border-radius:50%;
          box-shadow:0 0 8px ${accent};
        }

        .hero-name {
          font-size:clamp(44px,8vw,88px); font-weight:800; line-height:1.0; letter-spacing:-.03em;
          background:linear-gradient(135deg, #ffffff 0%, #67e8f9 40%, #a855f7 75%, #ec4899 100%);
          background-size:300% 300%;
          animation:gradShift 6s ease infinite;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        @keyframes gradShift {
          0%,100% { background-position:0% 50%; }
          50% { background-position:100% 50%; }
        }

        .orb {
          position:absolute; border-radius:50%; pointer-events:none; filter:blur(80px);
          animation:orbFloat 8s ease-in-out infinite;
        }
        @keyframes orbFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50% { transform:translateY(-30px) scale(1.05); }
        }

        .btn-primary {
          background:linear-gradient(135deg,#0099bb,#7c3aed);
          border:none; color:#fff; padding:13px 30px; border-radius:50px;
          font-family:inherit; font-size:13.5px; font-weight:700; letter-spacing:.04em;
          cursor:none; transition:all .3s cubic-bezier(.23,1,.32,1);
          position:relative; overflow:hidden;
        }
        .btn-primary::before {
          content:''; position:absolute; top:-50%; left:-50%; width:200%; height:200%;
          background:linear-gradient(45deg, transparent 40%, rgba(255,255,255,.15) 50%, transparent 60%);
          transform:translateX(-100%); transition:transform .5s;
        }
        .btn-primary:hover { box-shadow:0 0 30px rgba(0,212,255,.5), 0 0 60px rgba(124,58,237,.3); transform:translateY(-3px); }
        .btn-primary:hover::before { transform:translateX(100%); }

        .btn-ghost {
          background:rgba(0,212,255,.06); border:1.5px solid rgba(0,212,255,.3); color:${accent};
          padding:13px 30px; border-radius:50px; font-family:inherit; font-size:13.5px; font-weight:700;
          letter-spacing:.04em; cursor:none; transition:all .3s cubic-bezier(.23,1,.32,1);
          backdrop-filter:blur(10px);
        }
        .btn-ghost:hover { background:rgba(0,212,255,.15); box-shadow:0 0 25px rgba(0,212,255,.3); transform:translateY(-3px); }

        @keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)} 50%{box-shadow:0 0 0 6px rgba(16,185,129,0)} }
        .status-dot { width:8px; height:8px; background:#10b981; border-radius:50%; animation:pulseGreen 2s infinite; display:inline-block; }

        .skill-pill {
          display:inline-flex; align-items:center; gap:6px;
          padding:6px 14px; border-radius:50px; font-size:12.5px; font-weight:600; cursor:none;
          transition:all .25s;
        }

        .proj-card {
          background:${D?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.7)"};
          border:1px solid ${border}; backdrop-filter:blur(20px); border-radius:20px;
          transition:all .4s cubic-bezier(.23,1,.32,1); overflow:hidden; position:relative;
          cursor:none;
        }
        .proj-card:hover {
          transform:translateY(-8px);
          box-shadow:0 30px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(0,212,255,.15);
        }
        .proj-card-shine {
          position:absolute; top:0; left:-100%; width:40%; height:100%;
          background:linear-gradient(105deg, transparent 40%, rgba(255,255,255,.04) 50%, transparent 60%);
          transition:left .6s ease;
        }
        .proj-card:hover .proj-card-shine { left:140%; }

        .form-field {
          width:100%; background:${D?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.8)"};
          border:1px solid ${border}; color:${txt};
          padding:13px 18px; border-radius:12px; font-family:inherit; font-size:14px;
          outline:none; transition:all .25s; backdrop-filter:blur(8px);
        }
        .form-field:focus { border-color:rgba(0,212,255,.5); box-shadow:0 0 20px rgba(0,212,255,.1); }
        .form-field::placeholder { color:${sub}; }

        /* Education timeline — cyan dots */
        .timeline-edu { position:relative; padding-left:32px; }
        .timeline-edu::before {
          content:''; position:absolute; left:0; top:6px;
          width:10px; height:10px; border-radius:50%; border:2px solid ${accent};
          background:${bg}; box-shadow:0 0 12px ${accent}88;
        }
        .timeline-edu::after {
          content:''; position:absolute; left:4px; top:18px; bottom:-20px;
          width:1px; background:linear-gradient(to bottom, ${accent}44, transparent);
        }
        .timeline-edu:last-child::after { display:none; }

        /* Achievements timeline — purple dots */
        .timeline-ach { position:relative; padding-left:32px; }
        .timeline-ach::before {
          content:''; position:absolute; left:0; top:6px;
          width:10px; height:10px; border-radius:50%; border:2px solid #a855f7;
          background:${bg}; box-shadow:0 0 12px rgba(168,85,247,0.6);
        }
        .timeline-ach::after {
          content:''; position:absolute; left:4px; top:18px; bottom:-20px;
          width:1px; background:linear-gradient(to bottom, rgba(168,85,247,0.4), transparent);
        }
        .timeline-ach:last-child::after { display:none; }

        .filter-btn {
          background:none; border:1px solid ${border}; color:${sub};
          padding:6px 16px; border-radius:50px; font-family:inherit; font-size:12px; font-weight:600;
          cursor:none; transition:all .25s; letter-spacing:.04em;
        }
        .filter-btn:hover, .filter-btn.active {
          color:${accent}; border-color:rgba(0,212,255,.35); background:rgba(0,212,255,.07);
          box-shadow:0 0 12px rgba(0,212,255,.15);
        }

        
        .cert-glass {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: none;
          transition: transform 0.45s cubic-bezier(.23,1,.32,1), box-shadow 0.45s cubic-bezier(.23,1,.32,1);
          transform-style: preserve-3d;
        }
        .cert-glass:hover {
          transform: translateY(-10px) scale(1.025) rotateX(2deg);
        }
        .cert-glass-inner {
          position: relative;
          padding: 26px 24px 22px;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 2;
        }
        .cert-tag {
          display: inline-flex;
          align-items: center;
          padding: 3px 11px;
          border-radius: 50px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
        }
        .cert-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.08) 0%,
            rgba(255,255,255,0.02) 40%,
            rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.04) 100%
          );
          pointer-events: none;
          z-index: 3;
          border-radius: 24px;
        }
        .cert-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(38px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.22;
          transition: opacity 0.4s ease;
        }
        .cert-glass:hover .cert-blob {
          opacity: 0.38;
        }
        @keyframes liquidFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          33%       { transform: translateY(-8px) scale(1.04); }
          66%       { transform: translateY(4px)  scale(0.97); }
        }
        .cert-blob-1 { animation: liquidFloat 7s ease-in-out infinite; }
        .cert-blob-2 { animation: liquidFloat 9s ease-in-out infinite reverse; }
        .cert-verify-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: .06em;
          border: none;
          cursor: none;
          transition: all .25s;
          text-decoration: none;
          backdrop-filter: blur(8px);
        }
        

        .grid-lines {
          position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(${D?"rgba(0,212,255,0.025)":"rgba(0,150,200,0.04)"} 1px, transparent 1px),
            linear-gradient(90deg, ${D?"rgba(0,212,255,0.025)":"rgba(0,150,200,0.04)"} 1px, transparent 1px);
          background-size:80px 80px;
        }

        @media(max-width:768px) {
          .hide-sm { display:none !important; }
          .show-sm { display:flex !important; }
          body { cursor:auto; }
          .resume-layout { grid-template-columns:1fr !important; gap:24px !important; }
          .skills-globe-wrap { height:460px !important; border-radius:24px !important; }
        }
        @media(max-width:480px) {
          .skills-globe-wrap { height:390px !important; border-radius:20px !important; }
          .brand-surname { display:none; }
        }
        @media(min-width:769px) { .show-sm { display:none !important; } }

        .sec-label { font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:600; letter-spacing:.25em; text-transform:uppercase; }
        .sec-title { font-size:clamp(28px,5vw,46px); font-weight:800; letter-spacing:-.02em; }
        .grad-text { background:linear-gradient(135deg,#67e8f9,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        .corner-tl::before, .corner-tl::after { content:''; position:absolute; }
        .corner-tl::before { top:0; left:0; width:16px; height:1px; background:${accent}; }
        .corner-tl::after { top:0; left:0; width:1px; height:16px; background:${accent}; }

        .link-hover { transition:all .2s; text-decoration:none; }
        .link-hover:hover { color:${accent} !important; }

        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes ping { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2);opacity:0} }
        .animate-spin { animation:spin 8s linear infinite; }
        .animate-ping { animation:ping 1.5s ease-out infinite; }

        .card-num { font-family:'JetBrains Mono',monospace; font-size:11px; color:${sub}; font-weight:600; }

        /* Section divider between edu and achievements */
        .section-divider {
          height:1px;
          background:linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent);
          margin: 36px 0;
        }
      `}</style>

      {/* CURSOR */}
      <div className="hide-sm"><CursorFX /></div>

      {/* SCANLINES */}
      <ScanLine />

      {/* BACKGROUND */}
      <NeuralCanvas />
      <div className="grid-lines" />
      <div className="orb" style={{ width:600, height:600, top:"-10%", left:"-10%", background:"rgba(0,100,200,0.12)", animationDelay:"0s" }} />
      <div className="orb" style={{ width:500, height:500, top:"30%", right:"-8%", background:"rgba(168,85,247,0.1)", animationDelay:"-3s" }} />
      <div className="orb" style={{ width:400, height:400, bottom:"10%", left:"20%", background:"rgba(16,185,129,0.07)", animationDelay:"-6s" }} />

      {/* ── NAVBAR ────────────────────────────── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000, height:66,
        padding:"0 clamp(16px,5%,60px)",
        background:D?"rgba(3,7,18,0.75)":"rgba(240,249,255,0.8)",
        backdropFilter:"blur(24px) saturate(1.5)",
        borderBottom:`1px solid ${border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#0099bb,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, color:"#fff" }}>MS</span>
            <div style={{ position:"absolute", inset:-1, borderRadius:9, border:"1px solid rgba(0,212,255,0.4)" }} />
          </div>
          <span style={{ fontWeight:800, fontSize:15, letterSpacing:".06em" }}>
            <span style={{ color:accent }}>MOHOMAD</span>
            <span className="brand-surname" style={{ color:txt }}>.SAJID</span>
          </span>
        </div>

        <div className="hide-sm" style={{ display:"flex", gap:2 }}>
          {NAV.map(l => (
            <button key={l} className={`nav-pill ${activeSection === l ? "active" : ""}`} onClick={() => scrollTo(l)}>{l}</button>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={() => setDark(!dark)} style={{
            background:D?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",
            border:`1px solid ${border}`, borderRadius:10, width:38, height:38,
            cursor:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
          }}>{D?"☀️":"🌙"}</button>
          <button className="show-sm btn-primary" style={{ padding:"8px 18px", fontSize:12 }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:"fixed", top:66, left:0, right:0, zIndex:999,
          background:D?"rgba(3,7,18,0.97)":"rgba(240,249,255,0.97)",
          backdropFilter:"blur(24px)", borderBottom:`1px solid ${border}`,
          padding:"20px clamp(16px,5%,60px)", display:"flex", flexDirection:"column", gap:4,
        }}>
          {NAV.map(l => (
            <button key={l} className={`nav-pill ${activeSection===l?"active":""}`} style={{ textAlign:"left", padding:"12px 16px" }} onClick={() => scrollTo(l)}>{l}</button>
          ))}
        </div>
      )}

      {/* ── HERO ─────────────────────────────── */}
      <section id="home" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px clamp(16px,5%,80px) 60px", overflow:"hidden" }}>
        <HexGrid />

        <div className="animate-spin" style={{ position:"absolute", width:600, height:600, border:"1px dashed rgba(0,212,255,0.06)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:400, height:400, border:"1px solid rgba(168,85,247,0.05)", borderRadius:"50%", pointerEvents:"none", animation:"spin 12s linear infinite reverse" }} />

        <div style={{ position:"relative", zIndex:10, maxWidth:860, textAlign:"center" }}>
          <FadeIn delay={0}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:D?"rgba(16,185,129,0.08)":"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:50, padding:"7px 20px", marginBottom:32, fontSize:12, fontWeight:700 }}>
              <span className="status-dot" />
              <span className="mono" style={{ color:"#10b981" }}>AVAILABLE_FOR_HIRE</span>
              <span style={{ color:sub, fontSize:11 }}>• Sri Lanka</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="hero-name" style={{ marginBottom:6 }}>
              <GlitchText text="MOHOMAD SAJID" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ fontSize:"clamp(16px,2.5vw,22px)", fontWeight:500, color:sub, marginBottom:24, letterSpacing:".04em" }}>
              <span className="mono" style={{ color:accent }}>{">"}</span>
              {" "}
              <TypeWriter
                phrases={[
                  "Software Engineering Undergraduate",
                  "Full Stack Developer",
                  "Always Learning · Always Achieving",
                  "Turning Data Into Decisions",
                  "Problem Solver",
                  "UI/UX Designer",
                  "DevOps Engineer",
                  "Fast Learner",
                  "Turning Problems Into Solutions",
                ]}
                speed={55}
                pauseDuration={1800}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p style={{ fontSize:"clamp(14px,1.8vw,18px)", color:sub, maxWidth:580, margin:"0 auto 44px", lineHeight:1.85 }}>
              Passionate software engineering student focused on building <span style={{ color:accent, fontWeight:600 }}>Real World Applications</span> and learning modern technologies. Designing{" "}
              <span style={{ color:"#a855f7", fontWeight:600 }}>Full Stack Solutions with DevOps Practices</span>. for scalable deployment—turning complex problems into impactful solutions.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:64 }}>
              <button className="btn-primary" onClick={() => scrollTo("Projects")}>
                <span>View My Work</span> <span style={{ marginLeft:6 }}>↗</span>
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("Contact")}>
                Let's Connect
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div style={{ display:"flex", gap:"clamp(24px,4vw,48px)", justifyContent:"center", flexWrap:"wrap" }}>
              {[["2023","Enrollerd","", ""],["4","+ Projects","", "+"],["3","+ Years Coding", "", "+"],["2","+ Happy Clients", "", "+"]].map(([n,s,s2,numSuffix]) => (
                <div key={s} style={{ textAlign:"center", minWidth:70 }}>
                  <div style={{ fontSize:"clamp(28px,4vw,38px)", fontWeight:800, color:accent, fontFamily:"'JetBrains Mono',monospace", lineHeight:1, textShadow:`0 0 20px ${accent}66` }}>
                    <CountUp target={parseInt(n)} suffix={numSuffix} />
                  </div>
                  <div style={{ fontSize:11, color:sub, marginTop:4, fontWeight:600, letterSpacing:".06em", textTransform:"uppercase" }}>{s}{s2&&<><br/>{s2}</>}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────── */}
      <section id="about" style={{ padding:"120px clamp(16px,5%,80px)", maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap:64, alignItems:"start" }}>
          {/* Text */}
          <div>
            <FadeIn>
              <div className="sec-label" style={{ color:accent, marginBottom:14 }}></div>
              <h2 className="sec-title" style={{ marginBottom:28 }}>
                <span className="grad-text">Crafting the</span><br/>Future in Code
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p style={{ color:sub, lineHeight:1.9, marginBottom:18, fontSize:15 }}>
                I am a Software Engineering student passionate about building real world applications and learning modern technologies. With experience in <strong style={{ color:txt }}>Full Stack development</strong> and an interest in <strong style={{ color:txt }}>DevOps,</strong> I focus on creating scalable, reliable systems. I enjoy turning complex problems into practical solutions and <strong style={{ color:txt }}> continuously improving my skills.</strong>
              </p>
              <p style={{ color:sub, lineHeight:1.9, marginBottom:32, fontSize:15 }}>
                I am adaptable and open to contributing in different areas of development, always willing to learn, support team efforts and grow within a professional environment. I am able to work effectively in diverse environments and possess strong communication skills for both spoken and written in English, Sinhala and Tamil. <em style={{ color:accent }}>I am currently seeking an <strong style={{ color:txt }}>INTERNSHIP</strong> where I can gain industry experience and make a meaningful contribution.</em>
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:40 }}>
                {["Full Stack Development","Web Architecture","Mobile Architecture","System Designer","Database Management","UI/UX Engineer","DevOps Practices","Supporter","Problem Solving","Software Engineering"].map(t => (
                  <span key={t} style={{ background:D?"rgba(0,212,255,0.07)":"rgba(0,150,200,0.08)", border:"1px solid rgba(0,212,255,0.2)", color:accent, padding:"5px 14px", borderRadius:50, fontSize:12, fontWeight:600 }}>{t}</span>
                ))}
              </div>
            </FadeIn>

            {/* ── HIGHER EDUCATION ── */}
            <FadeIn delay={0.3}>
              <div className="sec-label" style={{ color:accent, marginBottom:20 }}>HIGHER_EDUCATION</div>
              <div style={{ display:"flex", flexDirection:"column", gap:28, marginBottom:36 }}>
                {EDUCATION.map((t, i) => (
                  <div key={i} className="timeline-edu">
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                      <span className="mono" style={{ fontSize:11, color:accent, fontWeight:700 }}>{t.year}</span>
                      <span style={{ width:24, height:1, background:`${accent}44` }} />
                      <span style={{ fontWeight:700, fontSize:14, color:txt }}>{t.title}</span>
                    </div>
                    <div style={{ fontSize:12, color:accent, fontWeight:600, marginBottom:4, fontFamily:"'JetBrains Mono',monospace" }}>{t.org}</div>
                    <div style={{ fontSize:13, color:sub, lineHeight:1.7 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Divider */}
            <div className="section-divider" />
          </div>

          {/* Cards grid */}
          <div>
            {/* Profile card */}
            <FadeIn delay={0.1}>
              <GlowCard accent={accent} style={{ padding:32, marginBottom:20, position:"relative" }}>
                <div className="corner-tl" style={{ position:"absolute", top:16, left:16 }} />
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
                  <div style={{ width:64, height:64, borderRadius:16, background:"linear-gradient(135deg,#0099bb,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:800, color:"#fff", position:"relative", flexShrink:0 }}>
                    MS
                    <div style={{ position:"absolute", inset:-2, borderRadius:18, border:"1px solid rgba(0,212,255,0.4)", animation:"ping 3s ease-out infinite" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:17, color:txt }}>Mohomad Sajid</div>
                    <div className="mono" style={{ fontSize:10, color:accent, marginTop:3 }}>Bachelor of Software Engineering Honours Undergraduate</div>
                    <div style={{ fontSize:12, color:sub, marginTop:4 }}>Sri Lanka</div>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {[
                    { k:"Focus", v:"Full Stack + DevOps" },
                    { k:"Status", v:"Open to Work ✓" },
                    { k:"Degree", v:"B. SE Honours" },
                    { k:"GPA", v:"Calculating" },
                  ].map(r => (
                    <div key={r.k} style={{ background:D?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)", borderRadius:10, padding:"10px 14px", border:`1px solid ${border}` }}>
                      <div style={{ fontSize:10, color:sub, textTransform:"uppercase", letterSpacing:".08em", fontWeight:700, marginBottom:3 }}>{r.k}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:r.k==="Status"?"#10b981":txt }}>{r.v}</div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </FadeIn>

            {/* Trait cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { icon:"⚡", title:"Fast Learner", desc:"Quickly adapting to new technologies and frameworks through hands on projects and continuous learning.", color:"#f59e0b" },
                { icon:"💻", title:"Full Stack Developer", desc:"Building complete web applications from frontend interfaces to backend systems with real world functionality.", color:"#a855f7" },
                { icon:"🧠", title:"Solution Builder", desc:"Turning real world problems into structured and scalable solutions.", color:accent },
                { icon:"🌍", title:"Team Player", desc:"Communicating effectively in English, Sinhala and Tamil while supporting team collaboration and growth.", color:"#10b981" },
              ].map((c, i) => (
                <FadeIn key={c.title} delay={0.15 + i * 0.08}>
                  <GlowCard accent={c.color} style={{ padding:20 }}>
                    <div style={{ fontSize:24, marginBottom:10 }}>{c.icon}</div>
                    <div style={{ fontWeight:700, fontSize:13, color:txt, marginBottom:5 }}>{c.title}</div>
                    <div style={{ fontSize:11.5, color:sub, lineHeight:1.6 }}>{c.desc}</div>
                  </GlowCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING SKILLS SECTION (MERGED) ── */}
      <FloatingSkillsSection dark={dark} bg={bg} sub={sub} accent={accent} border={border} txt={txt} />

      {/* ── PROJECTS ─────────────────────────────── */}
      <section id="projects" style={{ padding:"120px clamp(16px,5%,80px)", maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:50 }}>
            <div className="sec-label" style={{ color:"#10b981", marginBottom:14 }}></div>
            <h2 className="sec-title"><span className="grad-text">Projects That</span><br/>Shipped to Production</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:48 }}>
            {filters.map(f => (
              <button key={f} className={`filter-btn ${activeFilter===f?"active":""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap:24 }}>
          {filtered.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <div className="proj-card" style={{ padding:30 }}>
                <div className="proj-card-shine" />
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:13, background:`${p.accent}15`, border:`1px solid ${p.accent}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:p.accent, fontWeight:800, flexShrink:0 }}>◈</div>
                    <div>
                      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", color:sub, letterSpacing:".1em", textTransform:"uppercase", marginBottom:2 }}>{p.tag}</div>
                      <div style={{ fontWeight:800, fontSize:16, color:txt }}>{p.name}</div>
                    </div>
                  </div>
                  <span className="card-num">0{i+1}</span>
                </div>
                <p style={{ color:sub, fontSize:13.5, lineHeight:1.75, marginBottom:20 }}>{p.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background:`${p.accent}12`, border:`1px solid ${p.accent}28`, color:p.accent, fontFamily:"'JetBrains Mono',monospace" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display:"flex", gap:10, paddingTop:20, borderTop:`1px solid ${border}` }}>
                  <a
                    href={p.github}
                    target={p.github && p.github !== "#" ? "_blank" : undefined}
                    rel={p.github && p.github !== "#" ? "noopener noreferrer" : undefined}
                    style={{ flex:1, textAlign:"center", padding:"9px 0", borderRadius:10, background:D?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", border:`1px solid ${border}`, color:sub, textDecoration:"none", fontSize:12.5, fontWeight:700, transition:"all .25s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=p.accent+"55";e.currentTarget.style.color=p.accent;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=sub;}}>
                    ⌥ GitHub
                  </a>
                  <a
                    href={p.demo && p.demo !== "#" ? p.demo : "#"}
                    target={p.demo && p.demo !== "#" ? "_blank" : undefined}
                    rel={p.demo && p.demo !== "#" ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (!p.demo || p.demo === "#") {
                        e.preventDefault();
                        showToast("This feature is under development — will be available soon.");
                      }
                    }}
                    style={{ flex:1, textAlign:"center", padding:"9px 0", borderRadius:10, background:`${p.accent}15`, border:`1px solid ${p.accent}35`, color:p.accent, textDecoration:"none", fontSize:12.5, fontWeight:700, transition:"all .25s" }}
                    onMouseEnter={e=>{e.currentTarget.style.background=p.accent+"28";}}
                    onMouseLeave={e=>{e.currentTarget.style.background=p.accent+"15";}}>
                    ↗ Live Demo
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign:"center", marginTop:50 }}>
            <a href="https://github.com/MohomadSajid-Dev" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <button className="btn-ghost">View All Projects on GitHub ↗</button>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── RESUME ─────────────────────────────── */}
      <section id="resume" style={{ padding:"120px clamp(16px,5%,80px)", maxWidth:900, margin:"0 auto", position:"relative", zIndex:1 }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:50 }}>
            <div className="sec-label" style={{ color:"#f59e0b", marginBottom:14 }}></div>
            <h2 className="sec-title"><span className="grad-text">My Resume</span></h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlowCard accent="#f59e0b" style={{ padding:"clamp(32px,5vw,52px)", position:"relative", overflow:"visible" }}>
            <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, border:"1px solid rgba(245,158,11,0.15)", borderRadius:"50%", animation:"spin 20s linear infinite" }} />
            <div style={{ position:"absolute", top:-15, right:-15, width:60, height:60, border:"1px solid rgba(245,158,11,0.25)", borderRadius:"50%", animation:"spin 10s linear infinite reverse" }} />

            <div className="resume-layout" style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:40, alignItems:"center" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ width:90, height:90, borderRadius:20, background:"linear-gradient(135deg,#f59e0b22,#f59e0b44)", border:"1px solid rgba(245,158,11,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>📄</div>
              </div>
              <div>
                <h3 style={{ fontWeight:800, fontSize:22, color:txt, marginBottom:8 }}>Mohomad Sajid</h3>
                <div className="mono" style={{ fontSize:12, color:"#f59e0b", marginBottom:16 }}>Software Engineering Undergraduate · Full Stack Developer · DevOps Enthusiast</div>
                <p style={{ color:sub, fontSize:14, lineHeight:1.8, marginBottom:20 }}>
                  Passionate about building scalable web applications and integrating modern technologies. Seeking an internship to gain industry experience and contribute meaningfully to a professional team.
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["React / Next.js","Python / FastAPI","Node.js","PostgreSQL","Docker","AWS"].map(s => (
                    <span key={s} style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", color:"#f59e0b", padding:"4px 13px", borderRadius:50, fontSize:12, fontWeight:600 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop:36, paddingTop:28, borderTop:`1px solid ${border}`, display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
              <a href={`${process.env.PUBLIC_URL}/my-cv.pdf`} download="My CV.pdf" style={{ textDecoration:"none" }}>
                <button className="btn-primary" style={{ fontSize:14, padding:"14px 36px" }}>⬇ Download CV (PDF)</button>
              </a>
              <button className="btn-ghost" style={{ borderColor:"rgba(245,158,11,.35)", color:"#f59e0b", fontSize:14, padding:"14px 36px" }} onClick={() => scrollTo("Contact")}>
                💬 Schedule a Call
              </button>
            </div>
          </GlowCard>
        </FadeIn>
      </section>

      <CertificationsSection dark={dark} sub={sub} accent={accent} border={border} txt={txt} bg={bg} />

      {/* ── CONTACT ─────────────────────────────── */}
      <section id="contact" style={{ padding:"120px clamp(16px,5%,80px)", maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:70 }}>
            <div className="sec-label" style={{ color:"#ec4899", marginBottom:14 }}></div>
            <h2 className="sec-title"><span className="grad-text">Let's Build</span><br/>Something Great</h2>
            <p style={{ color:sub, marginTop:16, fontSize:15, maxWidth:500, margin:"16px auto 0" }}>
              Open to Full Time Roles, Research Collaborations, Freelance Projects, and Interesting Conversations.
            </p>
          </div>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap:40 }}>
          <div>
            <FadeIn>
              <div className="sec-label" style={{ color:sub, marginBottom:24 }}>CONTACTS</div>
            </FadeIn>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {CONTACT.map((c, i) => (
                <FadeIn key={c.label} delay={i * 0.07}>
                  <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ textDecoration:"none", display:"block" }}>
                    <GlowCard accent={accent} style={{ padding:"14px 18px", display:"flex", alignItems:"center", gap:16 }}>
                      <div style={{ width:40, height:40, borderRadius:11, background:"rgba(0,212,255,0.08)", border:"1px solid rgba(0,212,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={c.svg} />
                        </svg>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div className="mono" style={{ fontSize:10, color:sub, letterSpacing:".1em", textTransform:"uppercase", marginBottom:2 }}>{c.label}</div>
                        <div style={{ fontSize:13.5, fontWeight:600, color:txt, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.value}</div>
                      </div>
                      <span style={{ color:sub, fontSize:14 }}>↗</span>
                    </GlowCard>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn>
              <div className="sec-label" style={{ color:sub, marginBottom:24 }}>SEND_MESSAGE</div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <GlowCard accent="#ec4899" style={{ padding:32 }}>
                {sent ? (
                  <div style={{ textAlign:"center", padding:"60px 20px" }}>
                    <div style={{ fontSize:52, marginBottom:16 }}>✓</div>
                    <div style={{ fontWeight:800, fontSize:18, color:"#10b981", marginBottom:8 }}>Transmission Received!</div>
                    <div className="mono" style={{ fontSize:12, color:sub }}>I'll respond within 24 hours.</div>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                    <div style={{ display:"none" }} aria-hidden="true">
                      <label>Website</label>
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={e => setHoneypot(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mono" style={{ fontSize:10, color:sub, letterSpacing:".1em", textTransform:"uppercase", display:"block", marginBottom:7 }}>YOUR_NAME</label>
                      <input className="form-field" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                    </div>
                    <div>
                      <label className="mono" style={{ fontSize:10, color:sub, letterSpacing:".1em", textTransform:"uppercase", display:"block", marginBottom:7 }}>EMAIL_ADDRESS</label>
                      <input className="form-field" type="email" placeholder="example@gmail.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                    </div>
                    <div>
                      <label className="mono" style={{ fontSize:10, color:sub, letterSpacing:".1em", textTransform:"uppercase", display:"block", marginBottom:7 }}>YOUR_MESSAGE</label>
                      <textarea className="form-field" rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{ resize:"vertical" }} />
                    </div>
                    <button
                      className="btn-primary"
                      style={{ marginTop:8, width:"100%", justifyContent:"center", opacity: sending ? 0.75 : 1 }}
                      onClick={handleSend}
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Send Transmission ✉"}
                    </button>
                    {sendError && (
                      <div className="mono" style={{ fontSize:10, color:"#f87171", textAlign:"center" }}>
                        {sendError}
                      </div>
                    )}
                    <div className="mono" style={{ fontSize:10, color:sub, textAlign:"center" }}>
                      Encrypted · No spam · Replies within 24h
                    </div>
                  </div>
                )}
              </GlowCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer style={{ position:"relative", zIndex:1, borderTop:`1px solid ${border}`, padding:"44px clamp(16px,5%,80px)", background:D?"rgba(0,0,0,0.4)":"rgba(255,255,255,0.4)", backdropFilter:"blur(20px)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:40, marginBottom:40 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#0099bb,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, color:"#fff" }}>MS</span>
              </div>
              <span style={{ fontWeight:800, fontSize:15, letterSpacing:".06em" }}>
                <span style={{ color:accent }}>MOHOMAD</span><span style={{ color:txt }}>.SAJID</span>
              </span>
            </div>
            <p style={{ color:sub, fontSize:13, lineHeight:1.8 }}>Focused on Clean Code, Modern Technologies and Real World Solutions</p>
          </div>
          <div>
            <div className="mono" style={{ fontSize:10, color:sub, letterSpacing:".2em", textTransform:"uppercase", marginBottom:16 }}>Navigation</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {NAV.map(l => <button key={l} className="nav-pill link-hover" style={{ textAlign:"left", padding:"4px 0", color:sub, fontSize:13 }} onClick={() => scrollTo(l)}>{l}</button>)}
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize:10, color:sub, letterSpacing:".2em", textTransform:"uppercase", marginBottom:16 }}>Quick Links</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { label: "GitHub Profile", href: "https://github.com/MohomadSajid-Dev" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/mohomadsajid" },
                { label: "Download CV", href: `${process.env.PUBLIC_URL}/my-cv.pdf`, download: "My CV.pdf" },
                { label: "Schedule Call", href: "#contact" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  download={l.download}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="link-hover"
                  style={{ fontSize:13, color:sub, textDecoration:"none" }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${border}`, paddingTop:24, display:"flex", flexWrap:"wrap", gap:16, alignItems:"center", justifyContent:"space-between" }}>
          <div className="mono" style={{ fontSize:11, color:sub }}>© {new Date().getFullYear()} Mohomad Sajid · All rights reserved</div>
          <div className="mono" style={{ fontSize:11, color:sub }}>Designed & built with ⚡ · React · Syne</div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span className="status-dot" />
            <span className="mono" style={{ fontSize:11, color:"#10b981" }}>All systems operational</span>
          </div>
        </div>
      </footer>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          style={{
            position:"fixed",
            left:"50%",
            bottom:22,
            transform:"translateX(-50%)",
            zIndex:9999,
            padding:"10px 14px",
            borderRadius:12,
            background: D ? "rgba(3,7,18,0.82)" : "rgba(255,255,255,0.92)",
            border:`1px solid ${border}`,
            color: txt,
            boxShadow:"0 18px 50px rgba(0,0,0,0.25)",
            backdropFilter:"blur(10px)",
            WebkitBackdropFilter:"blur(10px)",
            fontSize:12.5,
            fontWeight:700,
            maxWidth:"min(560px, calc(100vw - 32px))",
            textAlign:"center",
          }}
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function clamp(min, pct, max) { return `clamp(${min}px, ${pct}vw, ${max}px)`; }