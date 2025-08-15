import { useState, useEffect } from "react";
import { Star, Award, TrendingUp, Users, Shield, Zap, Globe, Code, Brain, Database, Smartphone, Lock, ChevronRight, Info } from "lucide-react";
import premiumBrands from "@/assets/premium-brands.png";
import { COLORS } from "@/lib/animation";

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web",
    shortDesc: "Sitios web modernos y escalables",
    detailedDesc: "Creamos aplicaciones web de última generación utilizando tecnologías como React, Next.js y Node.js. Nuestros sitios son rápidos, seguros y optimizados para SEO, garantizando una experiencia excepcional en todos los dispositivos.",
    features: ["React & Next.js", "SEO Optimizado", "Performance 100%", "Mobile First"]
  },
  {
    icon: Code,
    title: "Automatización",
    shortDesc: "Procesos inteligentes automatizados",
    detailedDesc: "Implementamos sistemas de automatización que reducen el trabajo manual hasta en un 80%. Desde chatbots inteligentes hasta workflows complejos, transformamos la eficiencia operativa de tu empresa.",
    features: ["Workflows Automáticos", "Integración APIs", "ChatBots IA", "Reducción 80% tareas"]
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    shortDesc: "IA personalizada para tu negocio",
    detailedDesc: "Desarrollamos soluciones de IA específicas para tu industria: análisis predictivo, procesamiento de lenguaje natural, computer vision y machine learning que impulsan decisiones inteligentes.",
    features: ["Machine Learning", "NLP Avanzado", "Computer Vision", "Análisis Predictivo"]
  },
  {
    icon: Database,
    title: "Big Data & Analytics",
    shortDesc: "Insights poderosos de tus datos",
    detailedDesc: "Transformamos datos caóticos en insights accionables. Implementamos pipelines de datos robustos, dashboards en tiempo real y sistemas de análisis que revelan oportunidades ocultas.",
    features: ["Pipelines Datos", "Dashboards Real-time", "Data Warehousing", "Business Intelligence"]
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    shortDesc: "Aplicaciones nativas e híbridas",
    detailedDesc: "Desarrollamos apps móviles excepcionales para iOS y Android. Desde apps nativas de alto rendimiento hasta soluciones híbridas escalables que conectan perfectamente con tus sistemas.",
    features: ["iOS & Android", "React Native", "Performance Nativa", "Integración Backend"]
  },
  {
    icon: Lock,
    title: "Ciberseguridad",
    shortDesc: "Protección empresarial avanzada",
    detailedDesc: "Implementamos arquitecturas de seguridad robustas: auditorías de vulnerabilidades, sistemas de detección de amenazas, compliance normativo y protocolos de seguridad de nivel empresarial.",
    features: ["Auditorías Seguridad", "Detección Amenazas", "Compliance ISO", "Arquitectura Segura"]
  }
];

