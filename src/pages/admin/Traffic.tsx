import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const visitsData = [
  { day: "Lun", visits: 120 },
  { day: "Mar", visits: 180 },
  { day: "Mié", visits: 150 },
  { day: "Jue", visits: 210 },
  { day: "Vie", visits: 280 },
  { day: "Sáb", visits: 320 },
  { day: "Dom", visits: 220 },
];

const pagesData = [
  { page: "/", views: 1200 },
  { page: "/whatsapp-bots", views: 980 },
  { page: "/servicios", views: 640 },
  { page: "/proyectos", views: 520 },
];

const sourcesData = [
  { name: "Orgánico", value: 55 },
  { name: "Pago", value: 25 },
  { name: "Referidos", value: 12 },
  { name: "Social", value: 8 },
];

export default function AdminTraffic() {
  const [range, setRange] = useState("7d");

  return (
    <>
      <Helmet>
        <title>Tráfico | Admin Websy</title>
        <meta name="description" content="Analítica demo: visitas, páginas vistas y fuentes de tráfico." />
        <link rel="canonical" href={`${window.location.origin}/admin/traffic`} />
      </Helmet>

      <section className="space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tráfico</h1>
            <p className="text-sm text-muted-foreground">Panel de analítica (demo sin integraciones).</p>
          </div>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rango" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
            </SelectContent>
          </Select>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Visitas por día</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitsData} margin={{ left: 12, right: 12 }}>
                  <defs>
                    <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ReTooltip />
                  <Area type="monotone" dataKey="visits" stroke="hsl(var(--primary))" fill="url(#fillVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Páginas más vistas</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pagesData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="page" />
                  <YAxis />
                  <ReTooltip />
                  <Bar dataKey="views" fill="hsl(var(--primary))" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fuentes de tráfico</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ReTooltip />
                <Legend />
                <Pie
                  data={sourcesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
