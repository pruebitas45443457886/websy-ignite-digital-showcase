import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string; // ISO or human string for demo
  service: string;
  status: "pendiente" | "confirmada" | "cancelada";
  notes?: string;
}

const data: Appointment[] = [
  { id: "a1", name: "María Pérez", email: "maria@example.com", phone: "+57 3001234567", date: "2025-08-20 10:00", service: "Demo Bots", status: "pendiente", notes: "Prefiere WhatsApp" },
  { id: "a2", name: "Juan Gómez", email: "juan@example.com", phone: "+57 3019876543", date: "2025-08-21 15:30", service: "Ecommerce WA", status: "confirmada" },
  { id: "a3", name: "Laura Díaz", email: "laura@example.com", phone: "+57 3105556677", date: "2025-08-22 09:15", service: "Automatización", status: "pendiente" },
  { id: "a4", name: "Carlos Ruiz", email: "carlos@example.com", phone: "+57 3204447788", date: "2025-08-22 11:00", service: "Integración CRM", status: "cancelada", notes: "Reagendar" },
  { id: "a5", name: "Ana López", email: "ana@example.com", phone: "+57 3152223344", date: "2025-08-23 13:00", service: "Demo Bots", status: "confirmada" },
];

export default function AdminAppointments() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter((a) =>
      [a.name, a.email, a.phone, a.service, a.status].some((f) => f.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Agendamientos | Admin Websy</title>
        <meta name="description" content="Lista de agendamientos y detalles (demo sin backend)." />
        <link rel="canonical" href={`${window.location.origin}/admin/appointments`} />
      </Helmet>

      <section>
        <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Agendamientos</h1>
            <p className="text-sm text-muted-foreground">Explora y filtra citas entrantes (vista demo).</p>
          </div>
        </header>

        <div className="mb-4 flex items-center gap-2">
          <Input
            placeholder="Buscar por nombre, email, servicio o estado"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:max-w-md"
          />
        </div>

        <div className="relative w-full overflow-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{a.email}</div>
                    <div className="text-xs text-muted-foreground">{a.phone}</div>
                  </TableCell>
                  <TableCell className="text-sm">{a.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{a.service}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={a.status === "confirmada" ? "default" : a.status === "pendiente" ? "outline" : "destructive"}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">Ver</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Detalle de agendamiento</DialogTitle>
                          <DialogDescription>Información completa del contacto</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Nombre:</span> {a.name}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {a.email}
                          </div>
                          <div>
                            <span className="font-medium">Teléfono:</span> {a.phone}
                          </div>
                          <div>
                            <span className="font-medium">Fecha:</span> {a.date}
                          </div>
                          <div>
                            <span className="font-medium">Servicio:</span> {a.service}
                          </div>
                          <div>
                            <span className="font-medium">Estado:</span> {a.status}
                          </div>
                          {a.notes && (
                            <div>
                              <span className="font-medium">Notas:</span> {a.notes}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