const realBrands = [
  { 
    name: "TechCorp Solutions", 
    logo: "🚀", 
    industry: "Software",
    result: "+340% ventas online",
    testimonial: "Websy transformó completamente nuestra presencia digital",
    services: ["Desarrollo Web", "Automatización"]
  },
  { 
    name: "InnovateAI Labs", 
    logo: "🤖", 
    industry: "Inteligencia Artificial",
    result: "50% reducción costos",
    testimonial: "La automatización nos cambió el juego por completo",
    services: ["Inteligencia Artificial", "Automatización"]
  },
  { 
    name: "CloudSync Enterprise", 
    logo: "☁️", 
    industry: "Cloud Computing",
    result: "99.9% uptime logrado",
    testimonial: "Infraestructura robusta y escalable desde día uno",
    services: ["Desarrollo Web", "Ciberseguridad"]
  },
  { 
    name: "DataFlow Analytics", 
    logo: "📊", 
    industry: "Big Data",
    result: "+500% eficiencia",
    testimonial: "Insights que revolucionaron nuestras decisiones",
    services: ["Big Data & Analytics", "Inteligencia Artificial"]
  },
  { 
    name: "AutoBot Manufacturing", 
    logo: "⚡", 
    industry: "Manufactura",
    result: "70% automatización",
    testimonial: "Procesos optimizados como nunca imaginamos",
    services: ["Automatización", "Big Data & Analytics"]
  },
  { 
    name: "NetSolutions Global", 
    logo: "🌐", 
    industry: "Telecomunicaciones",
    result: "1M+ usuarios activos",
    testimonial: "Escalabilidad sin límites para nuestro crecimiento",
    services: ["Desarrollo Web", "Apps Móviles"]
  },
  { 
    name: "SmartDesk Workspace", 
    logo: "💻", 
    industry: "Productividad",
    result: "+250% productividad",
    testimonial: "Herramientas que potencian a nuestro equipo",
    services: ["Apps Móviles", "Automatización"]
  },
  { 
    name: "QuantumTech Research", 
    logo: "🔮", 
    industry: "Investigación",
    result: "80% faster research",
    testimonial: "Tecnología de vanguardia para investigación avanzada",
    services: ["Inteligencia Artificial", "Big Data & Analytics"]
  },
  { 
    name: "CyberShield Security", 
    logo: "🛡️", 
    industry: "Ciberseguridad",
    result: "100% secure systems",
    testimonial: "Protección total con sistemas inteligentes",
    services: ["Ciberseguridad", "Desarrollo Web"]
  },
  { 
    name: "MegaStore Retail", 
    logo: "🛒", 
    industry: "E-commerce",
    result: "+600% conversiones",
    testimonial: "Plataforma que multiplicó nuestras ventas online",
    services: ["Desarrollo Web", "Big Data & Analytics"]
  },
  { 
    name: "FinanceHub Digital", 
    logo: "💳", 
    industry: "Fintech",
    result: "10M+ transacciones",
    testimonial: "Fintech seguro y escalable para el futuro",
    services: ["Apps Móviles", "Ciberseguridad"]
  },
  { 
    name: "HealthPlus Medical", 
    logo: "🏥", 
    industry: "Salud",
    result: "90% patient satisfaction",
    testimonial: "Tecnología médica que salva vidas diariamente",
    services: ["Apps Móviles", "Inteligencia Artificial"]
  }
];

