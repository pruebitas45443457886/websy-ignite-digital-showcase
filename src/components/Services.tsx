import { Card } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Globe, 
  Brain, 
  Database, 
  Smartphone, 
  Zap 
} from "lucide-react";

const services = [
  {
    icon: ShoppingCart,
    title: "Ecommerce",
    description: "Tiendas online completas con sistemas de pago, inventario y análisis avanzados.",
    features: ["Integración de pagos", "Gestión de inventario", "Panel administrativo", "Analytics"]
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Páginas de conversión optimizadas que convierten visitantes en clientes.",
    features: ["Diseño responsive", "SEO optimizado", "A/B Testing", "Formularios avanzados"]
  },
  {
    icon: Brain,
    title: "Integraciones IA",
    description: "Implementamos inteligencia artificial para automatizar y optimizar procesos.",
    features: ["Chatbots inteligentes", "Análisis predictivo", "Automatización", "ML personalizado"]
  },
  {
    icon: Database,
    title: "Sistemas Backend",
    description: "APIs robustas y bases de datos escalables para cualquier aplicación.",
    features: ["APIs REST/GraphQL", "Bases de datos", "Autenticación", "Microservicios"]
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Aplicaciones nativas y multiplataforma para iOS y Android.",
    features: ["React Native", "Flutter", "PWA", "App Store deployment"]
  },
  {
    icon: Zap,
    title: "Desarrollo Custom",
    description: "Cualquier solución tecnológica que necesites, la hacemos realidad.",
    features: ["Consultoría técnica", "Arquitectura", "DevOps", "Mantenimiento"]
  }
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Servicios</span> que transforman ideas
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Desde conceptos simples hasta ecosistemas digitales complejos, 
            tenemos la experiencia para llevar tu proyecto al siguiente nivel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="glass-card p-8 hover:scale-105 transition-all duration-300 group"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:glow-effect transition-all duration-300">
                  <service.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="space-y-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;