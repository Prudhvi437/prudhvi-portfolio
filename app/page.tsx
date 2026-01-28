"use client";

export default function Page() {
  const name = "Prudhvi Gantam";
  const title = "DevOps / SRE Engineer";
  const location = "Texas, USA";

  const email = "prudvi.gantam@gmail.com";
  const phone = "+1 940-205-8765";

  const github = "https://github.com/Prudhvi437";
  const linkedin = "PASTE_YOUR_LINKEDIN_URL_HERE";
  const portfolio = "https://prudhvi-portfolio-two.vercel.app/";

  const skills = [
    "AWS",
    "Azure",
    "GCP",
    "Kubernetes (AKS/EKS)",
    "Terraform Enterprise",
    "GitHub Actions",
    "Argo CD (GitOps)",
    "Prometheus",
    "Grafana",
    "Azure Monitor (KQL)",
    "CloudWatch",
    "Splunk",
    "Vault",
    "SLO / SLA",
    "Incident Response",
  ];

  const experience = [
    {
      role: "Application Monitoring SME",
      company: "Kforce Inc.",
      dates: "Oct 2025 – Present",
      bullets: [
        "Azure Monitor, Application Insights, and Workbooks monitoring for enterprise applications.",
        "Built and optimized KQL dashboards and alerts to improve visibility and reduce noise.",
        "Incident triage using telemetry analysis; collaborated with DevOps and app teams.",
        "On-call support with xMatters; improved runbooks and RCA documentation.",
      ],
    },
    {
      role: "Senior DevOps Engineer",
      company: "LexisNexis Risk Solutions",
      dates: "May 2023 – Sep 2025",
      bullets: [
        "Automated infrastructure using Terraform Enterprise across Azure and AWS.",
        "Built CI/CD pipelines using GitHub Actions and Argo CD (GitOps).",
        "Optimized Kubernetes hosting 20+ microservices for performance and cost.",
        "Defined SLIs/SLOs and participated in on-call and incident response.",
      ],
    },
    {
      role: "DevOps / Cloud Engineer",
      company: "Salient Global Technologies",
      dates: "Nov 2022 – Apr 2023",
      bullets: [
        "Managed 500+ GCP clusters (GKE/GAE) using Spinnaker.",
        "Deployed applications to AWS EKS with monitoring using Prometheus and Grafana.",
        "Built Go-based logging tools integrated with HashiCorp Vault.",
      ],
    },
    {
      role: "System Administrator / DevOps Engineer",
      company: "Kantar GDC India Pvt. Ltd.",
      dates: "Jul 2019 – Dec 2021",
      bullets: [
        "Managed Linux servers and automated configuration with Bash and Ansible.",
        "Migrated on-prem infrastructure to AWS EC2 and S3.",
        "Implemented CI/CD using Jenkins and Git.",
        "Set up monitoring with Nagios, New Relic, and Splunk.",
      ],
    },
  ];

  const education = [
    {
      school: "University of North Texas",
      degree: "Master’s in Information Systems & Technology",
    },
    {
      school: "Jawaharlal Nehru Institute of Technology, Hyderabad",
      degree: "Bachelor’s in Computer Science",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 animate-pulse bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-emerald-900/40" />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* HERO */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold">{name}</h1>
          <p className="mt-2 text-xl text-white/80">
            {title} • {location}
          </p>
          <p className="mt-4 max-w-2xl text-white/70">
            DevOps / SRE Engineer with 5+ years of experience building, automating,
            and operating scalable cloud platforms across AWS, Azure, and GCP.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={portfolio} target="_blank" className="btn-primary">Portfolio</a>
            <a href={github} target="_blank" className="btn-outline">GitHub</a>
            <a href={linkedin} target="_blank" className="btn-outline">LinkedIn</a>
            <a href={`mailto:${email}`} className="btn-outline">{email}</a>
            <a href={`tel:${phone}`} className="btn-outline">{phone}</a>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <h2 className="section-title">Experience</h2>
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={e.company} className="card">
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-bold">{e.role}</h3>
                    <p className="text-white/70">{e.company}</p>
                  </div>
                  <span className="text-white/50">{e.dates}</span>
                </div>
                <ul className="mt-4 list-disc list-inside text-white/75 space-y-1">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <h2 className="section-title">Education</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((ed) => (
              <div key={ed.school} className="card">
                <h3 className="font-bold">{ed.school}</h3>
                <p className="text-white/70">{ed.degree}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center text-white/50 text-sm">
          © {new Date().getFullYear()} {name} • {portfolio}
        </footer>
      </div>

      <style jsx global>{`
        .btn-primary {
          background: white;
          color: black;
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 600;
        }
        .btn-outline {
          border: 1px solid rgba(255,255,255,.2);
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 600;
        }
        .section-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .card {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          padding: 1.5rem;
          border-radius: 1.5rem;
        }
      `}</style>
    </main>
  );
}
