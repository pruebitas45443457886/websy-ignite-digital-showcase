import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Lightbulb, Rocket } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Equipo experto",
    description: "Desarrolladores senior con años de experiencia en tecnologías modernas.",
    emoji: "👨‍💻" // Adding custom emojis instead of generic icons
  },
  {
    icon: Lightbulb,
    title: "Innovación constante",
    description: "Siempre al día con las últimas tendencias y mejores prácticas del sector.",
    emoji: "💡"
  },
  {
    icon: Rocket,
    title: "Entrega rápida",
    description: "Metodologías ágiles que garantizan entregas puntuales y de calidad.",
    emoji: "🚀"
  }
];

const achievements = [
  "+500 marcas transformadas", // Added the new text about 500+ brands
  "Desde startups a Fortune 500",
  "Clientes en 10+ países",
  "98% tasa de satisfacción",
  "Soporte 24/7 garantizado",
  "Tecnologías más avanzadas"
];

const About = () => {
  return (
    <section id="nosotros" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <div className="relative inline-block">
                <span className="gradient-text text-6xl md:text-7xl absolute -left-5 top-0 transform -translate-y-1/4">N</span>
                <span className="ml-8 gradient-text">en</span>
              </div>
              <span className="gradient-text ml-2">NOSOTROS</span>
            </h2>
            
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">🏆</span>
                <h3 className="text-3xl font-bold gradient-text">+500 marcas transformadas</h3>
              </div>
              <p className="text-xl text-foreground-muted leading-relaxed">
                Desde startups disruptivas hasta Fortune 500, ayudamos a las marcas más innovadoras 
                del mundo a dominar el espacio digital con tecnología de vanguardia.
              </p>
            </div>
            
            <div className="space-y-6 mb-8">
              {values.map((value, index) => (
                <div key={value.title} className="flex gap-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl animate-float" style={{animationDelay: `${index * 0.2}s`}}>
                      {value.emoji}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-foreground-muted">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="btn-primary">
              Conoce nuestro equipo
            </Button>
          </div>
          
          <div className="relative">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Nuestros números hablan
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={achievement}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground-muted">{achievement}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-primary rounded-xl">
                <h4 className="text-foreground font-semibold mb-2">
                  ¿Listo para empezar?
                </h4>
                <p className="text-foreground/80 text-sm">
                  Conversemos sobre tu proyecto sin compromiso
                </p>
              </div>
            </div>
            
            {/* Floating element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;