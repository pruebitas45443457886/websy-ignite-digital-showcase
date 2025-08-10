import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Workflow, ShoppingCart, Bot, LineChart, Headphones } from "lucide-react";

const phoneNumber = "5491112345678"; // TODO: Reemplazar por tu número oficial de WhatsApp con código de país
const waMessage = encodeURIComponent(
  "Hola Websy 👋, quiero un bot de WhatsApp para ventas. ¿Pueden ayudarme?"
);
const waLink = `https://wa.me/${phoneNumber}?text=${waMessage}`;

const features = [
  {
    icon: MessageCircle,
    title: "Atención 24/7 con IA",
    description:
      "Respuestas instantáneas, tono de marca y recogida de datos clave para calificar leads.",
    bullets: [
      "Cualificación automática (presupuesto, sector, urgencia)",
      "Catálogo, precios y FAQs al instante",
      "Entrega de PDFs/enlaces y agendado de demo"
    ]
  },
  {
    icon: Workflow,
    title: "Embudos y automatizaciones",
    description:
      "Flujos en n8n para enriquecer, puntuar y mover oportunidades sin fricción.",
    bullets: [
      "Scoring de leads y asignación a vendedor",
      "Integración con CRM (HubSpot, Pipedrive, Notion, Sheets)",
      "Recordatorios, seguimiento y tareas automáticas"
    ]
  },
  {
    icon: ShoppingCart,
    title: "Cierre y métricas",
    description:
      "Recupera carritos, pagos y reportes de conversión en tiempo real.",
    bullets: [
      "Links de pago y actualización de estado",
      "Recuperación de carritos/abandono",
      "Dashboard de KPIs y aprendizaje continuo"
    ]
  }
];

const steps = [
  { num: 1, title: "El usuario escribe", desc: "Entra por Click-to-WhatsApp desde la web/anuncio." },
  { num: 2, title: "IA entiende intención", desc: "Clasifica pedido, extrae datos y responde." },
  { num: 3, title: "n8n acciona", desc: "Crea lead, avisa a ventas, envía propuesta/pago." },
  { num: 4, title: "Cierre y reporte", desc: "Se registra resultado y mejora el playbook." }
];

const WhatsAppBots = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo funciona un bot de WhatsApp para ventas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'El usuario inicia conversación por WhatsApp, la IA responde 24/7, califica el lead y dispara flujos en n8n para CRM, notificaciones y seguimiento.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Necesito la API oficial de WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Sí. Podemos trabajar con Meta WhatsApp Cloud API, Twilio o 360dialog/WATI. Te ayudamos a configurar el número y los webhooks.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Se integra con mi CRM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Sí. Integramos con HubSpot, Pipedrive, Notion, Google Sheets u otros via n8n. También automatizamos recordatorios y tareas.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Puedo aceptar pagos por WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Sí. Enviamos enlaces de pago, confirmamos estados y podemos recuperar carritos abandonados.'
        }
      }
    ]
  };

  return (
    <section id="whatsapp" className="py-24 relative">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Bots de WhatsApp</span> para ventas
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Convierte conversaciones en ingresos: IA + n8n + CRM para captar, calificar y cerrar 24/7.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((f) => (
            <Card key={f.title} className="glass-card p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-5 group-hover:glow-effect">
                <f.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{f.title}</h3>
              <p className="text-foreground-muted mb-4">{f.description}</p>
              <ul className="space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 block w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-sm text-foreground-muted">{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Cómo funciona</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold">
                    {s.num}
                  </span>
                  <span className="font-medium text-foreground">{s.title}</span>
                </div>
                <p className="text-sm text-foreground-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Hablar por WhatsApp">
              Hablar por WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#contacto" aria-label="Agendar una demo">
              Agendar demo
            </a>
          </Button>
        </div>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </section>
  );
};

export default WhatsAppBots;
