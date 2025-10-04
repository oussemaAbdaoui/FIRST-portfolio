"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Target,
  TrendingUp,
  Zap,
  Bot,
  Grid3x3,
  List,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AnimatedGridBackground } from "@/components/animated-grid-bg"
import { SkillsCarousel3D, skillCards } from "@/components/skills-carousel-3d"
import { ProjectsCarousel3D, projects } from "@/components/projects-carousel-3d"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllSkills, setShowAllSkills] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "experience", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatedGridBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-pink flex items-center justify-center font-bold text-background">
                AO
              </div>
              <span className="font-semibold hidden sm:block">Abdaoui Oussama</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Projects", "Skills", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-cyan ${
                    activeSection === item.toLowerCase() ? "text-cyan" : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="https://github.com"
                target="_blank"
                className="text-muted-foreground hover:text-cyan transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-muted-foreground hover:text-cyan transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:oussama5abdaoui@gmail.com"
                className="text-muted-foreground hover:text-cyan transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {["Home", "Projects", "Skills", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-cyan hover:bg-accent rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-accent rounded-full text-sm text-muted-foreground">
            Good afternoon
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <span className="text-cyan">ABDAOUI OUSSAMA</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-4">AI/ML & LLM Engineering Specialist</p>

          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Building Intelligent Systems at the Intersection of Robotics and Financial AI
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan to-pink hover:opacity-90 text-background font-semibold"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-cyan text-cyan hover:bg-cyan/10 bg-transparent">
              Download CV
            </Button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "∞", label: "Problem Solving Enthusiast", icon: Target, color: "text-lime" },
              { value: "15+", label: "Projects Completed", icon: TrendingUp, color: "text-cyan" },
              { value: "25+", label: "Technologies", icon: Zap, color: "text-pink" },
              { value: "98%", label: "Success Rate", icon: Bot, color: "text-orange" },
            ].map((metric, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-cyan/50 transition-all hover:shadow-lg hover:shadow-cyan/20"
              >
                <metric.icon className={`w-8 h-8 ${metric.color} mb-3 mx-auto`} />
                <div className={`text-3xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">
              Innovative solutions in AI, robotics, and financial technology
            </p>
          </div>

          {!showAllProjects ? (
            <ProjectsCarousel3D />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-card border-2 hover:border-opacity-100 transition-all overflow-hidden hover:scale-105"
                  style={{
                    borderColor: project.accentColor,
                  }}
                >
                  <div className="aspect-video relative overflow-hidden bg-background">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2" style={{ color: project.accentColor }}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: `${project.accentColor}20`,
                            color: project.accentColor,
                            borderColor: `${project.accentColor}40`,
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }} />
                          <span className="font-semibold" style={{ color: metric.color }}>
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="border-cyan text-cyan hover:bg-cyan/10 bg-transparent"
              size="lg"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              <Grid3x3 className="w-4 h-4 mr-2" />
              {showAllProjects ? "Show Carousel" : "View All Projects"}
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-4 bg-accent/30 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-muted-foreground text-lg">Expertise across AI, robotics, and software engineering</p>
          </div>

          {!showAllSkills ? (
            <SkillsCarousel3D />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCards.map((card) => (
                <Card
                  key={card.id}
                  className="bg-card border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: card.accentColor,
                  }}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{card.icon}</div>
                      <div>
                        <Badge
                          variant="secondary"
                          className="mb-2"
                          style={{
                            backgroundColor: `${card.accentColor}20`,
                            color: card.accentColor,
                            borderColor: `${card.accentColor}40`,
                          }}
                        >
                          {card.category}
                        </Badge>
                        <h3 className="text-lg font-bold" style={{ color: card.accentColor }}>
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{card.description}</p>

                    <div className="space-y-2">
                      {card.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{skill.projects} projects</span>
                              <span className="text-xs font-semibold" style={{ color: card.accentColor }}>
                                {skill.level}%
                              </span>
                            </div>
                          </div>
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: card.accentColor,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">Featured in:</p>
                      <p className="text-sm font-semibold" style={{ color: card.accentColor }}>
                        {card.featuredProject}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="border-pink text-pink hover:bg-pink/10 bg-transparent"
              size="lg"
              onClick={() => setShowAllSkills(!showAllSkills)}
            >
              <List className="w-4 h-4 mr-2" />
              {showAllSkills ? "Show Carousel" : "View All Skills"}
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-24 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <p className="text-muted-foreground text-lg">Professional journey and achievements</p>
          </div>

          <div className="space-y-8">
            {/* Experience 1 */}
            <Card className="p-6 bg-card border-border hover:border-cyan/50 transition-all">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan to-pink flex items-center justify-center">
                    <Bot className="w-8 h-8 text-background" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">AI Engineering Intern</h3>
                    <span className="text-sm text-muted-foreground">2024</span>
                  </div>
                  <p className="text-cyan font-semibold mb-3">TeratoSoft</p>
                  <p className="text-muted-foreground mb-4">
                    Developed advanced AI systems for navigation and financial forecasting, achieving top-tier
                    performance metrics
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                      <span className="text-sm">Designed SAAM Architecture for LLM-based robot navigation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan mt-1 flex-shrink-0" />
                      <span className="text-sm">Achieved Top 15% ranking in Mitsui Commodity Challenge</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "PyTorch", "LLM", "LangGraph"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-cyan/10 text-cyan border-cyan/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Experience 2 */}
            <Card className="p-6 bg-card border-border hover:border-lime/50 transition-all">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-lime to-cyan flex items-center justify-center">
                    <Target className="w-8 h-8 text-background" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">IEEE President - Robotics & Automation</h3>
                    <span className="text-sm text-muted-foreground">2023-2024</span>
                  </div>
                  <p className="text-lime font-semibold mb-3">IEEE Student Branch</p>
                  <p className="text-muted-foreground mb-4">
                    Led team of 15 members, organized technical workshops and competitions
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-lime mt-1 flex-shrink-0" />
                      <span className="text-sm">Achieved 40% membership growth</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-lime mt-1 flex-shrink-0" />
                      <span className="text-sm">Organized 20+ technical workshops</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Leadership", "Event Management", "Robotics", "Team Building"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-lime/10 text-lime border-lime/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-4 bg-accent/30 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">
              If you would like to discuss a project or just say hi, I'm always down to chat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card border-border hover:border-cyan/50 transition-all text-center">
              <Mail className="w-8 h-8 text-cyan mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <a
                href="mailto:oussama5abdaoui@gmail.com"
                className="text-sm text-muted-foreground hover:text-cyan transition-colors"
              >
                oussama5abdaoui@gmail.com
              </a>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-pink/50 transition-all text-center">
              <Phone className="w-8 h-8 text-pink mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <a href="tel:+21653334828" className="text-sm text-muted-foreground hover:text-pink transition-colors">
                +216 53 334 828
              </a>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-lime/50 transition-all text-center">
              <MapPin className="w-8 h-8 text-lime mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">Ariana, Tunisia</p>
            </Card>
          </div>

          <Card className="p-8 bg-card border-border">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-cyan to-pink hover:opacity-90 text-background font-semibold"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Abdaoui Oussama. Crafted with passion.</p>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-cyan transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-cyan transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:oussama5abdaoui@gmail.com"
              className="text-sm text-muted-foreground hover:text-cyan transition-colors"
            >
              Email
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
