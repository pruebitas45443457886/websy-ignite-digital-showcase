import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";

const CTA = () => {
  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-primary opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 md:p-16 relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl blur-xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Construyamos</span>
                <br />
                algo increíble juntos
              </h2>
              
              <p className="text-xl text-foreground-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                Tu próximo proyecto digital está a una conversación de distancia. 
                Contáctanos y descubre cómo podemos transformar tu idea en realidad.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button className="btn-primary group">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Empezar conversación
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="btn-secondary">
                  <Calendar className="mr-2 w-5 h-5" />
                  Agendar reunión
                </Button>
              </div>
              
              {/* Contact info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold gradient-text mb-2">Respuesta</div>
                  <div className="text-foreground-muted">En menos de 24h</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text mb-2">Consulta</div>
                  <div className="text-foreground-muted">Gratuita y sin compromiso</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text mb-2">Presupuesto</div>
                  <div className="text-foreground-muted">Personalizado para ti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;