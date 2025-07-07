"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUp,
  Globe,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Definir el tipo de idioma
type Language = "es" | "en"

const projectsData: Record<
  Language,
  Array<{
    id: number
    title: string
    description: string
    image: string
    tech: string[]
    category: string
    url: string
    details: string
  }>
> = {
  es: [
    {
      id: 1,
      title: "UNAL Facultad de Economía - Micrositios",
      description:
        "Gestión de aproximadamente 20 micrositios para cada departamento de la facultad, creados con Joomla. Responsabilidades incluyen actualización de banners, noticias, información, etc.",
      image: "/portafolio/images/unal-fce-screenshot.png",
      tech: ["Joomla", "WordPress", "PHP", "MySQL", "CMS"],
      category: "Educativo",
      url: "https://fce.unal.edu.co/facultad/",
      details:
        "Administración completa de micrositios departamentales para la Facultad de Ciencias Económicas de la Universidad Nacional. Incluye gestión de contenidos, actualización de información académica, mantenimiento de banners promocionales y desarrollo de funcionalidades adicionales en WordPress.",
    },
    {
      id: 2,
      title: "Plataforma de Elecciones FCE",
      description:
        "Plataforma para realizar elecciones dentro de la facultad, desarrollada en WordPress con funcionalidades de votación segura.",
      image: "/portafolio/images/elecciones-fce-screenshot.png",
      tech: ["WordPress", "PHP", "Security", "Voting System"],
      category: "Sistemas",
      url: "https://fce.unal.edu.co/fce_elecciones",
      details:
        "Sistema de votación electrónica seguro para procesos democráticos internos de la facultad. Incluye autenticación de usuarios, registro de votos, conteo automático y generación de reportes de resultados.",
    },
    {
      id: 3,
      title: "Fonquímicas - Extractos Bancarios",
      description:
        "Sitio de extractos bancarios donde usuarios pueden consultar sus extractos con seguridad. Plataforma desarrollada en WordPress con altos estándares de seguridad.",
      image: "/portafolio/images/fonquimicas-screenshot.png",
      tech: ["WordPress", "Security", "Banking", "User Authentication"],
      category: "Fintech",
      url: "https://fonquimicas.com/statements/",
      details:
        "Plataforma segura para consulta de extractos bancarios con sistema de autenticación robusta. Implementa medidas de seguridad avanzadas para proteger información financiera sensible y proporciona una interfaz intuitiva para usuarios.",
    },
    {
      id: 4,
      title: "Pasión Thermomix",
      description:
        "Trabajo en actualizaciones de plantillas para optimización de página e implementación de integraciones de pago con bancos. Mantenimiento continuo.",
      image: "/portafolio/images/thermomix-screenshot.png",
      tech: ["WordPress", "Payment Gateway", "Bank Integration", "Optimization"],
      category: "E-commerce",
      url: "https://www.pasionthermomix.co/",
      details:
        "Optimización y mantenimiento de sitio e-commerce especializado en productos Thermomix. Implementación de pasarelas de pago bancarias, mejoras de rendimiento, actualizaciones de seguridad y soporte técnico continuo.",
    },
    {
      id: 5,
      title: "Puja Grupal",
      description:
        "Sitio de e-commerce que realizaba subastas de productos, trabajando por medio de dropshipping, desarrollado en WordPress.",
      image: "/placeholder.svg?height=300&width=500&text=Puja+Grupal",
      tech: ["WordPress", "E-commerce", "Dropshipping", "Auction System"],
      category: "Marketplace",
      url: "https://pujagrupal.com",
      details:
        "Plataforma innovadora de subastas grupales con modelo de dropshipping. Sistema de pujas en tiempo real, gestión de inventario automatizada, integración con proveedores y procesamiento de pagos seguros.",
    },
    {
      id: 6,
      title: "Ponderosa Flowers",
      description: "Sitio básico informativo desarrollado en WordPress para empresa del sector floricultor.",
      image: "/portafolio/images/ponderosa-screenshot.png",
      tech: ["WordPress", "Responsive Design", "SEO"],
      category: "Corporativo",
      url: "https://ponderosa-flowers.com/",
      details:
        "Sitio web corporativo informativo para empresa especializada en flores. Diseño responsivo, optimización SEO, galería de productos y formularios de contacto para consultas comerciales.",
    },
    {
      id: 7,
      title: "B2B Solución",
      description: "Sitio básico informativo desarrollado en WordPress para empresa de soluciones empresariales.",
      image: "/portafolio/images/b2b-solucion-screenshot.png",
      tech: ["WordPress", "Corporate Design", "Responsive"],
      category: "Corporativo",
      url: "https://b2bsolucion.com",
      details:
        "Portal corporativo para empresa de soluciones B2B. Presenta servicios empresariales, casos de éxito, información de contacto y formularios para solicitud de cotizaciones.",
    },
  ],
  en: [
    {
      id: 1,
      title: "UNAL Faculty of Economics - Microsites",
      description:
        "Management of approximately 20 microsites for each faculty department, created with Joomla. Responsibilities include updating banners, news, information, etc.",
      image: "/portafolio/images/unal-fce-screenshot.png",
      tech: ["Joomla", "WordPress", "PHP", "MySQL", "CMS"],
      category: "Educational",
      url: "https://fce.unal.edu.co/facultad/",
      details:
        "Complete administration of departmental microsites for the Faculty of Economic Sciences at Universidad Nacional. Includes content management, academic information updates, promotional banner maintenance, and additional WordPress functionality development.",
    },
    {
      id: 2,
      title: "FCE Elections Platform",
      description:
        "Platform for conducting elections within the faculty, developed in WordPress with secure voting functionalities.",
      image: "/portafolio/images/elecciones-fce-screenshot.png",
      tech: ["WordPress", "PHP", "Security", "Voting System"],
      category: "Systems",
      url: "https://fce.unal.edu.co/fce_elecciones",
      details:
        "Secure electronic voting system for internal democratic processes of the faculty. Includes user authentication, vote registration, automatic counting, and results report generation.",
    },
    {
      id: 3,
      title: "Fonquímicas - Bank Statements",
      description:
        "Bank statements site where users can securely consult their statements. Platform developed in WordPress with high security standards.",
      image: "/portafolio/images/fonquimicas-screenshot.png",
      tech: ["WordPress", "Security", "Banking", "User Authentication"],
      category: "Fintech",
      url: "https://fonquimicas.com/statements/",
      details:
        "Secure platform for bank statement consultation with robust authentication system. Implements advanced security measures to protect sensitive financial information and provides an intuitive interface for users.",
    },
    {
      id: 4,
      title: "Pasión Thermomix",
      description:
        "Work on template updates for page optimization and implementation of payment integrations with banks. Continuous maintenance.",
      image: "/portafolio/images/thermomix-screenshot.png",
      tech: ["WordPress", "Payment Gateway", "Bank Integration", "Optimization"],
      category: "E-commerce",
      url: "https://www.pasionthermomix.co/",
      details:
        "Optimization and maintenance of e-commerce site specialized in Thermomix products. Implementation of bank payment gateways, performance improvements, security updates, and continuous technical support.",
    },
    {
      id: 5,
      title: "Puja Grupal",
      description:
        "E-commerce site that conducted product auctions, working through dropshipping, developed in WordPress.",
      image: "/placeholder.svg?height=300&width=500&text=Puja+Grupal",
      tech: ["WordPress", "E-commerce", "Dropshipping", "Auction System"],
      category: "Marketplace",
      url: "https://pujagrupal.com",
      details:
        "Innovative group auction platform with dropshipping model. Real-time bidding system, automated inventory management, supplier integration, and secure payment processing.",
    },
    {
      id: 6,
      title: "Ponderosa Flowers",
      description: "Basic informational site developed in WordPress for a floriculture company.",
      image: "/portafolio/images/ponderosa-screenshot.png",
      tech: ["WordPress", "Responsive Design", "SEO"],
      category: "Corporate",
      url: "https://ponderosa-flowers.com/",
      details:
        "Corporate informational website for a flower-specialized company. Responsive design, SEO optimization, product gallery, and contact forms for commercial inquiries.",
    },
    {
      id: 7,
      title: "B2B Solución",
      description: "Basic informational site developed in WordPress for a business solutions company.",
      image: "/portafolio/images/b2b-solucion-screenshot.png",
      tech: ["WordPress", "Corporate Design", "Responsive"],
      category: "Corporate",
      url: "https://b2bsolucion.com",
      details:
        "Corporate portal for B2B solutions company. Features business services, success stories, contact information, and forms for quote requests.",
    },
  ],
}

