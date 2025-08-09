import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana García",
    role: "CMO, FashionX",
    quote: "Websy llevó nuestro ecommerce a otro nivel. Aumentamos 40% las ventas en 3 meses.",
  },
  {
    name: "Carlos López",
    role: "CEO, FinTechPro",
    quote: "El equipo es rápido, profesional y muy creativo. La integración con IA fue impecable.",
  },
  {
    name: "María Pérez",
    role: "Founder, HealthStart",
    quote: "Entregaron antes de lo esperado con una calidad excelente. Recomendadísimos.",
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Testimonios</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Lo que dicen nuestros clientes sobre trabajar con Websy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass-card p-8 rounded-2xl">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <blockquote className="text-foreground mb-4">“{t.quote}”</blockquote>
              <figcaption className="text-sm text-foreground-muted">{t.name} — {t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;