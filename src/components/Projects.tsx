import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "@/lib/animation";
import p1 from "@/assets/projects/project1.jpg";
import p2 from "@/assets/projects/project2.jpg";
import p3 from "@/assets/projects/project3.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: p1,
    title: "Ecommerce de Moda",
    description: "Tienda en línea con checkout optimizado y recomendaciones con IA.",
    tags: ["Next.js", "Stripe", "Supabase", "AI"]
  },
  {
    image: p2,
    title: "Landing de SaaS",
    description: "Landing page de alto impacto con conversiones +35% mediante A/B Testing.",
    tags: ["Vite", "Tailwind", "Analytics"]
  },
  {
    image: p3,
    title: "Integración IA Soporte",
    description: "Chatbot inteligente con base de conocimiento y tono de marca.",
    tags: ["OpenAI", "Embeddings", "RAG"]
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Fix: Delay initialization to ensure DOM is ready
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Fix: Check for scroll container first
        const scrollContainer = document.querySelector('[data-scroll-container]') || 
                              document.getElementById('scroll-container');
                               
        // Animate heading with clip path reveal
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current, 
            {
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1.2,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
                // Fix: Use document.body as fallback
                scroller: scrollContainer || document.body
              }
            }
          );
        }
      
        // Animate project cards with staggered reveal
        if (projectsRef.current) {
          const projectCards = projectsRef.current.children;
          
          gsap.from(projectCards, {
            y: 100,
            opacity: 0,
            scale: 0.8,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play none none none",
              // Fix: Use previously found scrollContainer
              scroller: scrollContainer || document.body
            }
          });
          
          // Add hover animation for each card
          Array.from(projectCards).forEach((card) => {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                y: -15,
                scale: 1.05,
                boxShadow: `0 30px 60px -10px ${COLORS.darkBackground}CC`,
                duration: 0.4,
                ease: "power2.out"
              });
              
              // Animate the image inside
              const image = card.querySelector('img');
              if (image) {
                gsap.to(image, {
                  scale: 1.1,
                  duration: 0.8,
                  ease: "power2.out"
                });
              }
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: `0 15px 30px -10px ${COLORS.darkBackground}80`,
                duration: 0.5,
                ease: "power2.inOut"
              });
              
              // Reset image animation
              const image = card.querySelector('img');
              if (image) {
                gsap.to(image, {
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.inOut"
                });
              }
            });
          });
        }
      }, sectionRef);
      
      return () => ctx.revert();
    }, 500); // Use 500ms delay to ensure DOM is ready
    
    // Cleanup timer on component unmount
    return () => clearTimeout(initTimer);
  }, []);
  return (
    <section 
      id="proyectos" 
      className="py-24 relative"
      ref={sectionRef}
      data-scroll-section
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: COLORS.mediumBackground }}
          data-scroll
          data-scroll-speed="2"
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: COLORS.accentBackground }}
          data-scroll
          data-scroll-speed="-1"
        ></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-scroll data-scroll-speed="0.3">
          <div className="overflow-hidden">
            <h2 
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.lightAccent}, ${COLORS.highlight})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Helvetica, Arial, sans-serif'
              }}
            >
              Casos de éxito
            </h2>
          </div>
          <p 
            className="text-xl text-foreground-muted max-w-3xl mx-auto"
            data-scroll
            data-scroll-speed="0.5"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Resultados reales en diferentes industrias y tamaños de empresa.
          </p>
        </div>

        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-animate="container"
        >
          {projects.map((p, i) => (
            <article 
              key={p.title} 
              className="rounded-2xl overflow-hidden"
              style={{ 
                background: `${COLORS.darkBackground}95`,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${COLORS.mediumBackground}40`,
                boxShadow: `0 15px 30px -10px ${COLORS.darkBackground}80`,
                transform: 'translateZ(0)'
              }}
              data-animate="item"
              data-scroll
              data-scroll-speed={0.1 * (i + 1)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={p.image} 
                  alt={`Proyecto Websy: ${p.title}`} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  data-animate="image"
                />
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: COLORS.highlight, fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  {p.title}
                </h3>
                <p className="text-foreground-muted mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span 
                      key={t} 
                      className="text-xs px-3 py-1 rounded-full text-foreground-muted"
                      style={{ 
                        background: `${COLORS.darkBackground}`,
                        border: `1px solid ${COLORS.mediumBackground}60`
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Custom CTA button with animation */}
        <div 
          className="mt-16 text-center"
          data-scroll
          data-scroll-speed="0.2"
        >
          <button 
            className="px-8 py-4 rounded-xl text-white font-medium inline-flex items-center gap-2 overflow-hidden relative group"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.darkBackground}, ${COLORS.mediumBackground})`,
              boxShadow: `0 10px 20px -5px ${COLORS.darkBackground}80`
            }}
          >
            <span className="relative z-10">Ver todos los proyectos</span>
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.mediumBackground}, ${COLORS.lightAccent})`,
              }}
            ></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;