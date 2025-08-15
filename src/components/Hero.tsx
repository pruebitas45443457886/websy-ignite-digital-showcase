import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Zap, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SimpleSplitText } from "@/lib/SplitText";
import { COLORS } from "@/lib/animation";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorationRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Creamos una timeline maestra más sofisticada
      const masterTl = gsap.timeline({
        onStart: () => console.log("⚡ Iniciando animaciones premium"),
        onComplete: () => console.log("✨ Animaciones hero completas")
      });
      
      // Animación de entrada inicial - efecto de revelación
      masterTl.add(() => {
        const overlayTl = gsap.timeline();
        
        // Primero cubrimos toda la pantalla con un overlay
        overlayTl.to(".hero-overlay", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.2,
          ease: "power4.inOut"
        });
        
        return overlayTl;
      }, 0);
      
      // Split text animation con mayor impacto visual
      if (headingRef.current) {
        masterTl.add(() => {
          const headingTl = gsap.timeline();
          
          const splitHeading = new SimpleSplitText(headingRef.current, {
            linesClass: "split-line",
            wordsClass: "split-word",
            charsClass: "split-char"
          });
          
          // Primero animamos línea por línea
          headingTl.from(splitHeading.lines, {
            opacity: 0,
            y: 120,
            rotateX: -50,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
          });
          
          // Luego caracter por caracter para mayor impacto
          headingTl.from(splitHeading.chars, {
            opacity: 0,
            y: 20,
            rotationX: -90,
            stagger: 0.02,
            duration: 1,
            ease: "back.out(1.7)"
          }, "-=0.7");
          
          // Agregamos un resplandor sutil al texto principal
          headingTl.to(".gradient-text", {
            textShadow: "0 0 20px rgba(255,255,255,0.5)",
            color: "#fff",
            duration: 1,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut"
          }, "-=0.4");
          
          // Cleanup
          return () => splitHeading.revert();
          
          return headingTl;
        }, "+=0.2");
      }

      // Animación mejorada del badge con efecto de desenfoque
      masterTl.add(() => {
        const badgeTl = gsap.timeline();
        
        // Primero un flash para llamar la atención
        badgeTl.fromTo(badgeRef.current, 
          { filter: "blur(10px)", opacity: 0, scale: 1.5 },
          { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
        );
        
        // Luego un efecto elástico mejorado
        badgeTl.fromTo(badgeRef.current, 
          { y: -80 },
          { y: 0, duration: 1.2, ease: "elastic.out(1, 0.4)" },
          "-=0.3"
        );
        
        // Efecto de brillo en el badge
        badgeTl.to(badgeRef.current, {
          boxShadow: "0 0 30px rgba(255,255,255,0.4)",
          duration: 0.6,
          repeat: 1,
          yoyo: true
        }, "-=0.6");
        
        return badgeTl;
      }, "-=0.5");

      // Animación mejorada para estadísticas
      masterTl.add(() => {
        const statsTl = gsap.timeline();
        
        // Animamos los contenedores
        statsTl.from(statsRef.current?.children || [], {
          y: 100,
          opacity: 0,
          scale: 0.8,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.7)"
        });
        
        // Animamos los números con contador
        const numbers = document.querySelectorAll('.hero-stat-number');
        numbers.forEach(number => {
          const target = number.textContent;
          const isPercentage = target?.includes('%');
          const numericValue = parseFloat(target?.replace(/[^0-9.]/g, '') || '0');
          
          statsTl.fromTo(number, 
            { textContent: '0' + (isPercentage ? '%' : '') },
            {
              duration: 2,
              textContent: target,
              roundProps: "textContent",
              ease: "power3.inOut",
              onUpdate: function() {
                if (isPercentage) {
                  number.textContent = Math.round(this.targets()[0].textContent) + '%';
                }
              }
            },
            "-=0.8"
          );
        });
        
        return statsTl;
      }, "-=0.3");

      // Animación avanzada para elementos decorativos con efectos 3D
      masterTl.add(() => {
        const decorTl = gsap.timeline();
        
        decorTl.from(decorationRefs.current, {
          scale: 0,
          opacity: 0,
          rotation: gsap.utils.wrap([-60, 60]),
          transformOrigin: "center center",
          stagger: 0.2,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)"
        });
        
        // Añadimos movimiento constante para crear efecto flotante
        decorationRefs.current.forEach((el, i) => {
          const yAmount = 15 + (i * 5);
          const duration = 3 + (i * 0.5);
          
          decorTl.to(el, {
            y: yAmount,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          }, "-=1.5");
          
          // Rotación sutil constante
          decorTl.to(el, {
            rotation: i % 2 === 0 ? '+=15' : '-=15',
            duration: duration * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          }, "-=" + duration);
        });
        
        return decorTl;
      }, "-=1.8");
      
      // Animación adicional para CTA con efecto de resplandor
      masterTl.add(() => {
        const ctaTl = gsap.timeline();
        
        ctaTl.from(".hero-cta button", {
          scale: 0.8,
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.7,
          ease: "back.out(1.7)"
        });
        
        // Efecto de resplandor en el botón principal
        ctaTl.to(".hero-cta button:first-child", {
          boxShadow: "0 0 30px rgba(255,255,255,0.5)",
          duration: 0.8,
          repeat: 1,
          yoyo: true
        }, "-=0.4");
        
        return ctaTl;
      }, "-=1");

    }, sectionRef);

    // Clean up animations
    return () => ctx.revert();
  }, []);

  // Add a decoration element to the refs array
  const addToDecorationRefs = (el: HTMLDivElement | null) => {
    if (el && !decorationRefs.current.includes(el)) {
      decorationRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-scroll-section
    >
      {/* Overlay para efecto de revelación */}
      <div 
        className="hero-overlay absolute inset-0 z-50 pointer-events-none"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.darkBackground}, ${COLORS.mediumBackground})`,
          transformOrigin: 'top'
        }}
      ></div>
      
      {/* Hero Background Image con efecto parallax mejorado */}
      <div className="absolute inset-0 -z-20">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30 hero-image"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundAttachment: 'fixed'
          }}
          data-scroll
          data-scroll-speed="-3"
        />
        {/* Añadimos un segundo fondo para efecto de profundidad */}
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIHN0cm9rZT0ncmdiYSgyNTUsMjU1LDI1NSwwLjAzKScvPgo8L3N2Zz4=')]"
          data-scroll
          data-scroll-speed="-1"
        ></div>
        <div 
          className="absolute inset-0 bg-gradient-to-br" 
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.darkBackground}F5, ${COLORS.darkBackground}E0, ${COLORS.darkBackground}F5)` 
          }}
        />
      </div>

      {/* Enhanced animated background elements with GSAP-ready refs */}
      <div className="absolute inset-0 -z-10">
        <div 
          ref={addToDecorationRefs} 
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl hero-decoration" 
          style={{ background: `${COLORS.darkBackground}33` }}
          data-scroll
          data-scroll-speed="2"
        ></div>
        <div 
          ref={addToDecorationRefs} 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl hero-decoration" 
          style={{ background: `${COLORS.mediumBackground}33` }}
          data-scroll
          data-scroll-speed="1"
        ></div>
        <div 
          ref={addToDecorationRefs} 
          className="absolute top-3/4 left-3/4 w-64 h-64 rounded-full blur-3xl hero-decoration" 
          style={{ background: `${COLORS.accentBackground}25` }}
          data-scroll
          data-scroll-speed="3"
        ></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Premium Badge with ref for animation */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 hero-badge"
            style={{ 
              background: `${COLORS.darkBackground}90`,
              borderColor: `${COLORS.mediumBackground}50`,
            }}
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span 
              className="text-sm font-semibold bg-clip-text text-transparent"
              style={{ 
                background: `linear-gradient(to right, ${COLORS.lightAccent}, ${COLORS.highlight})`,
                backgroundClip: 'text'
              }}
            >
              #1 EN AUTOMATIZACIÓN Y DESARROLLO WEB
            </span>
          </div>
          
          {/* Enhanced heading with ref for text splitting animation - improved layout */}
          <h1 
            ref={headingRef} 
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight hero-heading"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-foreground mb-2" data-scroll data-scroll-speed="0.5">
                En Websy creamos
              </span>
              <span 
                className="gradient-text mb-2 px-6 py-3 rounded-lg" 
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.lightAccent}, ${COLORS.highlight})`,
                  backgroundClip: 'text',
                  boxShadow: `0 10px 30px -5px ${COLORS.highlight}30`
                }}
                data-scroll 
                data-scroll-speed="1"
              >
                webs que mueven
              </span>
              <span className="text-foreground-muted" data-scroll data-scroll-speed="0.3">
                tu negocio
              </span>
            </div>
          </h1>
          
          {/* Enhanced subtitle with scroll data attributes */}
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-foreground-muted mb-12 max-w-4xl mx-auto leading-relaxed font-light hero-subheading"
            data-scroll
            data-scroll-speed="0.2"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Diseñamos sitios que se ven bien, funcionan bien y ayudan a que tu marca crezca en digital. 
            <span className="font-medium block mt-2 py-2 px-4 rounded-lg" 
              style={{ 
                color: COLORS.highlight,
                background: `${COLORS.darkBackground}70`,
                backdropFilter: 'blur(8px)'
              }}>
              Simple, funcional y pensado para que tu web sea una herramienta real, no solo una linda pantalla.
            </span>
          </p>
          
          {/* Enhanced CTA Section with scroll data attributes and improved accessibility */}
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 hero-cta"
            data-scroll
            data-scroll-speed="0.1"
          >
            <Button 
              className="group text-lg px-10 py-6 relative focus:ring-4 focus:ring-primary/50 outline-none"
              style={{ 
                background: `linear-gradient(to right, ${COLORS.darkBackground}, ${COLORS.mediumBackground})`,
                boxShadow: `0 0 20px ${COLORS.darkBackground}50`
              }}
              onClick={() => {
                const cotizarSection = document.getElementById("cotizar");
                if (cotizarSection) {
                  cotizarSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity rounded-md"></div>
              <Zap className="mr-2 w-6 h-6" />
              Cotizar ahora
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 group-focus:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-10 py-6 relative focus:ring-4 focus:ring-primary/50 outline-none"
              style={{ 
                borderColor: `${COLORS.mediumBackground}80`,
                position: 'relative'
              }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity rounded-md"></div>
              <Shield className="mr-2 w-5 h-5" />
              Ver casos de éxito
            </Button>
          </div>

          {/* Premium Stats with icons and ref for animation */}
          <div 
            ref={statsRef} 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            data-animate="container"
          >
            <div 
              className="p-8 group transition-all duration-300 data-animate-item"
              style={{ 
                background: `${COLORS.darkBackground}99`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.mediumBackground}50`,
                borderRadius: '12px'
              }}
              data-scroll
              data-scroll-speed="0.2"
            >
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8" style={{ color: COLORS.highlight }} />
              </div>
              <div className="text-4xl font-black mb-3" style={{ color: COLORS.highlight }}>150+</div>
              <div className="text-foreground-muted font-medium">Proyectos completados</div>
              <div className="text-sm text-foreground-subtle mt-1">Con resultados medibles</div>
            </div>
            
            <div 
              className="p-8 group transition-all duration-300 data-animate-item"
              style={{ 
                background: `${COLORS.darkBackground}99`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.mediumBackground}50`,
                borderRadius: '12px'
              }}
              data-scroll
              data-scroll-speed="0.3"
            >
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8" style={{ color: COLORS.highlight }} />
              </div>
              <div className="text-4xl font-black mb-3" style={{ color: COLORS.highlight }}>48h</div>
              <div className="text-foreground-muted font-medium">Tiempo de respuesta</div>
              <div className="text-sm text-foreground-subtle mt-1">Garantizado</div>
            </div>
            
            <div 
              className="p-8 group transition-all duration-300 data-animate-item"
              style={{ 
                background: `${COLORS.darkBackground}99`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.mediumBackground}50`,
                borderRadius: '12px'
              }}
              data-scroll
              data-scroll-speed="0.4"
            >
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8" style={{ color: COLORS.highlight }} />
              </div>
              <div className="text-4xl font-black mb-3" style={{ color: COLORS.highlight }}>99.9%</div>
              <div className="text-foreground-muted font-medium">Uptime garantizado</div>
              <div className="text-sm text-foreground-subtle mt-1">Infraestructura premium</div>
            </div>
            
            <div 
              className="p-8 group transition-all duration-300 data-animate-item"
              style={{ 
                background: `${COLORS.darkBackground}99`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.mediumBackground}50`,
                borderRadius: '12px'
              }}
              data-scroll
              data-scroll-speed="0.5"
            >
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" style={{ color: COLORS.highlight }} />
              </div>
              <div className="text-4xl font-black mb-3" style={{ color: COLORS.highlight }}>100%</div>
              <div className="text-foreground-muted font-medium">Satisfacción</div>
              <div className="text-sm text-foreground-subtle mt-1">O te devolvemos el dinero</div>
            </div>
          </div>

          {/* Value proposition with scroll animation */}
          <div 
            className="mt-20 max-w-4xl mx-auto"
            data-scroll
            data-scroll-speed="0.1"
          >
            <div 
              className="p-8 text-left"
              style={{ 
                background: `${COLORS.darkBackground}90`,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${COLORS.mediumBackground}30`,
                borderRadius: '12px',
                boxShadow: `0 20px 40px -10px ${COLORS.darkBackground}80`
              }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ¿Por qué elegir Websy?
              </h3>
              <div 
                className="grid md:grid-cols-3 gap-6 text-sm"
                data-animate="container"
              >
                <div data-animate="item">
                  <div className="font-semibold mb-2" style={{ color: COLORS.highlight }}>
                    🚀 Tecnología de vanguardia
                  </div>
                  <div className="text-foreground-muted">
                    Utilizamos las últimas tecnologías y frameworks para garantizar rendimiento excepcional.
                  </div>
                </div>
                <div data-animate="item">
                  <div className="font-semibold mb-2" style={{ color: COLORS.highlight }}>
                    🤖 Automatización inteligente
                  </div>
                  <div className="text-foreground-muted">
                    Integramos IA y automatización para optimizar procesos y maximizar resultados.
                  </div>
                </div>
                <div data-animate="item">
                  <div className="font-semibold mb-2" style={{ color: COLORS.highlight }}>
                    💎 Calidad premium
                  </div>
                  <div className="text-foreground-muted">
                    Cada proyecto es desarrollado con estándares enterprise y atención al detalle.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom scroll indicator */}
          <div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            data-scroll
            data-scroll-speed="1"
            data-scroll-position="bottom"
          >
            <span className="text-sm text-foreground-muted mb-2">Scroll para explorar</span>
            <div 
              className="w-6 h-10 border-2 rounded-full flex justify-center items-start p-1"
              style={{ borderColor: `${COLORS.mediumBackground}80` }}
            >
              <div 
                className="w-1.5 h-3 rounded-full animate-bounce"
                style={{ background: COLORS.highlight }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;