import brandsBg from "@/assets/brands-bg.png";

const brands = [
  { name: "TechCorp", logo: "🚀" },
  { name: "InnovateAI", logo: "🤖" },
  { name: "CloudSync", logo: "☁️" },
  { name: "DataFlow", logo: "📊" },
  { name: "AutoBot", logo: "⚡" },
  { name: "NetSolutions", logo: "🌐" },
  { name: "SmartDesk", logo: "💻" },
  { name: "QuantumTech", logo: "🔮" },
  { name: "CyberShield", logo: "🛡️" },
  { name: "MegaStore", logo: "🛒" },
  { name: "FinanceHub", logo: "💳" },
  { name: "HealthPlus", logo: "🏥" }
];

const Brands = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-background-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${brandsBg})` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <span className="text-sm font-medium text-primary">✨ NUESTROS CLIENTES</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Marcas que confían en </span>
            <span className="gradient-text">Websy</span>
          </h2>
          
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Desde startups innovadoras hasta empresas consolidadas, ayudamos a transformar 
            ideas en soluciones digitales exitosas.
          </p>
        </div>

        {/* Featured brands grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          {brands.slice(0, 6).map((brand, index) => (
            <div
              key={brand.name}
              className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {brand.logo}
              </div>
              <div className="text-sm font-medium text-foreground-muted">
                {brand.name}
              </div>
            </div>
          ))}
        </div>

        {/* All brands marquee */}
        <div className="relative">
          <div className="glass-card p-8">
            <h3 className="text-lg font-semibold text-center text-foreground mb-6">
              + de 150 marcas han elegido nuestros servicios
            </h3>
            
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-8">
                {[...brands, ...brands].map((brand, index) => (
                  <div 
                    key={`${brand.name}-${index}`}
                    className="flex-shrink-0 flex items-center gap-3 bg-surface/50 px-6 py-3 rounded-lg"
                  >
                    <span className="text-2xl">{brand.logo}</span>
                    <span className="text-foreground-muted font-medium whitespace-nowrap">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">🏆</div>
            <div className="font-semibold text-foreground mb-2">Premio Innovación 2024</div>
            <div className="text-sm text-foreground-muted">
              Reconocidos por excelencia en desarrollo web
            </div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">⭐</div>
            <div className="font-semibold text-foreground mb-2">5.0 estrellas promedio</div>
            <div className="text-sm text-foreground-muted">
              Basado en +200 reseñas verificadas
            </div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <div className="font-semibold text-foreground mb-2">Certificación ISO 27001</div>
            <div className="text-sm text-foreground-muted">
              Máxima seguridad en todos nuestros proyectos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;