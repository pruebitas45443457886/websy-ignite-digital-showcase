import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background-secondary border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold gradient-text mb-4">Websy</h3>
            <p className="text-foreground-muted mb-6 max-w-md leading-relaxed">
              Desarrollamos soluciones digitales que impulsan el crecimiento de tu negocio. 
              Desde ideas simples hasta ecosistemas complejos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:scale-110 transition-transform">
                <Github className="w-5 h-5 text-foreground-muted hover:text-primary transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5 text-foreground-muted hover:text-primary transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5 text-foreground-muted hover:text-primary transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-foreground-muted hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Servicios</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Ecommerce</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Landing Pages</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Integraciones IA</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Apps Móviles</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Desarrollo Custom</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Nuestro equipo</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Casos de éxito</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Contacto</a></li>
              <li><a href="#" className="text-foreground-muted hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground-muted text-sm">
            © {currentYear} Websy. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-foreground-muted hover:text-primary text-sm transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="text-foreground-muted hover:text-primary text-sm transition-colors">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;