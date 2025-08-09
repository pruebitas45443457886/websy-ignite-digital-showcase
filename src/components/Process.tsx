import { Workflow, Rocket, ShieldCheck, Gauge } from "lucide-react";

const steps = [
  {
    icon: Workflow,
    title: "Descubrimiento",
    desc: "Entendemos objetivos, usuarios y métricas de éxito.",
  },
  {
    icon: Gauge,
    title: "Prototipado",
    desc: "Diseños y flujos para validar rápido con usuarios.",
  },
  {
    icon: ShieldCheck,
    title: "Desarrollo",
    desc: "Código limpio, escalable y probado.",
  },
  {
    icon: Rocket,
    title: "Lanzamiento",
    desc: "Deploy, monitoreo y mejoras continuas.",
  },
];

const Process = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Proceso</span> de trabajo
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Método claro y eficiente para entregar resultados sin sorpresas.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="glass-card p-8 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <s.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{i + 1}. {s.title}</h3>
              <p className="text-foreground-muted text-sm">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;