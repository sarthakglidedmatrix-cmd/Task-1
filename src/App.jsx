import { useEffect, useRef } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "Real Estate Website",
    text: "A responsive property experience with reusable listing, search and navigation components.",
    tags: ["React", "Tailwind"],
  },
  {
    number: "02",
    title: "Music Player UI",
    text: "A polished streaming-style interface with player controls, navigation and responsive layouts.",
    tags: ["React", "Vite"],
  },
  {
    number: "03",
    title: "Web UI Concepts",
    text: "Modern interface explorations focused on clarity, component-based structure and great UX.",
    tags: ["JavaScript", "UI/UX"],
  },
];

function WebParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame;
    let width;
    let height;
    let particles = [];
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from(
        { length: Math.min(58, Math.max(28, Math.floor(width / 24))) },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          size: Math.random() * 1.4 + 0.45,
        }),
      );
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
      particles.forEach((one, i) => {
        particles.slice(i + 1).forEach((two) => {
          const distance = Math.hypot(one.x - two.x, one.y - two.y);
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(211, 38, 43, ${0.17 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.65;
            ctx.moveTo(one.x, one.y);
            ctx.lineTo(two.x, two.y);
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.fillStyle = "rgba(241, 234, 222, .44)";
        ctx.arc(one.x, one.y, one.size, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas className="web-particles" ref={canvasRef} aria-hidden="true" />
  );
}

export default function App() {
  return (
    <main>
      <WebParticles />
      <nav>
        <a className="brand" href="#home">
          SARTHAK<span>CHANDEL</span>
        </a>
        <div className="links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <section className="hero" id="home">
        <p className="eyebrow">HELLO, I AM</p>
        <h1>
          Sarthak
          <br />
          Chandel<span>.</span>
        </h1>
        <p className="intro">
          An AI-driven web UI developer creating clean, responsive and
          user-friendly digital experiences.
        </p>
        <div className="actions">
          <a className="button primary" href="#work">
            View my work <span>→</span>
          </a>
          <a className="button ghost" href="#contact">
            Let's talk
          </a>
        </div>
        <p className="scroll">
          SCROLL TO EXPLORE <span>↓</span>
        </p>
      </section>
      <section className="about section" id="about">
        <p className="eyebrow">01 / ABOUT ME</p>
        <div className="about-grid">
          <h2>
            Building the web,
            <br />
            <em>one idea at a time.</em>
          </h2>
          <div>
            <p>
              B.Tech CSE (AI/ML) graduate and detail-oriented UI developer,
              focused on responsive web experiences, clean interfaces and
              component-based development.
            </p>
            <div className="skills">
              <span>React.js</span>
              <span>JavaScript</span>
              <span>HTML5</span>
              <span>CSS3</span>
              <span>Tailwind CSS</span>
              <span>REST APIs</span>
            </div>
          </div>
        </div>
      </section>
      <section className="work section" id="work">
        <p className="eyebrow">02 / SELECTED WORK</p>
        <h2>A few things I’ve made.</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <small>{project.number}</small>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href="#contact" aria-label={`Ask about ${project.title}`}>
                ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="contact section" id="contact">
        <p className="eyebrow">03 / CONTACT</p>
        <h2>
          Have an idea?
          <br />
          <em>Let’s make it real.</em>
        </h2>
        <a className="email" href="mailto:chandel1234sarthak@gmail.com">
          chandel1234sarthak@gmail.com <span>↗</span>
        </a>
      </section>
      <footer>
        <span>© 2026 SARTHAK CHANDEL</span>
        <span>DESIGNED WITH CARE</span>
      </footer>
    </main>
  );
}