const skillsData: Record<Language, string[]> = {
  es: [
    "Joomla",
    "WordPress",
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Responsive Design",
    "SEO",
    "UX/UI",
    "Git",
    "API Integration",
    "Payment Gateways",
    "E-commerce",
    "CMS Management",
    "Security",
  ],
  en: [
    "Joomla",
    "WordPress",
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Responsive Design",
    "SEO",
    "UX/UI",
    "Git",
    "API Integration",
    "Payment Gateways",
    "E-commerce",
    "CMS Management",
    "Security",
  ],
}

const translations: Record<
  Language,
  {
    nav: {
      home: string
      about: string
      portfolio: string
      contact: string
    }
    hero: {
      title: string
      subtitle: string
      description: string
    }
    about: {
      title: string
      description1: string
      description2: string
      skillsTitle: string
      downloadCV: string
      downloadCVEn: string
    }
    portfolio: {
      title: string
      description: string
      viewDetails: string
      visitSite: string
    }
    contact: {
      title: string
      description: string
      info: string
      ready: string
      whatsappText: string
      whatsappButton: string
    }
    footer: {
      title: string
      subtitle: string
      rights: string
    }
  }
> = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      portfolio: "Portafolio",
      contact: "Contacto",
    },
    hero: {
      title: "Juan Camilo",
      subtitle: "Ingeniero de Sistemas y Computación – UNAL",
      description: "Transformo ideas en soluciones digitales funcionales y visuales",
    },
    about: {
      title: "Sobre Mí",
      description1:
        "Ingeniero de Sistemas y Computación graduado de la Universidad Nacional de Colombia, enfocado en el desarrollo de soluciones web robustas y escalables. Mi experiencia abarca desde sitios corporativos hasta plataformas complejas de e-commerce y sistemas de gestión.",
      description2:
        "Me apasiona crear experiencias digitales que no solo sean funcionales, sino también intuitivas y visualmente atractivas. Trabajo principalmente con Joomla, WordPress y tecnologías web modernas para entregar soluciones que superen las expectativas de mis clientes.",
      skillsTitle: "Tecnologías y Habilidades",
      downloadCV: "Descargar CV (Español)",
      downloadCVEn: "Download CV (English)",
    },
    portfolio: {
      title: "Mi Portafolio",
      description:
        "Explora algunos de los proyectos en los que he trabajado, desde sitios educativos hasta plataformas de e-commerce complejas.",
      viewDetails: "Ver Detalles",
      visitSite: "Visitar Sitio",
    },
    contact: {
      title: "Trabajemos Juntos",
      description: "¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a hacerlas realidad.",
      info: "Información de Contacto",
      ready: "¿Listo para trabajar juntos?",
      whatsappText: "Contáctame directamente por WhatsApp para discutir tu proyecto",
      whatsappButton: "Escribir por WhatsApp",
    },
    footer: {
      title: "Juan Camilo Campos",
      subtitle: "Ingeniero de Sistemas y Computación – Universidad Nacional de Colombia",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      title: "Juan Camilo",
      subtitle: "Computer Systems Engineer – UNAL",
      description: "I transform ideas into functional and visual digital solutions",
    },
    about: {
      title: "About Me",
      description1:
        "Computer Systems Engineer graduated from Universidad Nacional de Colombia, specialized in developing robust and scalable web solutions. My experience ranges from corporate websites to complex e-commerce platforms and management systems.",
      description2:
        "I am passionate about creating digital experiences that are not only functional, but also intuitive and visually appealing. I work mainly with Joomla, WordPress and modern web technologies to deliver solutions that exceed my clients' expectations.",
      skillsTitle: "Technologies and Skills",
      downloadCV: "Download CV (Spanish)",
      downloadCVEn: "Download CV (English)",
    },
    portfolio: {
      title: "My Portfolio",
      description:
        "Explore some of the projects I have developed, from educational sites to complex e-commerce platforms.",
      viewDetails: "View Details",
      visitSite: "Visit Site",
    },
    contact: {
      title: "Let's Work Together",
      description: "Do you have a project in mind? I would love to hear your ideas and help you make them a reality.",
      info: "Contact Information",
      ready: "Ready to work together?",
      whatsappText: "Contact me directly via WhatsApp to discuss your project",
      whatsappButton: "Write on WhatsApp",
    },
    footer: {
      title: "Juan Camilo Campos",
      subtitle: "Computer Systems Engineer – Universidad Nacional de Colombia",
      rights: "All rights reserved.",
    },
  },
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState<Language>("es")
  const [selectedProject, setSelectedProject] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const t = translations[language]
  const projects = projectsData[language]
  const skills = skillsData[language]

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    // Check for saved preferences
    const savedTheme = localStorage.getItem("theme")
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedTheme === "dark") {
      setIsDarkMode(true)
    }
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")
  }

  const toggleLanguage = () => {
    const newLanguage: Language = language === "es" ? "en" : "es"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)
      setShowScrollTop(scrollTop > 300)

      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animate-fade-in-up")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const whatsappMessage =
    language === "es"
      ? "Hola%20Juan%20Camilo,%20me%20interesa%20hablar%20contigo%20sobre%20un%20proyecto%20web"
      : "Hello%20Juan%20Camilo,%20I'm%20interested%20in%20talking%20to%20you%20about%20a%20web%20project"

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div
            className={`font-bold transition-all duration-300 ${
              scrolled ? "text-lg text-white" : "text-xl text-white"
            }`}
          >
            Juan Camilo Campos
          </div>

          <div className="hidden md:flex space-x-8">
            {["inicio", "sobre-mi", "portafolio", "contacto"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative text-white/90 hover:text-white transition-all duration-300 group py-2"
              >
                {section === "inicio"
                  ? t.nav.home
                  : section === "sobre-mi"
                    ? t.nav.about
                    : section === "portafolio"
                      ? t.nav.portfolio
                      : t.nav.contact}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="p-2 text-white hover:bg-white/20">
              <Globe className="h-4 w-4 mr-1" />
              {language === "es" ? "EN" : "ES"}
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="p-2 text-white hover:bg-white/20">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-2 space-y-2">
              {["inicio", "sobre-mi", "portafolio", "contacto"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-3 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  {section === "inicio"
                    ? t.nav.home
                    : section === "sobre-mi"
                      ? t.nav.about
                      : section === "portafolio"
                        ? t.nav.portfolio
                        : t.nav.contact}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-24 lg:pt-16"
      >
        {/* Background with Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 z-20"></div>
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-20 z-30">
            <div className="absolute top-20 left-20 w-32 h-32 border border-orange-500/30 rotate-45"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border border-blue-500/30 rotate-12"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 border border-purple-500/30 rotate-45"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 border border-orange-500/30 rotate-12"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rotate-45"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-40 text-center px-4 max-w-5xl mx-auto mt-8 md:mt-0">
          <div className="hero-content">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight hero-title">
              {t.hero.title} <span className="text-orange-500">Campos</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-4 hero-subtitle">{t.hero.subtitle}</p>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto hero-description">
              {t.hero.description}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 bg-gray-900 dark:bg-gray-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-purple-500/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <div className="relative">
                  <div className="w-80 h-80 mx-auto overflow-hidden rounded-2xl border-4 border-orange-500/20">
                    <Image
                      src="/portafolio/images/juan-camilo-photo.jpeg"
                      alt="Juan Camilo Campos"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/20 rounded-full blur-xl"></div>
                </div>
              </div>

              <div className="animate-on-scroll">
                <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
                  <span className="w-12 h-1 bg-orange-500 mr-4"></span>
                  {t.about.title}
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">{t.about.description1}</p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">{t.about.description2}</p>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-8 h-1 bg-orange-500 mr-3"></span>
                    {t.about.skillsTitle}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30 transition-colors px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                  >
                    <Link href="/images/Juan_Camilo_Campos_CV_es.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      {t.about.downloadCV}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
                  >
                    <Link href="/images/Juan_Camilo_Campos_CV_en.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      {t.about.downloadCVEn}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Link href="https://co.linkedin.com/in/juan-camilo-campos-romero" target="_blank">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portafolio" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <span className="w-12 h-1 bg-orange-500 mr-4"></span>
              {t.portfolio.title}
              <span className="w-12 h-1 bg-orange-500 ml-4"></span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.portfolio.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 animate-on-scroll bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-500 text-white shadow-lg">{project.category}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs border-gray-300 dark:border-gray-600">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent hover:bg-orange-50 hover:border-orange-300 dark:hover:bg-orange-500/10"
                        >
                          {t.portfolio.viewDetails}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{project.title}</DialogTitle>
                          <DialogDescription>{project.details}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="w-full rounded-lg"
                          />
                          {project.url && (
                            <div className="mt-4">
                              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  {t.portfolio.visitSite}
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {project.url && (
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                        asChild
                      >
                        <Link href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-900 dark:bg-gray-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-purple-500/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                <span className="w-12 h-1 bg-orange-500 mr-4"></span>
                {t.contact.title}
                <span className="w-12 h-1 bg-orange-500 ml-4"></span>
              </h2>
              <p className="text-xl text-gray-300">{t.contact.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:items-center">
              <div className="animate-on-scroll">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-8 h-1 bg-orange-500 mr-3"></span>
                  {t.contact.info}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-orange-500" />
                    </div>
                    <span className="text-gray-300">jccamposro@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-orange-500" />
                    </div>
                    <span className="text-gray-300">+57 304 2121011</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Linkedin className="h-5 w-5 text-orange-500" />
                    </div>
                    <Link
                      href="https://co.linkedin.com/in/juan-camilo-campos-romero"
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn Profile
                    </Link>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll">
                <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-semibold text-white mb-4">{t.contact.ready}</h3>
                  <p className="text-gray-300 mb-6">{t.contact.whatsappText}</p>
                  <Button
                    asChild
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
                  >
                    <Link
                      href={`https://wa.me/573042121011?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      {t.contact.whatsappButton}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-110"
          size="sm"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{t.footer.title}</h3>
            <p className="text-gray-400 mb-6">{t.footer.subtitle}</p>
            <div className="flex justify-center space-x-6 mb-8">
              <Link href="mailto:jccamposro@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </Link>
              <Link
                href="https://co.linkedin.com/in/juan-camilo-campos-romero"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href={`https://wa.me/573042121011?text=${whatsappMessage}`}
                className="text-gray-400 hover:text-green-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Juan Camilo Campos. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
