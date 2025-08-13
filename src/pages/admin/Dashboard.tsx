import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  FolderKanban, 
  Eye, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  Settings
} from "lucide-react";

const serviceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.string().min(1),
});

type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  status: "active" | "inactive";
};

type PendingClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  priority: "high" | "medium" | "low";
};

const Stat = ({ title, value, icon: Icon, trend }: { 
  title: string; 
  value: string; 
  icon: any; 
  trend?: string 
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+{trend}</span> desde el mes pasado
        </p>
      )}
    </CardContent>
  </Card>
);

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  action, 
  buttonText 
}: {
  title: string;
  description: string;
  icon: any;
  action: () => void;
  buttonText: string;
}) => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button onClick={action} className="w-full">
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([
    { id: "1", name: "Bot de WhatsApp", description: "Automatización completa", price: "$500", status: "active" },
    { id: "2", name: "Landing Page", description: "Diseño y desarrollo", price: "$300", status: "active" },
    { id: "3", name: "Consultoría", description: "Asesoría personalizada", price: "$150/h", status: "inactive" },
  ]);

  const [pendingClients] = useState<PendingClient[]>([
    {
      id: "1",
      name: "María González",
      email: "maria@empresa.com",
      phone: "+34 600 123 456",
      service: "Bot de WhatsApp",
      message: "Necesito automatizar las ventas de mi tienda online",
      date: "2024-01-15",
      priority: "high"
    },
    {
      id: "2", 
      name: "Carlos Ruiz",
      email: "carlos@startup.es",
      phone: "+34 700 987 654",
      service: "Landing Page",
      message: "Quiero una página para mi nueva startup",
      date: "2024-01-14",
      priority: "medium"
    },
    {
      id: "3",
      name: "Ana López",
      email: "ana@comercio.com",
      phone: "+34 650 555 123",
      service: "Consultoría",
      message: "Necesito ayuda con la estrategia digital",
      date: "2024-01-13",
      priority: "low"
    }
  ]);

  const { toast } = useToast();
  const serviceForm = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: "", description: "", price: "" }
  });

  const handleAddService = (values: z.infer<typeof serviceSchema>) => {
    const newService: Service = {
      id: Math.random().toString(36).slice(2, 9),
      name: values.name,
      description: values.description,
      price: values.price,
      status: "active"
    };
    setServices(prev => [...prev, newService]);
    toast({ title: "Servicio agregado (demo)", description: values.name });
    serviceForm.reset();
  };

  const toggleServiceStatus = (id: string) => {
    setServices(prev => prev.map(service => 
      service.id === id 
        ? { ...service, status: service.status === "active" ? "inactive" : "active" }
        : service
    ));
    toast({ title: "Estado del servicio actualizado (demo)" });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>Panel de Control | Admin Websy</title>
        <meta name="description" content="Panel completo de administración para gestionar proyectos, servicios y clientes." />
        <link rel="canonical" href={`${window.location.origin}/admin`} />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
          <p className="text-muted-foreground">
            Gestiona todos los aspectos de tu negocio desde aquí
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Stat 
            title="Proyectos Activos" 
            value="12" 
            icon={FolderKanban}
            trend="20%"
          />
          <Stat 
            title="Clientes en Espera" 
            value="3" 
            icon={Clock}
            trend="2"
          />
          <Stat 
            title="Servicios Activos" 
            value="5" 
            icon={Settings}
          />
          <Stat 
            title="Visitas del Mes" 
            value="2.4k" 
            icon={TrendingUp}
            trend="12%"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Nuevo Proyecto"
            description="Sube un nuevo proyecto realizado con imágenes y descripción"
            icon={Plus}
            action={() => window.location.href = "/admin/projects"}
            buttonText="Crear Proyecto"
          />
          
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <QuickActionCard
                  title="Agregar Servicio"
                  description="Añade un nuevo servicio a tu catálogo"
                  icon={Settings}
                  action={() => {}}
                  buttonText="Nuevo Servicio"
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Servicio</DialogTitle>
                <DialogDescription>
                  Completa la información del servicio que quieres ofrecer.
                </DialogDescription>
              </DialogHeader>
              <Form {...serviceForm}>
                <form onSubmit={serviceForm.handleSubmit(handleAddService)} className="space-y-4">
                  <FormField
                    control={serviceForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Servicio</FormLabel>
                        <FormControl>
                          <Input placeholder="Bot de WhatsApp, Landing Page..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={serviceForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea rows={3} placeholder="Describe qué incluye este servicio..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={serviceForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input placeholder="$500, $150/h, Bajo presupuesto..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="submit">Agregar Servicio</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <QuickActionCard
            title="Ver Tráfico"
            description="Analiza las visitas y comportamiento de usuarios"
            icon={Eye}
            action={() => window.location.href = "/admin/traffic"}
            buttonText="Ver Analytics"
          />
        </div>

        {/* Services Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Servicios Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{service.name}</h4>
                      <Badge variant={service.status === "active" ? "default" : "secondary"}>
                        {service.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <p className="text-sm font-medium text-primary">{service.price}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleServiceStatus(service.id)}
                  >
                    {service.status === "active" ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Clients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clientes en Espera ({pendingClients.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingClients.map((client) => (
                <div key={client.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${client.name}`} />
                    <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{client.name}</h4>
                      <Badge className={getPriorityColor(client.priority)}>
                        {client.priority === "high" ? "Alta" : client.priority === "medium" ? "Media" : "Baja"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(client.date).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                    <div className="text-sm">
                      <p><strong>Servicio:</strong> {client.service}</p>
                      <p><strong>Mensaje:</strong> {client.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Contactar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Agendar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Nuevo proyecto "Bot E-commerce" subido</span>
                <span className="text-muted-foreground ml-auto">hace 2 horas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Cliente María González contactó</span>
                <span className="text-muted-foreground ml-auto">hace 4 horas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Servicio "Consultoría" actualizado</span>
                <span className="text-muted-foreground ml-auto">hace 1 día</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
