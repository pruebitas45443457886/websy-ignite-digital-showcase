import p1 from "@/assets/projects/project1.jpg";
import p2 from "@/assets/projects/project2.jpg";
import p3 from "@/assets/projects/project3.jpg";

const projects = [
  {
    image: p1,
    title: "Ecommerce de Moda",
    description: "Tienda en línea con checkout optimizado y recomendaciones con IA.",
    tags: ["Next.js", "Stripe", "Supabase", "AI"]
  },
  {
    image: p2,
    title: "Landing de SaaS",
    description: "Landing page de alto impacto con conversiones +35% mediante A/B Testing.",
    tags: ["Vite", "Tailwind", "Analytics"]
  },
  {
    image: p3,
    title: "Integración IA Soporte",
    description: "Chatbot inteligente con base de conocimiento y tono de marca.",
    tags: ["OpenAI", "Embeddings", "RAG"]
  }
];

const Projects = () => {
  return (
    <section id="proyectos" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Casos de éxito</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Resultados reales en diferentes industrias y tamaños de empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <article key={p.title} className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={`Proyecto Websy: ${p.title}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-foreground-muted mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-surface border border-border text-foreground-muted">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;