const Brands = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % realBrands.slice(0, 6).length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-gradient-to-br from-surface via-surface-secondary to-surface-muted relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-72 h-72 bg-gradient-to-br from-secondary/15 to-accent/15 rounded-full blur-3xl animate-pulse opacity-50" style={{animationDelay: '4s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border/5 to-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>
        
        {/* Subtle mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Interactive Services Section */}
        <div className="mb-24">
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 hero-badge mx-auto rounded-full">
            <span 
              className="text-sm font-semibold text-[#FD1F34]"
            >
              SOLUCIONES TECNOLÓGICAS AVANZADAS
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-center text-foreground mb-12 relative">
            <span className="relative z-10 inline-block">
              Tecnología <span className="relative">
                <span className="relative z-10 font-extrabold" style={{ 
                  color: "#FD1F34", 
                  textShadow: "0 0 15px rgba(253, 31, 52, 0.7)",
                  WebkitTextStroke: "1px rgba(253, 31, 52, 0.3)"
                }}>revolucionaria</span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#FD1F34] opacity-70 blur-sm"></span>
              </span>
            </span>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#FD1F34] to-transparent absolute bottom-0 left-0 transform -translate-y-2"></div>
          </h3>
          <p className="text-lg md:text-xl text-foreground-muted text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones digitales con tecnología de vanguardia y metodología probada en más de <span className="font-bold" style={{ color: "#FD1F34" }}>1,000+ implementaciones exitosas</span> para empresas de todos los sectores
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className={`glass-card p-8 group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-glow hover:border-[#FD1F34]/30 ${
                    activeService === index ? 'scale-105 shadow-glow border-[#FD1F34]/50 bg-gradient-to-br from-[#FD1F34]/10 to-[#FD1F34]/5' : ''
                  } ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveService(activeService === index ? null : index)}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#FD1F34]/20 to-[#FD1F34]/30 group-hover:from-[#FD1F34]/30 group-hover:to-[#FD1F34]/40 transition-all duration-500 shadow-md">
                      <IconComponent className="w-8 h-8 text-[#FD1F34] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg group-hover:text-[#FD1F34] transition-all">{service.title}</h4>
                      <p className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">{service.shortDesc}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-[#FD1F34] ml-auto transition-transform duration-300 ${activeService === index ? 'rotate-90' : ''}`} />
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${
                    activeService === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-t border-[#FD1F34]/20 pt-6">
                      <p className="text-foreground mb-4 leading-relaxed">
                        {service.detailedDesc}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full bg-[#FD1F34] shadow-[0_0_8px_rgba(253,31,52,0.6)] animate-pulse"></div>
                            <span className="text-foreground font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Featured brands with results */}
        <div className="mb-24">
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 hero-badge mx-auto rounded-full">
            <span 
              className="text-sm font-semibold text-[#FD1F34]"
              style={{
                textShadow: "0 0 5px rgba(253, 31, 52, 0.5)"
              }}
            >
              CASOS DE ÉXITO COMPROBABLES
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-center text-foreground mb-12 relative">
            <span className="relative z-10 inline-block">
              Resultados <span className="relative">
                <span className="relative z-10 font-extrabold" style={{ 
                  color: "#FD1F34", 
                  textShadow: "0 0 15px rgba(253, 31, 52, 0.7)",
                  WebkitTextStroke: "1px rgba(253, 31, 52, 0.3)"
                }}>extraordinarios</span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#FD1F34] opacity-70 blur-sm"></span>
              </span>
            </span>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#FD1F34] to-transparent absolute bottom-0 left-0 transform -translate-y-2"></div>
          </h3>
          <p className="text-lg md:text-xl text-foreground-muted text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Nuestras soluciones no solo impresionan visualmente, sino que <span className="font-bold" style={{ color: "#FD1F34", textShadow: "0 0 8px rgba(253, 31, 52, 0.4)" }}>generan impacto medible</span> en los indicadores clave de negocio de nuestros clientes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realBrands.slice(0, 6).map((brand, index) => (
              <div
                key={brand.name}
                className={`glass-card p-8 group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-glow hover:border-[#FD1F34]/30 ${
                  activeTestimonial === index ? 'scale-105 shadow-glow border-[#FD1F34]/50 bg-gradient-to-br from-[#FD1F34]/10 to-[#FD1F34]/5' : ''
                } ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => setActiveTestimonial(index)}
                onMouseEnter={() => setHoveredBrand(index)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-500 filter group-hover:drop-shadow-lg">
                    {brand.logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg group-hover:text-[#FD1F34] transition-all">{brand.name}</h4>
                    <p className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">{brand.industry}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl font-black text-[#FD1F34] mb-3 group-hover:scale-105 transition-transform" style={{ textShadow: "0 0 10px rgba(253, 31, 52, 0.3)" }}>
                    {brand.result}
                  </div>
                  <p className="text-sm text-foreground-muted italic leading-relaxed">
                    "{brand.testimonial}"
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {brand.services.map((service, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#FD1F34]/20 to-[#FD1F34]/10 text-[#FD1F34] border border-[#FD1F34]/20">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FD1F34] fill-current group-hover:scale-110 transition-transform" style={{transitionDelay: `${i * 50}ms`}} />
                    ))}
                  </div>
                  <Info className={`w-5 h-5 text-foreground-muted transition-all duration-300 ${hoveredBrand === index ? 'text-[#FD1F34] scale-110' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Premium testimonial showcase */}
        <div className="glass-card p-12 md:p-16 mb-24 text-center shadow-glow border border-[#FD1F34]/20 bg-gradient-to-br from-[#FD1F34]/5 to-[#FD1F34]/2 relative">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <span 
              className="text-sm font-semibold text-[#FD1F34] px-8 py-3 glass-card rounded-full"
              style={{ 
                textShadow: "0 0 5px rgba(253, 31, 52, 0.5)"
              }}
            >
              TESTIMONIOS DESTACADOS
            </span>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="text-8xl md:text-9xl mb-8 opacity-20 text-[#FD1F34]">"</div>
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-light text-foreground leading-relaxed mb-12 animate-fade-in">
              {realBrands[activeTestimonial].testimonial}
            </blockquote>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-5xl md:text-6xl animate-bounce">{realBrands[activeTestimonial].logo}</div>
              <div className="text-center md:text-left">
                <div className="font-bold text-foreground text-xl md:text-2xl text-[#FD1F34] mb-2">
                  {realBrands[activeTestimonial].name}
                </div>
                <div className="text-foreground-muted text-lg">
                  {realBrands[activeTestimonial].industry} • {realBrands[activeTestimonial].result}
                </div>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {realBrands[activeTestimonial].services.map((service, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#FD1F34]/30 to-[#FD1F34]/20 text-[#FD1F34] border border-[#FD1F34]/30">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Enhanced Trust indicators */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 hero-badge mx-auto rounded-full">
            <span 
              className="text-sm font-semibold text-[#FD1F34]"
              style={{
                textShadow: "0 0 5px rgba(253, 31, 52, 0.5)"
              }}
            >
              RECONOCIMIENTOS & CERTIFICACIONES
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 md:p-10 text-center group hover:scale-105 transition-all duration-500 hover:shadow-glow hover:border-[#FD1F34]/30 hover:bg-gradient-to-br hover:from-[#FD1F34]/5 hover:to-[#FD1F34]/2">
            <div className="text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform duration-500 filter group-hover:drop-shadow-lg">🏆</div>
            <div className="font-bold text-foreground text-xl md:text-2xl mb-4 group-hover:text-[#FD1F34] transition-all">Premio Innovación 2024</div>
            <div className="text-foreground-muted leading-relaxed">
              Reconocidos como la mejor agencia de desarrollo web y automatización de España por la excelencia en nuestros proyectos
            </div>
          </div>
          
          <div className="glass-card p-8 md:p-10 text-center group hover:scale-105 transition-all duration-500 hover:shadow-glow hover:border-[#FD1F34]/30 hover:bg-gradient-to-br hover:from-[#FD1F34]/5 hover:to-[#FD1F34]/2">
            <div className="text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform duration-500 filter group-hover:drop-shadow-lg">⭐</div>
            <div className="font-bold text-foreground text-xl md:text-2xl mb-4 group-hover:text-[#FD1F34] transition-all">5.0 estrellas perfectas</div>
            <div className="text-foreground-muted leading-relaxed">
              Basado en +500 reseñas verificadas de Google, Clutch y Trustpilot de clientes reales satisfechos
            </div>
          </div>
          
          <div className="glass-card p-8 md:p-10 text-center group hover:scale-105 transition-all duration-500 hover:shadow-glow hover:border-[#FD1F34]/30 hover:bg-gradient-to-br hover:from-[#FD1F34]/5 hover:to-[#FD1F34]/2">
            <div className="text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform duration-500 filter group-hover:drop-shadow-lg">🔒</div>
            <div className="font-bold text-foreground text-xl md:text-2xl mb-4 group-hover:text-[#FD1F34] transition-all">Certificaciones Enterprise</div>
            <div className="text-foreground-muted leading-relaxed">
              ISO 27001, SOC 2 y PCI DSS. Máxima seguridad empresarial para proyectos críticos y datos sensibles
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="glass-card p-12 md:p-16 max-w-5xl mx-auto shadow-glow border border-[#FD1F34]/20 bg-gradient-to-br from-[#FD1F34]/10 to-[#FD1F34]/5">
            <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 hero-badge mx-auto rounded-full">
              <span 
                className="text-sm font-semibold text-[#FD1F34]"
                style={{
                  textShadow: "0 0 5px rgba(253, 31, 52, 0.5)"
                }}
              >
                IMPULSA TU NEGOCIO HOY
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-tight">
              ¿Listo para unirte a nuestros
              <span className="block relative">
                <span className="relative z-10 font-extrabold" style={{ 
                  color: "#FD1F34", 
                  textShadow: "0 0 15px rgba(253, 31, 52, 0.7)",
                  WebkitTextStroke: "1px rgba(253, 31, 52, 0.3)"
                }}>clientes de alto rendimiento?</span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#FD1F34] opacity-70 blur-sm"></span>
              </span>
            </h3>
            <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
              Únete a las empresas visionarias que <span className="font-bold" style={{ color: "#FD1F34", textShadow: "0 0 8px rgba(253, 31, 52, 0.4)" }}>superan a su competencia</span> con soluciones tecnológicas a la medida
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="text-lg px-8 py-4 shadow-glow hover:scale-105 transition-all duration-300 bg-[#FD1F34] text-white font-bold rounded-lg flex items-center justify-center relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FD1F34]/80 to-[#FD1F34] transition-all duration-300 transform group-hover:scale-110 group-hover:opacity-90"></span>
                <Zap className="mr-3 w-6 h-6 relative z-10" />
                <span className="relative z-10">Empezar mi transformación</span>
              </button>
              <button className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300 bg-transparent border-2 border-[#FD1F34]/50 text-[#FD1F34] font-bold rounded-lg flex items-center justify-center hover:bg-[#FD1F34]/10">
                <Users className="mr-3 w-6 h-6" />
                Ver todos los casos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
