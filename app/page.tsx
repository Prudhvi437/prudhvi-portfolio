"use client";

import React, { useEffect, useMemo } from "react";

type Accent = "pink" | "cyan" | "emerald" | "violet";

type Exp = {
  role: string;
  company: string;
  dates: string;
  location?: string;
  bullets: string[];
  accent?: Accent;
};

type Edu = {
  school: string;
  location?: string;
  degree: string;
  notes?: string;
};

type Project = {
  name: string;
  desc: string;
  tags: string[];
  link: string;
  highlights: string[]; // Problem / Action / Impact style bullets
};

type Post = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  link?: string; // optional (later you can link to a page or external post)
};

function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="chip">
      <span className="chipDot" />
      {children}
    </span>
  );
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const cls = variant === "primary" ? "btn btnPrimary" : "btn btnGhost";
  const isHttp = href.startsWith("http");
  return (
    <a className={cls} href={href} target={isHttp ? "_blank" : undefined} rel="noreferrer">
      {children}
      <span className="btnShine" />
    </a>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section reveal" data-reveal>
      <div className="sectionHead">
        <h2 className="sectionTitle">{title}</h2>
        {subtitle ? <p className="sectionSub">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function StatTile({ k, v, note }: { k: string; v: string; note: string }) {
  return (
    <div className="card tileCard reveal" data-reveal>
      <div className="miniTitle">{k}</div>
      <div className="bigNum">{v}</div>
      <div className="miniSub">{note}</div>
    </div>
  );
}

function DevOpsCycle() {
  const steps = [
    { t: "Plan", d: "Architecture, standards, security baselines", icon: "🧠" },
    { t: "Code", d: "App + IaC + config as code (PR reviews)", icon: "🧩" },
    { t: "Build", d: "CI builds + artifacts + versioning", icon: "🏗️" },
    { t: "Test", d: "Quality gates + policy checks + scans", icon: "🧪" },
    { t: "Release", d: "Approvals + progressive delivery strategy", icon: "📦" },
    { t: "Deploy", d: "GitOps sync + probes + rollback readiness", icon: "🚀" },
    { t: "Operate", d: "On-call + runbooks + cost tuning", icon: "🛠️" },
    { t: "Monitor", d: "Metrics/logs/traces + SLO dashboards", icon: "📈" },
    { t: "Improve", d: "RCA → automation → fewer repeats", icon: "♻️" },
  ];

  return (
    <div className="cycleWrap reveal" data-reveal>
      <div className="cycleGlow" />
      <div className="cycleGrid">
        {steps.map((s, idx) => (
          <div key={s.t} className="cycleCard">
            <div className="cycleTop">
              <div className="cycleBadge">
                <span className="cycleN">{idx + 1}</span>
                <span className="cycleIcon">{s.icon}</span>
              </div>
              <div className="cycleTitle">{s.t}</div>
            </div>
            <div className="cycleDesc">{s.d}</div>
          </div>
        ))}
      </div>
      <div className="cycleFooter">
        🔁 <b>Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Improve</b>
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="card reveal" data-reveal style={{ padding: 18 }}>
      <div className="miniTitle">Reference Architecture</div>
      <div className="miniSub" style={{ marginTop: 6 }}>
        CI/CD + Kubernetes + secrets + observability (aligned with your toolchain)
      </div>

      <svg viewBox="0 0 980 320" style={{ width: "100%", marginTop: 14 }}>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,0,170,.35)" />
            <stop offset="1" stopColor="rgba(0,220,255,.25)" />
          </linearGradient>
        </defs>

        {[
          { x: 30, y: 40, w: 210, h: 70, t: "Users / Clients" },
          { x: 270, y: 40, w: 210, h: 70, t: "LB / Ingress" },
          { x: 510, y: 40, w: 210, h: 70, t: "Kubernetes (AKS/EKS)" },
          { x: 750, y: 40, w: 200, h: 70, t: "Services (20+)" },

          { x: 510, y: 150, w: 210, h: 70, t: "GitOps CD (Argo CD)" },
          { x: 270, y: 150, w: 210, h: 70, t: "CI (GitHub Actions)" },

          { x: 30, y: 150, w: 210, h: 70, t: "IaC (Terraform Ent.)" },
          { x: 750, y: 150, w: 200, h: 70, t: "Secrets (Vault)" },

          { x: 30, y: 250, w: 300, h: 55, t: "Metrics: Prometheus / Grafana" },
          { x: 350, y: 250, w: 300, h: 55, t: "Azure Monitor / App Insights (KQL)" },
          { x: 670, y: 250, w: 280, h: 55, t: "Logs: Splunk / CloudWatch" },
        ].map((b) => (
          <g key={b.t}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="16"
              fill="rgba(0,0,0,.20)"
              stroke="rgba(255,255,255,.16)"
            />
            <text
              x={b.x + 14}
              y={b.y + 42}
              fill="rgba(255,255,255,.86)"
              fontSize="16"
              fontWeight="700"
            >
              {b.t}
            </text>
          </g>
        ))}

        <g stroke="url(#g)" strokeWidth="3" fill="none" opacity="0.9">
          <path d="M240 75 L270 75" />
          <path d="M480 75 L510 75" />
          <path d="M720 75 L750 75" />

          <path d="M375 150 L375 110" />
          <path d="M135 150 L135 110" />
          <path d="M615 150 L615 110" />

          <path d="M615 220 L615 250" />
          <path d="M820 220 L820 250" />
          <path d="M180 220 L180 250" />
        </g>
      </svg>
    </div>
  );
}

function Timeline({ items }: { items: Exp[] }) {
  const colorClass = (accent?: Accent) => {
    switch (accent) {
      case "pink":
        return "pink";
      case "cyan":
        return "cyan";
      case "emerald":
        return "emerald";
      case "violet":
        return "violet";
      default:
        return "cyan";
    }
  };

  return (
    <div className="timeline reveal" data-reveal>
      <div className="timelineLine" />
      <div className="timelineList">
        {items.map((e, idx) => (
          <div key={`${e.company}-${idx}`} className="timelineItem">
            <div className={`timelineDot ${colorClass(e.accent)}`} />
            <div className="timelineCard card">
              <div className="xpTop">
                <div>
                  <div className="xpRole">{e.role}</div>
                  <div className="xpCompany">
                    {e.company}
                    {e.location ? ` • ${e.location}` : ""}
                  </div>
                </div>
                <div className="xpDates">{e.dates}</div>
              </div>

              <ul className="xpBullets">
                {e.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid3">
      {projects.map((p) => (
        <div key={p.name} className="card reveal" data-reveal>
          <div className="miniTitle">{p.name}</div>
          <div className="miniNote">{p.desc}</div>

          <div className="miniNote" style={{ marginTop: 12 }}>
            <b>Highlights:</b>
            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
              {p.highlights.map((h) => (
                <li key={h} style={{ marginTop: 6, color: "rgba(255,255,255,.78)" }}>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="chips" style={{ marginTop: 12 }}>
            {p.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="cta" style={{ marginTop: 14 }}>
            <Button href={p.link} variant="ghost">
              View Repo
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function WritingGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid3">
      {posts.map((p) => (
        <div key={p.title} className="card reveal" data-reveal>
          <div className="miniTitle">{p.title}</div>
          <div className="miniSub" style={{ marginTop: 6 }}>
            {p.date}
          </div>
          <div className="miniNote">{p.summary}</div>

          <div className="chips" style={{ marginTop: 12 }}>
            {p.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          {p.link ? (
            <div className="cta" style={{ marginTop: 14 }}>
              <Button href={p.link} variant="ghost">
                Read
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  useScrollReveal();

  // ===== Your details (EDIT THESE) =====
  const name = "Prudhvi Gantam";
  const headline = "DevOps / SRE Engineer";
  const location = "Texas, USA";
  const email = "prudvi.gantam@gmail.com";
  const phone = "+1 940-205-8765";
  const github = "https://github.com/Prudhvi437";
  const portfolio = "https://prudhvi-portfolio-two.vercel.app/";
  const linkedin = "YOUR_LINKEDIN_URL_HERE"; // <-- paste your LinkedIn URL
  const resume = "/Prudhvi_Gantam_Resume.pdf"; // put this file in /public

  // ===== Content =====
  const chips = [
    "AWS",
    "Azure",
    "GCP",
    "Kubernetes (AKS/EKS)",
    "Terraform Enterprise",
    "GitHub Actions",
    "Argo CD (GitOps)",
    "Prometheus + Grafana",
    "Azure Monitor (KQL)",
    "CloudWatch",
    "Splunk",
    "Vault",
    "SLO/SLA",
    "Incident Response",
  ];

  const stats = [
    { k: "Availability (30d)", v: "99.95%", note: "SLO dashboards + probes" },
    { k: "MTTR", v: "18m", note: "Runbooks + escalation" },
    { k: "Alert Noise", v: "-35%", note: "KQL tuning + dedupe" },
    { k: "Deployments", v: "↑ Faster", note: "GitHub Actions + GitOps" },
    { k: "Microservices", v: "20+", note: "AKS/EKS optimization" },
    { k: "GCP Clusters", v: "500+", note: "Spinnaker ops" },
  ];

  const experience: Exp[] = [
    {
      role: "Application Monitoring SME",
      company: "Kforce Inc.",
      dates: "Oct 2025 – Present",
      location: "Texas, USA",
      bullets: [
        "Monitored enterprise apps using Azure Monitor, Application Insights, and Workbooks for availability & performance.",
        "Built/optimized KQL dashboards and alert rules to improve signal-to-noise.",
        "Incident triage via telemetry analysis; collaborated with DevOps/app teams to restore services.",
        "On-call escalation via xMatters; updated runbooks and contributed to RCA practices to reduce MTTR.",
      ],
      accent: "emerald",
    },
    {
      role: "Senior DevOps Engineer",
      company: "LexisNexis Risk Solutions",
      dates: "May 2023 – Sep 2025",
      location: "USA",
      bullets: [
        "Automated infrastructure using Terraform Enterprise across Azure (AKS, DNS, MySQL Flexible Server) and AWS (EKS, EC2).",
        "Built CI/CD pipelines using GitHub Actions and Argo CD; improved deployment speed and reliability.",
        "Optimized Kubernetes hosting 20+ microservices using tuning/autoscaling/storage improvements.",
        "Defined and monitored SLIs/SLOs using Prometheus, Grafana, Azure Monitor, and CloudWatch; supported on-call and RCA.",
        "Integrated HashiCorp Vault for centralized secrets; implemented probes, readiness checks, and rollback strategies.",
      ],
      accent: "cyan",
    },
    {
      role: "DevOps / Cloud Engineer",
      company: "Salient Global Technologies",
      dates: "Nov 2022 – Apr 2023",
      location: "USA",
      bullets: [
        "Managed 500+ GCP clusters (GKE/GAE) using Spinnaker + Spinnaker Operator for continuous deployment.",
        "Automated onboarding with reusable pipeline templates; built Go-based logging integrated with Vault.",
        "Deployed/containerized apps to EKS; implemented Prometheus/Grafana/CloudWatch monitoring.",
      ],
      accent: "violet",
    },
    {
      role: "System Administrator / DevOps Engineer",
      company: "Kantar GDC India Pvt. Ltd.",
      dates: "Jul 2019 – Dec 2021",
      location: "Hyderabad, India",
      bullets: [
        "Managed 20+ Linux servers; automated patching/config using Bash and Ansible.",
        "Migrated on-prem Linux infrastructure to AWS EC2; configured VPC, IAM, and security policies.",
        "Built CI/CD with Jenkins + Git; improved delivery speed and consistency.",
        "Implemented monitoring with Nagios, New Relic, and Splunk; improved detection and response.",
        "Automated backup/DR using AWS S3 and AWS Backup.",
      ],
      accent: "pink",
    },
  ];

  const education: Edu[] = [
    {
      school: "University of North Texas",
      location: "Texas, USA",
      degree: "Master’s — Information Systems & Technology",
      notes:
        "Coursework: Data Mining & ML, Data Visualization, Programming for Business Analytics, Web Apps, Networking, DB Systems, InfoSec, Software Engineering, BI.",
    },
    {
      school: "Jawaharlal Nehru Institute of Technology",
      location: "Hyderabad, India",
      degree: "Bachelor’s — Computer Science",
    },
  ];

  const certifications = ["AWS Certified Solutions Architect", "CompTIA Security+"];

  const projects: Project[] = [
    {
      name: "Kubernetes GitOps Demo (Argo CD)",
      desc: "Commit → Argo CD sync → rollout with probes and rollback strategy. (Sanitized demo repo)",
      tags: ["Kubernetes", "Argo CD", "GitOps", "Helm"],
      link: github,
      highlights: [
        "Problem: Manual deployments caused inconsistent releases and rollback risk.",
        "Action: Implemented GitOps sync + health checks + progressive rollout pattern.",
        "Impact: Safer releases and faster recovery with repeatable deployments.",
      ],
    },
    {
      name: "Observability & SRE Starter Kit",
      desc: "Dashboards + alert rules + runbooks focused on MTTR reduction and SLO thinking.",
      tags: ["Prometheus", "Grafana", "Runbooks", "SLO/SLI"],
      link: github,
      highlights: [
        "Problem: Alert noise slowed triage and masked real incidents.",
        "Action: Built SLO dashboards, tuned alerts, and added runbooks per service.",
        "Impact: Cleaner signal-to-noise and more consistent incident response.",
      ],
    },
    {
      name: "Terraform EKS Starter",
      desc: "Minimal Terraform patterns for AWS infra + Kubernetes workloads, with teardown guidance.",
      tags: ["Terraform", "AWS", "EKS", "IaC"],
      link: github,
      highlights: [
        "Problem: Drift and slow provisioning across environments.",
        "Action: Standardized IaC modules and pipeline-friendly apply/destroy flow.",
        "Impact: Faster environment setup and better auditability.",
      ],
    },
  ];

  const posts: Post[] = [
    {
      title: "How I Tune Alerts (Symptoms vs Causes)",
      date: "Jan 2026",
      summary:
        "A practical approach to reduce noisy alerts: dedupe, tighten thresholds, use burn-rate alerts, and attach runbooks.",
      tags: ["Alerting", "SRE", "Runbooks"],
    },
    {
      title: "My Incident Response Loop: Triage → RCA → Prevent",
      date: "Jan 2026",
      summary:
        "The exact workflow I follow during on-call: quick mitigation, decision logs, RCA template, and automation to prevent repeats.",
      tags: ["Incident Response", "RCA", "On-call"],
    },
    {
      title: "GitOps Rollout Checklist with Argo CD",
      date: "Jan 2026",
      summary:
        "A checklist for safe deployments using Argo CD: sync waves, health checks, rollback readiness, and progressive delivery.",
      tags: ["GitOps", "Argo CD", "Kubernetes"],
    },
  ];

  const css = useMemo(
    () => `
:root{
  --bg1:#071225;
  --bg2:#0b1430;
  --glass:rgba(255,255,255,.08);
  --stroke:rgba(255,255,255,.14);
  --text:rgba(255,255,255,.92);
  --muted:rgba(255,255,255,.72);
  --muted2:rgba(255,255,255,.58);
  --shadow: 0 30px 70px rgba(0,0,0,.25);
  --r: 22px;
}

*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; }
a{ color: inherit; }

.wrap{
  min-height:100vh;
  color: var(--text);
  background:
    radial-gradient(1200px 700px at 20% 10%, rgba(255, 82, 168, .18), transparent 60%),
    radial-gradient(1100px 700px at 90% 30%, rgba(0, 204, 255, .14), transparent 55%),
    radial-gradient(900px 600px at 60% 90%, rgba(0, 255, 170, .12), transparent 55%),
    linear-gradient(180deg, var(--bg1), var(--bg2));
  position:relative;
  overflow:hidden;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji";
}

/* sticky nav */
.nav{
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(255,255,255,.10);
  background: rgba(6,12,28,.55);
  backdrop-filter: blur(14px);
}
.navInner{
  max-width: 1120px;
  margin: 0 auto;
  padding: 12px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 14px;
}
.brand{
  font-weight: 950;
  letter-spacing: -.01em;
  font-size: 14px;
  opacity:.95;
}
.navLinks{
  display:flex;
  align-items:center;
  gap: 12px;
  flex-wrap:wrap;
}
.navLinks a{
  font-size: 12px;
  color: rgba(255,255,255,.78);
  border-bottom: 1px dashed rgba(255,255,255,.18);
  text-decoration:none;
}
.navLinks a:hover{ opacity:.92; }
.navCta{
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.10);
  font-weight: 800;
}

/* animated blobs */
.blob, .blob2, .blob3{
  position:absolute;
  width: 70vmax;
  height: 70vmax;
  border-radius: 999px;
  filter: blur(55px);
  opacity: .36;
  mix-blend-mode: screen;
  animation: drift 18s ease-in-out infinite;
  pointer-events:none;
}
.blob{
  left:-25vmax; top:-30vmax;
  background: radial-gradient(circle at 35% 35%, rgba(255,0,170,.85), rgba(255,0,170,0) 60%),
              radial-gradient(circle at 70% 70%, rgba(0,220,255,.75), rgba(0,220,255,0) 55%);
}
.blob2{
  right:-28vmax; bottom:-35vmax;
  background: radial-gradient(circle at 40% 40%, rgba(0,255,170,.85), rgba(0,255,170,0) 60%),
              radial-gradient(circle at 65% 35%, rgba(90,120,255,.70), rgba(90,120,255,0) 55%);
  animation-duration: 22s;
}
.blob3{
  right:10vmax; top:10vmax;
  background: radial-gradient(circle at 50% 50%, rgba(170,90,255,.80), rgba(170,90,255,0) 60%),
              radial-gradient(circle at 30% 70%, rgba(255,205,70,.55), rgba(255,205,70,0) 55%);
  animation-duration: 26s;
}
@keyframes drift{
  0%{ transform: translate3d(0,0,0) scale(1); }
  35%{ transform: translate3d(8vmax, 3vmax, 0) scale(1.04); }
  70%{ transform: translate3d(-6vmax, 6vmax, 0) scale(1.02); }
  100%{ transform: translate3d(0,0,0) scale(1); }
}

/* sparkles */
.sparkles{
  position:absolute; inset:0;
  background-image:
    radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px),
    radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px);
  background-size: 60px 60px, 90px 90px;
  background-position: 0 0, 30px 40px;
  opacity:.35;
  animation: twinkle 12s linear infinite;
  pointer-events:none;
}
@keyframes twinkle{
  0%{ transform: translateY(0); }
  100%{ transform: translateY(-80px); }
}

.container{ max-width: 1120px; margin: 0 auto; padding: 26px 16px 72px; position:relative; z-index:1; }

.hero{
  border-radius: calc(var(--r) + 8px);
  background: linear-gradient(180deg, rgba(255,255,255,.11), rgba(255,255,255,.06));
  border: 1px solid var(--stroke);
  box-shadow: var(--shadow);
  overflow:hidden;
  position:relative;
}

.heroInner{ padding: 34px; display:grid; gap:22px; grid-template-columns: 1.2fr .8fr; }
@media (max-width: 900px){ .heroInner{ grid-template-columns: 1fr; } }

.pill{
  display:inline-flex; align-items:center; gap:10px;
  background: rgba(0,0,0,.22);
  border: 1px solid rgba(255,255,255,.16);
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--muted);
}
.dot{ width:8px; height:8px; border-radius:999px; background: rgba(0,255,170,.95); box-shadow: 0 0 24px rgba(0,255,170,.65); }
.h1{ font-size: clamp(34px, 5vw, 62px); line-height: 1.05; font-weight: 900; letter-spacing: -.02em; }
.h2{ font-size: 18px; color: var(--muted); margin-top: 10px; }
.lead{ margin-top: 16px; color: var(--muted); line-height: 1.6; max-width: 68ch; }

.chips{ display:flex; flex-wrap:wrap; gap:10px; margin-top: 18px; }
.chip{
  display:inline-flex; align-items:center; gap:8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.08);
  font-size: 12px;
  color: rgba(255,255,255,.88);
  backdrop-filter: blur(8px);
}
.chipDot{
  width:7px; height:7px; border-radius:999px;
  background: linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.2));
  opacity:.7;
}

.cta{ display:flex; flex-wrap:wrap; gap:12px; margin-top: 22px; }
.btn{
  position:relative;
  overflow:hidden;
  border-radius: 14px;
  padding: 11px 16px;
  font-weight: 800;
  font-size: 14px;
  letter-spacing:.01em;
  border: 1px solid rgba(255,255,255,.18);
  backdrop-filter: blur(10px);
  transition: transform .15s ease, background .15s ease, opacity .15s ease;
  display:inline-flex;
  align-items:center;
  gap:10px;
}
.btn:hover{ transform: translateY(-1px); }
.btnPrimary{
  background: linear-gradient(135deg, rgba(255,255,255,.92), rgba(255,255,255,.72));
  color: rgba(12,18,32,.95);
  border-color: rgba(255,255,255,.22);
}
.btnGhost{
  background: rgba(0,0,0,.18);
  color: rgba(255,255,255,.9);
}
.btnShine{
  position:absolute; inset:-80px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
  transform: translateX(-60%);
  animation: shine 3.4s ease-in-out infinite;
  pointer-events:none;
}
@keyframes shine{
  0%{ transform: translateX(-70%); }
  45%{ transform: translateX(70%); }
  100%{ transform: translateX(70%); }
}

/* right panel */
.panel{
  border-radius: calc(var(--r) + 4px);
  border: 1px solid rgba(255,255,255,.14);
  background: radial-gradient(120% 120% at 20% 10%, rgba(255, 0, 170, .14), transparent 55%),
              radial-gradient(120% 120% at 90% 20%, rgba(0, 220, 255, .12), transparent 55%),
              rgba(0,0,0,.22);
  padding: 16px;
  box-shadow: 0 18px 50px rgba(0,0,0,.25);
  position:relative;
  overflow:hidden;
}
.panel:before{
  content:"";
  position:absolute; inset:0;
  background: linear-gradient(180deg, rgba(255,255,255,.08), transparent);
  opacity:.65;
  pointer-events:none;
}
.panelTitle{ font-size: 13px; font-weight: 900; color: rgba(255,255,255,.88); position:relative; }
.panelGrid{ margin-top: 12px; display:grid; grid-template-columns: 1fr 1fr; gap:10px; position:relative; }
.tile{
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  padding: 12px;
  font-size: 12px;
  color: rgba(255,255,255,.84);
}
.bar{
  margin-top: 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  padding: 12px;
  font-size: 13px;
  position:relative;
  overflow:hidden;
  color: rgba(255,255,255,.82);
}
.bar:after{
  content:"";
  position:absolute; left:-40%; top:0; bottom:0; width: 70%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.10), transparent);
  animation: sweep 2.8s ease-in-out infinite;
}
@keyframes sweep{
  0%{ transform: translateX(-10%); }
  60%{ transform: translateX(180%); }
  100%{ transform: translateX(180%); }
}

/* sections */
.section{ margin-top: 54px; scroll-margin-top: 80px; }
.sectionHead{ margin-bottom: 16px; }
.sectionTitle{
  font-size: 26px;
  font-weight: 950;
  letter-spacing: -.01em;
}
.sectionSub{
  margin-top: 6px;
  color: var(--muted2);
  line-height: 1.6;
  max-width: 80ch;
}

.grid3{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
@media (max-width: 900px){ .grid3{ grid-template-columns: 1fr; } }

.grid2{ display:grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
@media (max-width: 900px){ .grid2{ grid-template-columns: 1fr; } }

.card{
  border-radius: var(--r);
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 18px 45px rgba(0,0,0,.22);
  padding: 16px;
  position:relative;
  overflow:hidden;
}
.card:before{
  content:"";
  position:absolute; inset:0;
  background: radial-gradient(100% 90% at 0% 0%, rgba(255,255,255,.12), transparent 55%);
  opacity:.7;
  pointer-events:none;
}

.miniTitle{ font-weight: 950; font-size: 16px; position:relative; z-index:1; }
.miniSub{ color: var(--muted2); margin-top: 4px; position:relative; z-index:1; }
.miniNote{ margin-top: 10px; color: var(--muted); line-height: 1.6; font-size: 13.5px; position:relative; z-index:1; }

.tileCard{ padding: 18px; }
.bigNum{ font-size: 36px; font-weight: 950; margin-top: 8px; position:relative; z-index:1; }

.cycleWrap{
  border-radius: calc(var(--r) + 6px);
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.06);
  padding: 16px;
  position:relative;
  overflow:hidden;
  box-shadow: var(--shadow);
}
.cycleGlow{
  position:absolute; inset:-40%;
  background: radial-gradient(circle at 30% 20%, rgba(255,0,170,.15), transparent 55%),
              radial-gradient(circle at 75% 30%, rgba(0,220,255,.12), transparent 55%),
              radial-gradient(circle at 60% 85%, rgba(0,255,170,.10), transparent 55%);
  filter: blur(40px);
  opacity:.9;
  pointer-events:none;
}
.cycleGrid{
  position:relative;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
@media (max-width: 900px){ .cycleGrid{ grid-template-columns: 1fr; } }
.cycleCard{
  border-radius: var(--r);
  background: rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.12);
  padding: 14px;
  position:relative;
  overflow:hidden;
}
.cycleTop{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
.cycleBadge{
  display:flex; align-items:center; gap:8px;
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
}
.cycleN{
  width: 22px; height: 22px; border-radius: 999px;
  display:grid; place-items:center;
  background: rgba(0,0,0,.22);
  border: 1px solid rgba(255,255,255,.12);
  font-size: 12px;
  font-weight: 900;
}
.cycleIcon{ font-size: 16px; }
.cycleTitle{ font-weight: 900; }
.cycleDesc{ margin-top: 10px; color: var(--muted2); line-height: 1.55; font-size: 13px; }
.cycleFooter{
  position:relative;
  margin-top: 12px;
  border-radius: var(--r);
  background: rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.12);
  padding: 12px 14px;
  color: rgba(255,255,255,.78);
  font-size: 13px;
}

/* timeline */
.timeline{ position: relative; padding-left: 18px; }
.timelineLine{
  position:absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, rgba(0,220,255,.55), rgba(255,0,170,.40), rgba(0,255,170,.35));
  opacity:.8;
}
.timelineList{ display:grid; gap: 14px; }
.timelineItem{
  position: relative;
  display:grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
  align-items: start;
}
.timelineDot{
  width: 16px; height: 16px;
  border-radius: 999px;
  margin-left: 2px;
  margin-top: 18px;
  border: 1px solid rgba(255,255,255,.22);
  background: rgba(0,220,255,.85);
}
.timelineDot.pink{ background: rgba(255,0,170,.85); box-shadow: 0 0 26px rgba(255,0,170,.25); }
.timelineDot.cyan{ background: rgba(0,220,255,.85); box-shadow: 0 0 26px rgba(0,220,255,.22); }
.timelineDot.emerald{ background: rgba(0,255,170,.85); box-shadow: 0 0 26px rgba(0,255,170,.22); }
.timelineDot.violet{ background: rgba(170,90,255,.85); box-shadow: 0 0 26px rgba(170,90,255,.22); }

.xpTop{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  gap:10px;
  flex-wrap:wrap;
  position:relative;
  z-index:1;
}
.xpRole{ font-weight: 950; font-size: 18px; }
.xpCompany{ color: var(--muted2); font-weight: 800; margin-top: 2px; }
.xpDates{ color: rgba(255,255,255,.55); font-weight: 800; font-size: 13px; }
.xpBullets{ margin-top: 12px; color: var(--muted); line-height: 1.7; font-size: 13.5px; position:relative; z-index:1; }
.xpBullets li{ margin-top: 6px; }

.certRow{ display:flex; flex-wrap:wrap; gap:10px; }
.cert{
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.14);
  font-weight: 900;
  color: rgba(255,255,255,.86);
  font-size: 13px;
  position:relative;
  overflow:hidden;
}
.cert:after{
  content:"";
  position:absolute; inset:-60px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  transform: translateX(-60%);
  animation: shine 3.6s ease-in-out infinite;
}

/* reveal */
.reveal{
  opacity: 0;
  transform: translateY(16px) scale(.99);
  filter: blur(6px);
  transition: opacity .6s ease, transform .6s ease, filter .6s ease;
}
.reveal.in{
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.footer{
  margin-top: 56px;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,.14);
  color: rgba(255,255,255,.55);
  font-size: 13px;
  position:relative;
  z-index:1;
}
.linkLine{
  margin-top: 10px;
  color: rgba(255,255,255,.72);
  font-size: 13px;
  display:flex;
  flex-wrap:wrap;
  gap: 12px;
}
.linkLine a{
  color: rgba(255,255,255,.78);
  border-bottom: 1px dashed rgba(255,255,255,.22);
  text-decoration:none;
}
.linkLine a:hover{ opacity:.92; }
`,
    []
  );

  return (
    <main className="wrap">
      {/* sticky nav */}
      <header className="nav">
        <div className="navInner">
          <div className="brand">{name}</div>
          <nav className="navLinks">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#writing">Writing</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <a className="navCta" href={resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </nav>
        </div>
      </header>

      {/* background layers */}
      <div className="blob" />
      <div className="blob2" />
      <div className="blob3" />
      <div className="sparkles" />

      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="container">
        {/* HERO */}
        <section id="about" className="hero reveal" data-reveal>
          <div className="heroInner">
            <div>
              <div className="pill">
                <span className="dot" />
                DevOps • SRE • Cloud Platform Engineering
              </div>

              <div className="h1">{name}</div>
              <div className="h2">
                {headline} • {location}
              </div>

              <p className="lead">
                I build reliable, scalable, and observable cloud platforms across AWS, Azure, and GCP — with
                Kubernetes, Infrastructure as Code, CI/CD automation, monitoring, and incident response.
              </p>

              <div className="chips">
                {chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>

              <div className="cta">
                <Button href={resume}>Download Resume (PDF)</Button>
                <Button href={linkedin} variant="ghost">
                  LinkedIn
                </Button>
                <Button href={github} variant="ghost">
                  GitHub
                </Button>
                <Button href={`mailto:${email}`} variant="ghost">
                  Email
                </Button>
                <Button href={`tel:${phone}`} variant="ghost">
                  Call
                </Button>
              </div>

              <div className="linkLine">
                <span>Quick links:</span>
                <a href={github} target="_blank" rel="noreferrer">
                  GitHub Profile
                </a>
                <a href={portfolio} target="_blank" rel="noreferrer">
                  Live Site
                </a>
              </div>
            </div>

            {/* Ops panel */}
            <div className="panel">
              <div className="panelTitle">Ops Dashboard Preview</div>
              <div className="panelGrid">
                <div className="tile">✅ Health Probes</div>
                <div className="tile">✅ Rollback Strategy</div>
                <div className="tile">✅ SLO Dashboards</div>
                <div className="tile">✅ Alert Tuning</div>
              </div>
              <div className="bar">Alert → Triage → Mitigate → RCA → Prevent Recurrence</div>
              <div style={{ marginTop: 12 }} className="grid2">
                <div className="card" style={{ padding: 14 }}>
                  <div className="miniTitle">Core Focus</div>
                  <div className="miniNote">Reliability, CI/CD automation, observability, and incident response.</div>
                </div>
                <div className="card" style={{ padding: 14 }}>
                  <div className="miniTitle">Tooling</div>
                  <div className="miniNote">Kubernetes, Terraform, GitHub Actions, Argo CD, Prometheus/Grafana, KQL.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DevOps lifecycle */}
        <Section
          id="lifecycle"
          title="DevOps Lifecycle"
          subtitle="A complete delivery loop recruiters recognize: build fast, deploy safely, operate reliably."
        >
          <DevOpsCycle />
        </Section>

        {/* SRE metrics */}
        <Section
          id="metrics"
          title="SRE Metrics Dashboard"
          subtitle="Representative outcomes that reflect monitoring, automation, and runbooks."
        >
          <div className="grid3">
            {stats.map((t) => (
              <StatTile key={t.k} k={t.k} v={t.v} note={t.note} />
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section
          id="projects"
          title="Projects"
          subtitle="Sanitized demo repos that show what you can ship. Add README + screenshots later."
        >
          <ProjectsGrid projects={projects} />
        </Section>

        {/* Case Studies */}
        <Section
          id="case-studies"
          title="Case Studies"
          subtitle="Resume-backed stories: monitoring, GitOps delivery, and Terraform automation."
        >
          <div className="grid3">
            <div className="card reveal" data-reveal>
              <div className="miniTitle">Reduced alert noise using KQL + Workbooks</div>
              <div className="miniSub" style={{ marginTop: 6 }}>
                Kforce • Application Monitoring SME
              </div>
              <div className="miniNote" style={{ marginTop: 12 }}>
                <b>Problem:</b> High alert volume reduced signal-to-noise and slowed triage.
              </div>
              <div className="miniNote">
                <b>Action:</b> Optimized KQL queries and built dashboards/alerts in Azure Monitor & App Insights.
                Improved runbooks and escalation flow.
              </div>
              <div className="miniNote">
                <b>Impact:</b> Cleaner alerting, faster triage, improved operational consistency.
              </div>
              <div className="chips" style={{ marginTop: 12 }}>
                {["Azure Monitor", "App Insights", "KQL", "Workbooks", "xMatters"].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="card reveal" data-reveal>
              <div className="miniTitle">Safer delivery with GitHub Actions + Argo CD (GitOps)</div>
              <div className="miniSub" style={{ marginTop: 6 }}>
                LexisNexis • Senior DevOps Engineer
              </div>
              <div className="miniNote" style={{ marginTop: 12 }}>
                <b>Problem:</b> Deployments needed better repeatability, speed, and reliability.
              </div>
              <div className="miniNote">
                <b>Action:</b> Implemented CI in GitHub Actions and GitOps CD via Argo CD. Added readiness checks,
                health probes, and rollback strategy.
              </div>
              <div className="miniNote">
                <b>Impact:</b> Higher confidence releases with reduced deployment risk.
              </div>
              <div className="chips" style={{ marginTop: 12 }}>
                {["GitHub Actions", "Argo CD", "Kubernetes", "Helm", "SRE Practices"].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="card reveal" data-reveal>
              <div className="miniTitle">Terraform Enterprise automation across Azure + AWS</div>
              <div className="miniSub" style={{ marginTop: 6 }}>
                LexisNexis • Senior DevOps Engineer
              </div>
              <div className="miniNote" style={{ marginTop: 12 }}>
                <b>Problem:</b> Manual provisioning caused drift and slowed platform changes.
              </div>
              <div className="miniNote">
                <b>Action:</b> Standardized infra using Terraform Enterprise across Azure (AKS/DNS/MySQL Flexible
                Server) and AWS (EKS/EC2). Integrated secrets via Vault.
              </div>
              <div className="miniNote">
                <b>Impact:</b> Faster changes, reduced drift, improved auditability and consistency.
              </div>
              <div className="chips" style={{ marginTop: 12 }}>
                {["Terraform Enterprise", "AKS", "EKS", "Vault", "IAM"].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Architecture */}
        <Section
          id="architecture"
          title="Architecture"
          subtitle="A clean diagram aligned with your toolchain: CI/CD, Kubernetes, secrets, observability."
        >
          <ArchitectureDiagram />
        </Section>

        {/* Writing */}
        <Section
          id="writing"
          title="Writing"
          subtitle="Short posts that show how you think: alerting, incident response, SLOs, GitOps."
        >
          <WritingGrid posts={posts} />
        </Section>

        {/* Experience */}
        <Section id="experience" title="Experience Timeline" subtitle="4 companies • DevOps • SRE • Monitoring • Platform Engineering">
          <Timeline items={experience} />
        </Section>

        {/* Education */}
        <Section id="education" title="Education" subtitle="Formal foundation + relevant coursework">
          <div className="grid2">
            {education.map((ed) => (
              <div key={ed.school} className="card reveal" data-reveal>
                <div className="miniTitle">
                  {ed.school}
                  {ed.location ? ` • ${ed.location}` : ""}
                </div>
                <div className="miniSub">{ed.degree}</div>
                {ed.notes ? <div className="miniNote">{ed.notes}</div> : null}
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section id="certifications" title="Certifications" subtitle="Quick trust signals for recruiters">
          <div className="certRow">
            {certifications.map((c) => (
              <div key={c} className="cert reveal" data-reveal>
                ✅ {c}
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact" subtitle="Make it effortless for recruiters to reach you">
          <div className="grid2">
            <div className="card reveal" data-reveal>
              <div className="miniTitle">Email</div>
              <div className="miniSub">
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div className="miniNote">Best for scheduling and recruiter follow-ups.</div>
            </div>
            <div className="card reveal" data-reveal>
              <div className="miniTitle">Phone</div>
              <div className="miniSub">
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
              <div className="miniNote">Available for quick calls and screening interviews.</div>
            </div>
          </div>

          <div className="cta" style={{ marginTop: 14 }}>
            <Button href={resume}>Resume (PDF)</Button>
            <Button href={linkedin} variant="ghost">
              LinkedIn
            </Button>
            <Button href={github} variant="ghost">
              GitHub
            </Button>
          </div>
        </Section>

        <footer className="footer reveal" data-reveal>
          © {new Date().getFullYear()} {name} • {headline} • Live: {portfolio}
        </footer>
      </div>
    </main>
  );
}
