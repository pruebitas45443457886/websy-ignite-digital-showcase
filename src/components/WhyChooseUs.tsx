import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Code, Database, Wrench, Zap, Wallet, Heart, Award, Search, ArrowRight, CheckCircle, Lightbulb, BarChart, Headphones } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/animation";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  highlight?: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, index, highlight, className }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.5, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        transition: { duration: 0.3 }
      }}
      className={`relative p-8 feature-card overflow-hidden ${className}`}
      style={{
        background: `${COLORS.darkBackground}99`,
        backdropFilter: "blur(12px)",
        border: `1px solid ${COLORS.mediumBackground}30`,
        borderRadius: "16px",
        transition: "all 0.4s ease"
      }}
    >
      {/* Decorative gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at top right, ${COLORS.highlight}30, transparent 70%)`,
          zIndex: -1
        }}
      />
      
      {/* Feature Icon */}
      <div 
        className="feature-icon-wrapper p-4 rounded-xl mb-6 inline-flex items-center justify-center relative"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.darkBackground}99, ${COLORS.mediumBackground}40)`,
          border: `1px solid ${COLORS.mediumBackground}40`,
        }}
      >
        <div 
          className="absolute inset-0 opacity-30 rounded-xl"
          style={{ 
            background: `radial-gradient(circle at center, ${COLORS.highlight}40, transparent 70%)`,
            filter: "blur(8px)"
          }}
        />
        <div className="relative z-10">
          {icon}
        </div>
      </div>
      
      {/* Feature Content */}
      <h3 
        className="text-xl font-bold mb-4"
        style={{ color: COLORS.highlight }}
      >
        {title}
      </h3>
      
      <p className="text-foreground-muted leading-relaxed">
        {description}
      </p>
      
      {/* Highlight Info */}
      {highlight && (
        <div 
          className="mt-4 px-4 py-3 rounded-lg text-sm"
          style={{ 
            background: `${COLORS.darkBackground}99`,
            border: `1px dashed ${COLORS.mediumBackground}60`,
          }}
        >
          <div className="flex items-start">
            <CheckCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" style={{ color: COLORS.highlight }} />
            <span>{highlight}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for the glow orbs
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (glowRef.current) {
            gsap.to(glowRef.current.children, {
              y: (index) => (self.progress * -100) * (index + 1) * 0.5,
              x: (index) => Math.sin(self.progress * Math.PI * 2) * (index + 1) * 20,
              rotation: self.progress * 360,
              duration: 0.5
            });
          }
        }
      });

      // Text animation when in view
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(".why-choose-title .char", {
            opacity: 0,
            scale: 0.5,
            y: 20,
            rotationX: -90,
            stagger: 0.03,
            duration: 1,
            ease: "back.out(1.7)",
          });

          gsap.from(".why-choose-subtitle", {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
          });
        },
        once: true
      });

      // Counter animation for the metrics
      ScrollTrigger.create({
        trigger: ".why-choose-metrics",
        start: "top 80%",
        onEnter: () => {
          gsap.from(".metric-value", {
            textContent: 0,
            duration: 2,
            snap: { textContent: 1 },
            ease: "power2.out",
            stagger: 0.2
          });
        },
        once: true
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Create arrays for each column with different offsets for staggered appearance
  const leftColumnFeatures = [
    {
      icon: <Code className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "Desarrollo Full Stack",
      description: "Creamos soluciones web completas desde el frontend visual hasta APIs robustas y bases de datos optimizadas.",
      highlight: "React, Next.js, Node.js, TypeScript"
    },
    {
      icon: <Search className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "SEO Avanzado",
      description: "Optimizamos cada aspecto de tu web para que los motores de búsqueda la posicionen en los primeros resultados.",
      highlight: "Incrementos de tráfico orgánico de hasta 300%"
    },
    {
      icon: <Wrench className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "Mantenimiento Continuo",
      description: "No desaparecemos después del lanzamiento. Ofrecemos soporte técnico y actualizaciones constantes.",
      highlight: "Soporte premium 24/7"
    }
  ];

  const rightColumnFeatures = [
    {
      icon: <Zap className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "Rendimiento Ultrarrápido",
      description: "Desarrollamos sitios optimizados para carga instantánea y experiencia de usuario fluida en todos los dispositivos.",
      highlight: "Google PageSpeed 90+"
    },
    {
      icon: <Database className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "Automatización & IA",
      description: "Implementamos flujos de trabajo automatizados e inteligencia artificial para potenciar tu negocio.",
      highlight: "Reducción de hasta 70% en tareas manuales"
    },
    {
      icon: <Wallet className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "ROI Garantizado",
      description: "No solo construimos webs bonitas, diseñamos herramientas que generan conversiones y ventas reales.",
      highlight: "Incremento promedio de conversión: 35%"
    }
  ];

  const centerColumnFeatures = [
    {
      icon: <Heart className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "Diseño UX Centrado en Usuario",
      description: "Creamos interfaces intuitivas que encantan a los usuarios y facilitan la conversión.",
      highlight: "Reducción del 50% en tasa de rebote"
    },
    {
      icon: <Award className="w-8 h-8" style={{ color: COLORS.highlight }} />,
      title: "Calidad Premium",
      description: "Cada línea de código y elemento visual cumple con los más altos estándares de calidad de la industria.",
      highlight: "Certificación ISO 27001 en seguridad"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="por-que-elegirnos"
      className="relative py-24 overflow-hidden"
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.darkBackground}, ${COLORS.darkBackground}F0)` 
      }}
    >
      {/* Decorative Elements */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `${COLORS.darkAccent}15`, zIndex: 0 }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: `${COLORS.highlight}10`, zIndex: 0 }}
        />
        <div 
          className="absolute top-1/3 left-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: `${COLORS.mediumBackground}10`, zIndex: 0 }}
        />
      </div>

      {/* Decorative Dots Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEnIGhlaWdodD0nMScgZmlsbD0nI2ZmZmZmZicgLz4KPC9zdmcn')]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={textRef} className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center mb-6 py-2 px-4 rounded-full why-choose-badge"
            style={{ 
              background: `${COLORS.darkBackground}99`,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${COLORS.mediumBackground}40`,
            }}
          >
            <Lightbulb className="w-4 h-4 mr-2" style={{ color: COLORS.highlight }} />
            <span className="text-sm font-medium" style={{ color: COLORS.highlight }}>
              NUESTRAS VENTAJAS COMPETITIVAS
            </span>
          </div>

          {/* Section Title with Character Animation */}
          <h2 
            className="text-5xl md:text-6xl font-black mb-6 why-choose-title"
            style={{ 
              background: `linear-gradient(to right, #ffffff, ${COLORS.highlight}, #ffffff)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            ¿Por qué elegir Websy?
          </h2>

          {/* Premium Separator */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-16 rounded" style={{ background: COLORS.highlight }}></div>
            <div className="mx-3">
              <Award className="w-6 h-6" style={{ color: COLORS.highlight }} />
            </div>
            <div className="h-1 w-16 rounded" style={{ background: COLORS.highlight }}></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto why-choose-subtitle">
            No solo construimos páginas web, creamos <span className="font-bold" style={{ color: COLORS.highlight }}>máquinas de crecimiento digital</span> que convierten visitantes en clientes y expanden tu negocio.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 why-choose-metrics">
          {[
            { value: 150, label: "Proyectos exitosos", icon: <CheckCircle className="w-6 h-6" /> },
            { value: 99.9, label: "Uptime garantizado", icon: <Award className="w-6 h-6" /> },
            { value: 35, label: "Aumento promedio en conversiones", icon: <BarChart className="w-6 h-6" /> },
            { value: 24, label: "Soporte técnico (horas)", icon: <Headphones className="w-6 h-6" /> }
          ].map((metric, index) => (
            <div 
              key={index}
              className="text-center p-8 transform hover:-translate-y-2 transition-all duration-300"
              style={{ 
                background: index === 1 ? `linear-gradient(135deg, ${COLORS.darkBackground}, ${COLORS.mediumBackground}70)` : 'transparent',
                borderRadius: '16px',
                backdropFilter: index === 1 ? 'blur(10px)' : 'none',
                boxShadow: index === 1 ? `0 20px 40px -10px ${COLORS.darkBackground}99` : 'none',
                border: index === 1 ? `1px solid ${COLORS.mediumBackground}40` : 'none',
              }}
            >
              <div 
                className="mb-4 mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{ 
                  background: `${COLORS.darkBackground}99`,
                  border: `1px solid ${COLORS.mediumBackground}40`
                }}
              >
                <div style={{ color: COLORS.highlight }}>{metric.icon}</div>
              </div>
              <div className="flex items-center justify-center mb-2">
                <span 
                  className="text-4xl font-black metric-value"
                  style={{ color: COLORS.highlight }}
                >
                  {metric.value}
                </span>
                {metric.value !== Math.round(metric.value) && <span style={{ color: COLORS.highlight }}>%</span>}
              </div>
              <div className="text-foreground-muted font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* 3-Column Feature Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-8">
            {leftColumnFeatures.map((feature, index) => (
              <FeatureCard
                key={`left-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                highlight={feature.highlight}
                index={index}
              />
            ))}
          </div>
          
          <div className="space-y-8 md:mt-12">
            {centerColumnFeatures.map((feature, index) => (
              <FeatureCard
                key={`center-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                highlight={feature.highlight}
                index={index + 3}
                className="border-2"
                // Add extra styling for center column
              />
            ))}
          </div>

          <div className="space-y-8">
            {rightColumnFeatures.map((feature, index) => (
              <FeatureCard
                key={`right-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                highlight={feature.highlight}
                index={index + 5}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="p-10 text-center rounded-2xl relative mt-24 overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.darkBackground}99, ${COLORS.mediumBackground}80)`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${COLORS.mediumBackground}30`,
            boxShadow: `0 40px 80px -20px ${COLORS.darkBackground}99`
          }}
        >
          {/* Decorative elements */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.highlight}80, transparent 70%)`,
              filter: 'blur(40px)',
              transformOrigin: 'center',
              animation: 'pulse 8s infinite alternate'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.lightAccent}80, transparent 70%)`,
              filter: 'blur(40px)',
              transformOrigin: 'center',
              animation: 'pulse 12s infinite alternate-reverse'
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: COLORS.highlight }}
            >
              ¿Listo para transformar tu presencia digital?
            </h3>
            <p className="text-xl text-foreground-muted mb-10">
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a construir una web que realmente impulse tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="group text-lg px-8 py-6 relative"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.highlight}, ${COLORS.lightAccent})`,
                  boxShadow: `0 10px 20px -5px ${COLORS.highlight}50`
                }}
              >
                Solicitar presupuesto
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6"
                style={{ 
                  borderColor: `${COLORS.mediumBackground}80`,
                  color: COLORS.highlight
                }}
              >
                Ver nuestro portfolio
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
