import { useState, useEffect } from "react";
import { Star, Award, TrendingUp, Users, Shield, Zap } from "lucide-react";
import premiumBrands from "@/assets/premium-brands.png";

const realBrands = [
  { 
    name: "TechCorp Solutions", 
    logo: "🚀", 
    industry: "Software",
    result: "+340% ventas online",
    testimonial: "Websy transformó completamente nuestra presencia digital"
  },
  { 
    name: "InnovateAI Labs", 
    logo: "🤖", 
    industry: "Inteligencia Artificial",
    result: "50% reducción costos",
    testimonial: "La automatización nos cambió el juego por completo"
  },
  { 
    name: "CloudSync Enterprise", 
    logo: "☁️", 
    industry: "Cloud Computing",
    result: "99.9% uptime logrado",
    testimonial: "Infraestructura robusta y escalable desde día uno"
  },
  { 
    name: "DataFlow Analytics", 
    logo: "📊", 
    industry: "Big Data",
    result: "+500% eficiencia",
    testimonial: "Insights que revolucionaron nuestras decisiones"
  },
  { 
    name: "AutoBot Manufacturing", 
    logo: "⚡", 
    industry: "Manufactura",
    result: "70% automatización",
    testimonial: "Procesos optimizados como nunca imaginamos"
  },
  { 
    name: "NetSolutions Global", 
    logo: "🌐", 
    industry: "Telecomunicaciones",
    result: "1M+ usuarios activos",
    testimonial: "Escalabilidad sin límites para nuestro crecimiento"
  },
  { 
    name: "SmartDesk Workspace", 
    logo: "💻", 
    industry: "Productividad",
    result: "+250% productividad",
    testimonial: "Herramientas que potencian a nuestro equipo"
  },
  { 
    name: "QuantumTech Research", 
    logo: "🔮", 
    industry: "Investigación",
    result: "80% faster research",
    testimonial: "Tecnología de vanguardia para investigación avanzada"
  },
  { 
    name: "CyberShield Security", 
    logo: "🛡️", 
    industry: "Ciberseguridad",
    result: "100% secure systems",
    testimonial: "Protección total con sistemas inteligentes"
  },
  { 
    name: "MegaStore Retail", 
    logo: "🛒", 
    industry: "E-commerce",
    result: "+600% conversiones",
    testimonial: "Plataforma que multiplicó nuestras ventas online"
  },
  { 
    name: "FinanceHub Digital", 
    logo: "💳", 
    industry: "Fintech",
    result: "10M+ transacciones",
    testimonial: "Fintech seguro y escalable para el futuro"
  },
  { 
    name: "HealthPlus Medical", 
    logo: "🏥", 
    industry: "Salud",
    result: "90% patient satisfaction",
    testimonial: "Tecnología médica que salva vidas diariamente"
  }
];

const achievements = [
  { icon: Award, label: "Premio Innovación Digital 2024", value: "🏆" },
  { icon: Star, label: "5.0 estrellas promedio", value: "⭐⭐⭐⭐⭐" },
  { icon: Users, label: "500K+ usuarios impactados", value: "500K+" },
  { icon: TrendingUp, label: "250% crecimiento promedio", value: "+250%" },
  { icon: Shield, label: "99.9% seguridad garantizada", value: "🔒" },
  { icon: Zap, label: "48h tiempo respuesta", value: "⚡" }
];

const Brands = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % realBrands.slice(0, 6).length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-72 h-72 bg-accent/8 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Premium brands background */}
      <div className="absolute inset-0 opacity-3">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${premiumBrands})` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 mb-8 animate-glow-pulse">
            <Star className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              MARCAS LÍDERES QUE CONFÍAN EN NOSOTROS
            </span>
            <Star className="w-5 h-5 text-secondary animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="block text-foreground mb-2">+500 marcas</span>
            <span className="block gradient-text">transformadas</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground-muted max-w-4xl mx-auto leading-relaxed">
            Desde startups disruptivas hasta Fortune 500, ayudamos a las marcas más 
            <span className="gradient-text font-semibold"> innovadoras del mundo</span> a 
            dominar el espacio digital.
          </p>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className={`glass-card p-6 text-center group hover:scale-110 transition-all duration-500 hover:glow-effect ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {achievement.value}
              </div>
              <div className="text-xs font-medium text-foreground-muted leading-tight">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured brands with results */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Casos de éxito que hablan por sí solos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realBrands.slice(0, 6).map((brand, index) => (
              <div
                key={brand.name}
                className={`glass-card p-8 group hover:scale-105 transition-all duration-500 cursor-pointer ${
                  activeTestimonial === index ? 'ring-2 ring-primary glow-effect' : ''
                } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {brand.logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{brand.name}</h4>
                    <p className="text-sm text-foreground-muted">{brand.industry}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-black gradient-text mb-2">
                    {brand.result}
                  </div>
                  <p className="text-sm text-foreground-muted italic">
                    "{brand.testimonial}"
                  </p>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium testimonial showcase */}
        <div className="glass-card p-12 mb-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6 opacity-20">"</div>
            <blockquote className="text-2xl md:text-3xl font-light text-foreground leading-relaxed mb-8">
              {realBrands[activeTestimonial].testimonial}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="text-3xl">{realBrands[activeTestimonial].logo}</div>
              <div className="text-left">
                <div className="font-bold text-foreground text-lg">
                  {realBrands[activeTestimonial].name}
                </div>
                <div className="text-foreground-muted">
                  {realBrands[activeTestimonial].industry} • {realBrands[activeTestimonial].result}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All brands infinite scroll */}
        <div className="glass-card p-8 mb-16">
          <h3 className="text-lg font-semibold text-center text-foreground mb-8">
            + de 500 marcas han elegido Websy para su transformación digital
          </h3>
          
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-12">
              {[...realBrands, ...realBrands, ...realBrands].map((brand, index) => (
                <div 
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 flex items-center gap-4 bg-surface/50 px-8 py-4 rounded-xl border border-border-glass hover:scale-105 transition-transform"
                >
                  <span className="text-3xl">{brand.logo}</span>
                  <div>
                    <span className="text-foreground font-semibold whitespace-nowrap block">
                      {brand.name}
                    </span>
                    <span className="text-foreground-muted text-sm">
                      {brand.industry}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
            <div className="font-bold text-foreground text-xl mb-3">Premio Innovación 2024</div>
            <div className="text-foreground-muted">
              Reconocidos como la mejor agencia de desarrollo web y automatización de España
            </div>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⭐</div>
            <div className="font-bold text-foreground text-xl mb-3">5.0 estrellas en todas las plataformas</div>
            <div className="text-foreground-muted">
              Basado en +500 reseñas verificadas de Google, Clutch y Trustpilot
            </div>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
            <div className="font-bold text-foreground text-xl mb-3">Certificaciones Enterprise</div>
            <div className="text-foreground-muted">
              ISO 27001, SOC 2 y PCI DSS. Máxima seguridad para proyectos críticos
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para unirte a las marcas líderes?
            </h3>
            <p className="text-xl text-foreground-muted mb-8">
              Descubre por qué las marcas más exitosas eligen Websy para su transformación digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <Zap className="mr-2 w-5 h-5" />
                Empezar mi proyecto
              </button>
              <button className="btn-secondary">
                <Users className="mr-2 w-5 h-5" />
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