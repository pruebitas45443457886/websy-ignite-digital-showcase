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
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  tags: z.string().optional(),
  cover: z.any().optional(),
});

type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  coverUrl?: string;
};

const initialProjects: Project[] = [
  { id: "1", title: "Bot de WhatsApp para lead gen", summary: "Califica leads 24/7 y agenda citas automáticamente.", tags: ["WhatsApp", "Ventas", "n8n"], coverUrl: undefined },
  { id: "2", title: "Carrito + pagos por WhatsApp", summary: "Catálogo, pedidos y cobros con flujos automáticos.", tags: ["Ecommerce", "Automatización"], coverUrl: undefined },
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

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { title: "", summary: "", tags: "", cover: undefined } });

  const openCreate = () => {
    setEditing(null);
    form.reset({ title: "", summary: "", tags: "", cover: undefined });
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    form.reset({ title: p.title, summary: p.summary, tags: p.tags.join(", ") });
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    const tags = (values.tags || "").split(",").map(t => t.trim()).filter(Boolean);
    let coverUrl: string | undefined = undefined;
    const file = (values.cover as FileList | undefined)?.[0];
    if (file) coverUrl = URL.createObjectURL(file);

    if (editing) {
      setProjects((prev) => prev.map((p) => p.id === editing.id ? { ...p, title: values.title, summary: values.summary, tags, coverUrl } : p));
      toast({ title: "Proyecto actualizado (demo)", description: values.title });
    } else {
      const id = Math.random().toString(36).slice(2, 9);
      setProjects((prev) => [{ id, title: values.title, summary: values.summary, tags, coverUrl }, ...prev]);
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
