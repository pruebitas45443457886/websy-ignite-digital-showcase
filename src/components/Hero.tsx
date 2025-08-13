import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Zap, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-20">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 animate-glow-pulse">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              #1 EN AUTOMATIZACIÓN Y DESARROLLO WEB
            </span>
          </div>
          
          {/* Enhanced heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight tracking-tight">
            <span className="block text-foreground mb-2">
              Transformamos
            </span>
            <span className="block gradient-text mb-2">
              IDEAS
            </span>
            <span className="block text-foreground-muted">
              en realidad digital
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground-muted mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Desarrollo web avanzado, automatización con IA, bots de WhatsApp y soluciones 
            tecnológicas que <span className="gradient-text font-medium">impulsan tu negocio</span> al siguiente nivel.
          </p>
          
          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button className="btn-primary group text-lg px-10 py-6">
              <Zap className="mr-2 w-6 h-6" />
              Iniciar proyecto ahora
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-secondary text-lg px-10 py-6">
              <Shield className="mr-2 w-5 h-5" />
              Ver casos de éxito
            </Button>
          </div>

          {/* Premium Stats with icons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="glass-card p-8 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">150+</div>
              <div className="text-foreground-muted font-medium">Proyectos completados</div>
              <div className="text-sm text-foreground-subtle mt-1">Con resultados medibles</div>
            </div>
            
            <div className="glass-card p-8 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">48h</div>
              <div className="text-foreground-muted font-medium">Tiempo de respuesta</div>
              <div className="text-sm text-foreground-subtle mt-1">Garantizado</div>
            </div>
            
            <div className="glass-card p-8 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">99.9%</div>
              <div className="text-foreground-muted font-medium">Uptime garantizado</div>
              <div className="text-sm text-foreground-subtle mt-1">Infraestructura premium</div>
            </div>
            
            <div className="glass-card p-8 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary-glow" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">100%</div>
              <div className="text-foreground-muted font-medium">Satisfacción</div>
              <div className="text-sm text-foreground-subtle mt-1">O te devolvemos el dinero</div>
            </div>
          </div>

          {/* Value proposition */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="glass-card p-8 text-left">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ¿Por qué elegir Websy?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="font-semibold text-primary mb-2">🚀 Tecnología de vanguardia</div>
                  <div className="text-foreground-muted">
                    Utilizamos las últimas tecnologías y frameworks para garantizar rendimiento excepcional.
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-secondary mb-2">🤖 Automatización inteligente</div>
                  <div className="text-foreground-muted">
                    Integramos IA y automatización para optimizar procesos y maximizar resultados.
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-accent mb-2">💎 Calidad premium</div>
                  <div className="text-foreground-muted">
                    Cada proyecto es desarrollado con estándares enterprise y atención al detalle.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;