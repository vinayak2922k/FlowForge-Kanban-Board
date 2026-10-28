import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Heart,
  Award,
  Send,
  Globe,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function AboutView({ onSwitchToKanban }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const developerInfo = {
    name: 'Vinayak Sharma',
    role: 'Associate Software Engineer | Full-Stack Developer',
    education: 'Prodesk IT — Sprint 05 Final Project',
    location: 'India',
    email: 'vinayaksharma2289@gmail.com',
    github: 'https://github.com/vinayak2922k',
    linkedin: 'https://www.linkedin.com/in/vinayak2922k',
    portfolio: 'https://flow-forge-kanban-board.vercel.app/'
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const techStack = [
    { name: 'React 18', desc: 'Functional Architecture & Hooks', icon: Code2, color: 'indigo' },
    { name: 'Vite 6', desc: 'Lightning Fast ESM Bundling', icon: Cpu, color: 'violet' },
    { name: '@dnd-kit', desc: 'Accessible Drag-and-Drop Core', icon: Layers, color: 'amber' },
    { name: 'Pure CSS3', desc: 'Custom Tokens, Grid & Glassmorphism', icon: Sparkles, color: 'emerald' },
    { name: 'LocalStorage', desc: 'Resilient Offline State Sync', icon: ShieldCheck, color: 'cyan' },
    { name: 'Vercel Edge', desc: 'Global Low-Latency Deployment', icon: Globe, color: 'indigo' }
  ];

  return (
    <div className="about-container">
      {/* Developer Hero Profile Card */}
      <section className="about-hero-card">
        <div className="about-profile-header">
          <div className="about-avatar-ring">
            <div className="about-avatar-inner">VS</div>
            <div className="status-indicator-dot" title="Available for opportunities" />
          </div>

          <div className="about-profile-info">
            <div className="about-badge-row">
              <span className="hero-badge">
                <Sparkles size={13} className="icon-mr" />
                Crafted by Vinayak Sharma
              </span>
              <span className="available-pill">
                <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                Open to Opportunities
              </span>
            </div>

            <h2 className="about-name">{developerInfo.name}</h2>
            <p className="about-role">{developerInfo.role}</p>
            <p className="about-bio">
              Frontend specialist passionate about building world-class productivity tools, elegant user interfaces,
              and resilient software architectures. FlowForge was designed and engineered for the <strong>Prodesk IT Sprint 05</strong> assignment.
            </p>

            {/* Quick Action Contact Pills */}
            <div className="about-quick-links">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="icon-mr" />
                    Copied Email!
                  </>
                ) : (
                  <>
                    <Copy size={14} className="icon-mr" />
                    Copy Email ({developerInfo.email})
                  </>
                )}
              </button>

              <a
                href={developerInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Github size={15} className="icon-mr" />
                GitHub Profile
                <ExternalLink size={12} style={{ marginLeft: 6, opacity: 0.7 }} />
              </a>

              <a
                href={developerInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Linkedin size={15} className="icon-mr" />
                LinkedIn
                <ExternalLink size={12} style={{ marginLeft: 6, opacity: 0.7 }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Cards Grid */}
      <div className="social-cards-grid">
        {/* GitHub Card */}
        <a
          href={developerInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="social-card social-github"
        >
          <div className="social-card-top">
            <div className="social-icon-box github-box">
              <Github size={24} />
            </div>
            <ExternalLink size={16} className="text-muted" />
          </div>
          <h3 className="social-card-title">GitHub</h3>
          <p className="social-card-handle">@vinayak2922k</p>
          <span className="social-card-footer-text">Explore repositories, commits & source code →</span>
        </a>

        {/* LinkedIn Card */}
        <a
          href={developerInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-card social-linkedin"
        >
          <div className="social-card-top">
            <div className="social-icon-box linkedin-box">
              <Linkedin size={24} />
            </div>
            <ExternalLink size={16} className="text-muted" />
          </div>
          <h3 className="social-card-title">LinkedIn</h3>
          <p className="social-card-handle">in/vinayak-sharma</p>
          <span className="social-card-footer-text">Connect professionally & endorse skills →</span>
        </a>

        {/* Email Direct Card */}
        <a
          href={`mailto:${developerInfo.email}?subject=Hello%20Vinayak%20-%20From%20FlowForge`}
          className="social-card social-email"
        >
          <div className="social-card-top">
            <div className="social-icon-box email-box">
              <Mail size={24} />
            </div>
            <ExternalLink size={16} className="text-muted" />
          </div>
          <h3 className="social-card-title">Direct Email</h3>
          <p className="social-card-handle">{developerInfo.email}</p>
          <span className="social-card-footer-text">Send an inquiry or project proposal →</span>
        </a>
      </div>

      {/* Two Column Section: Project Philosophy & Interactive Quick Message */}
      <div className="about-grid-two">
        {/* Project Architecture & Engineering Notes */}
        <div className="overview-card">
          <div className="overview-card-header">
            <div className="overview-card-title-group">
              <Award size={18} className="text-primary-500 icon-mr" />
              <h3 className="overview-card-title">Project Mission & Architecture</h3>
            </div>
            <span className="text-muted text-xs">Sprint 05</span>
          </div>

          <p className="about-subtext" style={{ marginBottom: 16 }}>
            <strong>FlowForge</strong> was built from scratch with zero boilerplate. It features a complete unidirectional React data pipeline, custom `@dnd-kit` collision detection with pointer sensors, resilient `localStorage` synchronization, and a custom Linear/Raycast design system.
          </p>

          <div className="tech-stack-mini-grid">
            {techStack.map((tech) => {
              const TechIcon = tech.icon;
              return (
                <div key={tech.name} className="tech-mini-item">
                  <div className={`tech-mini-icon-wrap tech-${tech.color}`}>
                    <TechIcon size={16} />
                  </div>
                  <div className="tech-mini-info">
                    <span className="tech-mini-name">{tech.name}</span>
                    <span className="tech-mini-desc">{tech.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20 }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onSwitchToKanban}
            >
              Back to Kanban Board
              <ArrowRight size={14} style={{ marginLeft: 6 }} />
            </button>
          </div>
        </div>

        {/* Direct Contact / Message Form */}
        <div className="overview-card">
          <div className="overview-card-header">
            <div className="overview-card-title-group">
              <Send size={18} className="text-primary-500 icon-mr" />
              <h3 className="overview-card-title">Get in Touch with Vinayak</h3>
            </div>
            <span className="text-muted text-xs">Quick Contact</span>
          </div>

          {contactSubmitted ? (
            <div className="contact-success-state">
              <div className="empty-state-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Check size={28} />
              </div>
              <h4 className="empty-state-title" style={{ color: '#047857' }}>Message Recorded!</h4>
              <p className="empty-state-desc">
                Thank you for reaching out! You can also email directly at <strong>{developerInfo.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input form-input-sm"
                  placeholder="e.g. Alex Mercer"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input form-input-sm"
                  placeholder="e.g. alex@company.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-msg">Message or Feedback</label>
                <textarea
                  id="contact-msg"
                  className="form-textarea form-input-sm"
                  rows={3}
                  placeholder="Say hello, share feedback on FlowForge, or discuss collaboration..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 4 }}>
                <Send size={14} className="icon-mr" />
                Send Message to Vinayak
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

