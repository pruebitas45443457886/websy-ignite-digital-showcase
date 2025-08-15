import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "nosotros", label: "Nosotros" },
  { id: "contacto", label: "Contacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6">
        <div className="mt-4 glass-card rounded-2xl px-5 py-3 border flex items-center justify-between">
          <button onClick={() => handleScroll("inicio")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary" />
            <span className="font-bold tracking-tight text-lg" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Websy</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button 
                key={l.id} 
                onClick={() => handleScroll(l.id)} 
                className="text-foreground-muted hover:text-foreground transition-colors"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Admin</Link>
            <Button className="btn-primary" onClick={() => handleScroll("cotizar")}>Cotizar ahora</Button>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-card rounded-2xl p-4">
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleScroll(l.id)}
                  className="text-left text-foreground-muted hover:text-foreground transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Link to="/login" className="text-left text-foreground-muted hover:text-foreground transition-colors">Admin</Link>
              <Button className="btn-primary" onClick={() => handleScroll("cotizar")}>
                Cotizar ahora
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;