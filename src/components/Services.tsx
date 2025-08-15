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
    customIcon: "🛍️",
    title: "Ecommerce",
    description: "Tiendas online completas con sistemas de pago, inventario y análisis avanzados.",
    features: ["Integración de pagos", "Gestión de inventario", "Panel administrativo", "Analytics"],
    gradient: "from-purple-500/20 to-indigo-500/20"
  },
  {
    customIcon: "🚀",
    title: "Landing Pages",
    description: "Páginas de conversión optimizadas que convierten visitantes en clientes.",
    features: ["Diseño responsive", "SEO optimizado", "A/B Testing", "Formularios avanzados"],
    gradient: "from-blue-500/20 to-teal-500/20"
  },
  {
    customIcon: "🧠",
    title: "Integraciones IA",
    description: "Implementamos inteligencia artificial para automatizar y optimizar procesos.",
    features: ["Chatbots inteligentes", "Análisis predictivo", "Automatización", "ML personalizado"],
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    customIcon: "⚙️",
    title: "Sistemas Backend",
    description: "APIs robustas y bases de datos escalables para cualquier aplicación.",
    features: ["APIs REST/GraphQL", "Bases de datos", "Autenticación", "Microservicios"],
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    customIcon: "📱",
    title: "Apps Móviles",
    description: "Aplicaciones nativas y multiplataforma para iOS y Android.",
    features: ["React Native", "Flutter", "PWA", "App Store deployment"],
    gradient: "from-pink-500/20 to-red-500/20"
  },
  {
    customIcon: "✨",
    title: "Desarrollo Custom",
    description: "Cualquier solución tecnológica que necesites, la hacemos realidad.",
    features: ["Consultoría técnica", "Arquitectura", "DevOps", "Mantenimiento"],
    gradient: "from-violet-500/20 to-purple-500/20"
  }
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="gradient-text">Servicios</span> que transforman ideas
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
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
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:glow-effect transition-all duration-300 bg-gradient-to-r ${service.gradient}`}>
                  <span className="text-3xl animate-float" style={{animationDelay: `${index * 0.2}s`}}>
                    {service.customIcon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
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