import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-glow-pulse">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground-muted">
              Innovación tecnológica sin límites
            </span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Websy</span>
            <br />
            <span className="text-foreground">Tu visión,</span>
            <br />
            <span className="text-foreground-muted">nuestro código</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones digitales completas: ecommerce, landing pages, 
            integraciones de IA y cualquier proyecto que puedas imaginar.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-primary group">
              Empezar proyecto
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-secondary">
              Ver nuestro trabajo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="glass-card p-6">
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-foreground-muted">Proyectos entregados</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-foreground-muted">Satisfacción garantizada</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-foreground-muted">Soporte dedicado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;