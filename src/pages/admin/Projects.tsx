import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import img1 from "@/assets/projects/project1.jpg";
import img2 from "@/assets/projects/project2.jpg";
import img3 from "@/assets/projects/project3.jpg";

const schema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  longDescription: z.string().min(20).optional(),
  tags: z.string().optional(),
  cover: z.any().optional(),
  gallery: z.any().optional(),
});

type Project = {
  id: string;
  title: string;
  summary: string;
  longDescription?: string;
  tags: string[];
  coverUrl?: string;
  galleryUrls?: string[];
};

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Bot de WhatsApp para lead gen",
    summary: "Califica leads 24/7 y agenda citas automáticamente.",
    longDescription: "Implementación de bot conversacional que califica automáticamente leads, captura datos clave y agenda citas en el calendario. Integrado con CRM y flujos n8n.",
    tags: ["WhatsApp", "Ventas", "n8n"],
    coverUrl: img1,
    galleryUrls: [img1, img2, img3],
  },
  {
    id: "2",
    title: "Carrito + pagos por WhatsApp",
    summary: "Catálogo, pedidos y cobros con flujos automáticos.",
    longDescription: "Sistema de ecommerce ligero en WhatsApp con catálogo, carrito, estado de pedido y cobros. Automatizaciones para seguimiento y remarketing.",
    tags: ["Ecommerce", "Automatización"],
    coverUrl: img2,
    galleryUrls: [img2, img3, img1],
  },
];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Project | null>(null);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return projects.filter((p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
  }, [projects, query]);

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { title: "", summary: "", longDescription: "", tags: "", cover: undefined, gallery: undefined } });

  const openCreate = () => {
    setEditing(null);
    form.reset({ title: "", summary: "", tags: "", cover: undefined });
  };

const openEdit = (p: Project) => {
  setEditing(p);
  form.reset({ title: p.title, summary: p.summary, longDescription: p.longDescription || "", tags: p.tags.join(", ") });
};

const onSubmit = (values: z.infer<typeof schema>) => {
  const tags = (values.tags || "").split(",").map(t => t.trim()).filter(Boolean);
  const coverFile = (values.cover as FileList | undefined)?.[0];
  let coverUrl: string | undefined = coverFile ? URL.createObjectURL(coverFile) : editing?.coverUrl;

  const galleryFiles = Array.from((values.gallery as FileList | undefined) ?? []);
  const galleryUrls = galleryFiles.map((f) => URL.createObjectURL(f));
  const longDescription = values.longDescription || "";

  if (editing) {
    setProjects((prev) => prev.map((p) => p.id === editing.id ? {
      ...p,
      title: values.title,
      summary: values.summary,
      longDescription,
      tags,
      coverUrl,
      galleryUrls: galleryUrls.length ? galleryUrls : p.galleryUrls,
    } : p));
    toast({ title: "Proyecto actualizado (demo)", description: values.title });
  } else {
    const id = Math.random().toString(36).slice(2, 9);
    setProjects((prev) => [{ id, title: values.title, summary: values.summary, longDescription, tags, coverUrl, galleryUrls }, ...prev]);
    toast({ title: "Proyecto creado (demo)", description: values.title });
  }
};

  const onDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Proyecto eliminado (demo)" });
  };

  return (
    <>
      <Helmet>
        <title>Proyectos | Admin Websy</title>
        <meta name="description" content="Gestiona proyectos (crear, editar, eliminar) – vista demo sin backend." />
        <link rel="canonical" href={`${window.location.origin}/admin/projects`} />
      </Helmet>

      <section>
        <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Proyectos</h1>
            <p className="text-sm text-muted-foreground">CRUD de muestra. En producción, se conecta a Supabase Storage y DB.</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="mr-2 h-4 w-4" /> Nuevo proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editing ? "Editar proyecto" : "Nuevo proyecto"}</DialogTitle>
                <DialogDescription>Completa los datos del proyecto.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Bot de WhatsApp para ventas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resumen</FormLabel>
                        <FormControl>
                          <Textarea rows={3} placeholder="Qué logra, resultados, automations..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción larga</FormLabel>
                        <FormControl>
                          <Textarea rows={5} placeholder="Historia del proyecto, objetivos, arquitectura, KPIs..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (separados por coma)</FormLabel>
                        <FormControl>
                          <Input placeholder="WhatsApp, Ventas, n8n" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cover"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portada (opcional)</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gallery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Galería (múltiples imágenes opcional)</FormLabel>
                        <FormControl>
                          <Input multiple type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Button type="submit">Guardar</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </header>

        <div className="mb-4 flex items-center gap-2">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Buscar por título, resumen o tag" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        <div className="relative w-full overflow-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Resumen</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Portada</TableHead>
                <TableHead className="w-[140px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-muted-foreground">{p.summary}</TableCell>
                  <TableCell className="space-x-1">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    {p.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.coverUrl} alt={`Portada ${p.title}`} className="h-10 w-16 object-cover rounded" loading="lazy" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="sm" onClick={() => openEdit(p)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Editar proyecto</DialogTitle>
                          <DialogDescription>Actualiza los datos del proyecto.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Título</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Bot de WhatsApp para ventas" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="summary"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Resumen</FormLabel>
                                  <FormControl>
                                    <Textarea rows={3} placeholder="Qué logra, resultados, automations..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="longDescription"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Descripción larga</FormLabel>
                                  <FormControl>
                                    <Textarea rows={5} placeholder="Historia del proyecto, objetivos, arquitectura, KPIs..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="tags"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tags (separados por coma)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="WhatsApp, Ventas, n8n" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="cover"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Portada (opcional)</FormLabel>
                                  <FormControl>
                                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="gallery"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Galería (múltiples imágenes opcional)</FormLabel>
                                  <FormControl>
                                    <Input multiple type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex justify-end gap-2">
                              <Button type="submit">Guardar</Button>
                            </div>
                          </form>
                        </Form>
                        </DialogContent>
                      </Dialog>

                      <Button variant="destructive" size="sm" onClick={() => onDelete(p.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
