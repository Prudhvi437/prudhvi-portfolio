function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
      {children}
    </span>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">{title}</h2>
      {subtitle ? <p className="mt-2 text-white/70">{subtitle}</p> : null}
    </div>
  );
}

function Card({
  title,
  desc,
  icon,
  footer,
}: {
  title: string;
  desc: string;
  icon?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-lg">
            {icon}
          </div>
        ) : null}
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          <p className="mt-1 text-sm text-white/75 leading-relaxed">{desc}</p>
        </div>
      </div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}

function DevOpsCycle() {
  const steps = [
    { t: "Plan", d: "Architecture, standards, security baseline" },
    { t: "Code", d: "App + IaC + config as code (PR reviews)" },
    { t: "Build", d: "CI builds, artifact versioning" },
    { t: "Test", d: "Quality gates, policy checks, scans" },
    { t: "Release", d: "Approvals, progressive delivery plan" },
    { t: "Deploy", d: "GitOps sync, probes, canary/rollback" },
    { t: "Operate", d: "On-call, incident mgmt, cost tuning" },
    { t: "Monitor", d: "Metrics/logs/traces, alert tuning, SLOs" },
    { t: "Improve", d: "RCA → automation → fewer repeats" },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap gap-2">
        {steps.map((s, idx) => (
          <span
            key={s.t}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 px-4 py-2 text-sm text-white/90"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-xs">
              {idx + 1}
            </span>
            <span className="font-semibold">{s.t}</span>
            <span className="text-white/60 hidden md:inline">— {s.d}</span>
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
        🔁 This runs in a loop: <span className="text-white font-semibold">Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Improve</span>
      </div>
    </div>
  );
}

export default function Page() {
  // Update LinkedIn when ready
  const name = "Prudhvi Gantam";
  const title = "DevOps / SRE Engineer";
  const location = "Texas, USA";
  const email = "Prudvi.gantam@gmail.com";
  const github = "https://github.com/Prudhvi437";
  const linkedin = "https://www.linkedin.com/in/prudhvidev/"; // replace later

  // If you add your resume file later, put it here:
  // public/Prudhvi_Gantam_Resume.pdf
  const resume = "/Prudhvi_Gantam_Resume.pdf";

  const quickStats = [
    { k: "Cloud", v: "AWS • Azure • GCP", icon: "☁️" },
    { k: "Platform", v: "Kubernetes (AKS/EKS) + Helm", icon: "⚙️" },
    { k: "Automation", v: "Terraform, GitHub Actions, Argo CD", icon: "🤖" },
    { k: "SRE", v: "On-call, Incident Response, RCA, SLOs", icon: "🛡️" },
  ];

  const skills = [
    { icon: "☁️", title: "Cloud", desc: "AWS (EKS/EC2/RDS/S3/CloudWatch), Azure (AKS/Azure Monitor/App Insights), GCP (GKE/GAE)" },
    { icon: "🧱", title: "Infrastructure as Code", desc: "Terraform (incl. Terraform Enterprise), CloudFormation, Ansible" },
    { icon: "🚀", title: "CI/CD & GitOps", desc: "GitHub Actions, Argo CD, Jenkins, Azure DevOps, GitLab" },
    { icon: "📈", title: "Observability", desc: "Prometheus, Grafana, Azure Monitor (KQL), Splunk, CloudWatch" },
    { icon: "🔐", title: "Security", desc: "HashiCorp Vault, IAM, encryption, DevSecOps practices" },
    { icon: "🧰", title: "Scripting", desc: "Python, Bash/Shell, PowerShell, Go (and more as needed)" },
  ];

  const projects = [
    {
      name: "Kubernetes GitOps Demo (Argo CD)",
      desc: "Demo repo that shows GitOps flow: commit → Argo CD sync → rollout with probes and rollback strategy.",
      tags: ["Kubernetes", "Argo CD", "GitOps"],
      link: github,
    },
    {
      name: "Observability & SRE Starter Kit",
      desc: "Dashboards + alert rules + runbooks template focused on MTTR reduction and SLO thinking.",
      tags: ["Prometheus", "Grafana", "Runbooks"],
      link: github,
    },
    {
      name: "Terraform EKS Starter",
      desc: "Minimal Terraform patterns for AWS infra + Kubernetes workloads, including teardown and best practices.",
      tags: ["Terraform", "AWS", "EKS"],
      link: github,
    },
  ];

  const experience = [
    {
      role: "Application Monitoring SME",
      company: "Kforce Inc.",
      dates: "Oct 2025 – Present",
      bullets: [
        "Azure Monitor / Application Insights / Workbooks monitoring for availability and performance.",
        "Built and optimized KQL dashboards + alerts for distributed cloud apps.",
        "Incident triage + telemetry analysis; coordinated response; maintained runbooks and RCA notes.",
      ],
    },
    {
      role: "Senior DevOps Engineer",
      company: "LexisNexis Risk Solutions",
      dates: "May 2023 – Sep 2025",
      bullets: [
        "Terraform Enterprise automation across Azure (AKS, DNS, MySQL Flexible Server) and AWS (EKS, EC2).",
        "CI/CD with GitHub Actions + Argo CD; readiness checks and rollback strategies.",
        "Kubernetes optimization for 20+ microservices: tuning/autoscaling/storage improvements.",
      ],
    },
    {
      role: "DevOps / Cloud Engineer",
      company: "Salient Global Technologies",
      dates: "Nov 2022 – Apr 2023",
      bullets: [
        "Managed 500+ GCP clusters (GKE/GAE) using Spinnaker and Spinnaker Operator.",
        "EKS deployments + monitoring using Prometheus/Grafana/CloudWatch.",
        "Built Go-based logging tooling integrated with Vault.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-64 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-64 -right-40 h-[520px] w-[520px] rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12">
        {/* Header / Hero */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                DevOps • SRE • Cloud Platform
              </div>

              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
                {name}
              </h1>
              <p className="mt-3 text-lg md:text-xl text-white/80">
                {title} • {location}
              </p>

              <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                I build reliable cloud platforms using Kubernetes, Infrastructure as Code, CI/CD automation,
                and observability. I support production systems with on-call, incident response, and continuous improvement.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>AWS</Badge>
                <Badge>Azure</Badge>
                <Badge>GCP</Badge>
                <Badge>Kubernetes</Badge>
                <Badge>Terraform</Badge>
                <Badge>GitHub Actions</Badge>
                <Badge>Argo CD</Badge>
                <Badge>Prometheus</Badge>
                <Badge>Grafana</Badge>
                <Badge>KQL</Badge>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-white/90"
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                  href={`mailto:${email}`}
                >
                  Email
                </a>
                <a
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                  href={resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume (PDF)
                </a>
              </div>
            </div>

            {/* “Screenshot-style” visual panel (no images) */}
            <div className="md:w-[420px]">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/15 via-cyan-500/10 to-emerald-500/15 p-5">
                <div className="text-sm font-semibold text-white/90">Production Readiness Snapshot</div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/80">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">✅ Health Probes</div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">✅ Rollback Strategy</div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">✅ SLO Dashboards</div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">✅ Alert Tuning</div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/70">Example: incident flow</div>
                  <div className="mt-2 text-sm">
                    <span className="text-white/90">Alert</span> →{" "}
                    <span className="text-white/90">Triage</span> →{" "}
                    <span className="text-white/90">Mitigate</span> →{" "}
                    <span className="text-white/90">RCA</span> →{" "}
                    <span className="text-white/90">Fix & Automate</span>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {quickStats.map((s) => (
                    <div key={s.k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{s.k}</div>
                        <div className="text-lg">{s.icon}</div>
                      </div>
                      <div className="mt-1 text-sm text-white/75">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DevOps Cycle */}
        <section className="mt-12">
          <SectionHeader
            title="DevOps Cycle"
            subtitle="This is how I deliver and operate software reliably (end-to-end)."
          />
          <DevOpsCycle />
        </section>

        {/* Skills */}
        <section className="mt-12">
          <SectionHeader title="Skills" subtitle="Tools and practices I use in production environments." />
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((s) => (
              <Card key={s.title} title={s.title} desc={s.desc} icon={s.icon} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-12">
          <SectionHeader title="Projects" subtitle="Demo/sanitized projects that prove my DevOps skills." />
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <div key={p.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-lg font-bold text-white">{p.name}</div>
                <p className="mt-2 text-sm text-white/75">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-white/90"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Repo
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mt-12">
          <SectionHeader title="Experience" subtitle="Highlights from production operations, monitoring, and platform engineering." />
          <div className="space-y-4">
            {experience.map((e) => (
              <div key={`${e.company}-${e.role}`} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <div className="text-xl font-bold text-white">{e.role}</div>
                    <div className="text-sm text-white/70">{e.company}</div>
                  </div>
                  <div className="text-sm text-white/60">{e.dates}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {e.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 border-t border-white/10 pt-6 text-sm text-white/60">
          © {new Date().getFullYear()} {name} • Built with Next.js + Tailwind
        </footer>
      </div>
    </main>
  );
}
