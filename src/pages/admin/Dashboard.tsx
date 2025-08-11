import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Stat = ({ title, value }: { title: string; value: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Resumen | Admin Websy</title>
        <meta name="description" content="Resumen del panel de administración (demo)." />
        <link rel="canonical" href={`${window.location.origin}/admin`} />
      </Helmet>
      <section>
        <h1 className="text-2xl font-bold tracking-tight mb-4">Resumen</h1>
        <p className="text-sm text-muted-foreground mb-6">Métricas de muestra (no conectado a backend).</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Proyectos publicados" value="12" />
          <Stat title="Leads del mes" value="87" />
          <Stat title="Bots activos" value="5" />
          <Stat title="Tasa de respuesta" value="92%" />
        </div>
      </section>
    </>
  );
}
