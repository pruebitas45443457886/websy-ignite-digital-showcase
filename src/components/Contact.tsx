import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  message: z.string().min(10, "Cuéntanos más sobre tu proyecto"),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent("Nuevo proyecto - Websy");
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nEmpresa: ${data.company ?? "-"}\n\nMensaje:\n${data.message}`
    );
    window.location.href = `mailto:hello@websy.dev?subject=${subject}&body=${body}`;
    toast({ title: "¡Gracias!", description: "Abrimos tu correo para enviar el mensaje a Websy." });
    reset();
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Contacto</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Cuéntanos tu idea y te respondemos en menos de 24 horas.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Nombre</label>
              <Input placeholder="Tu nombre" {...register("name")} />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <Input placeholder="tucorreo@empresa.com" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Empresa (opcional)</label>
              <Input placeholder="Nombre de tu empresa" {...register("company")} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Mensaje</label>
              <Textarea placeholder="Cuéntanos sobre tu proyecto, objetivos, plazos y presupuesto aproximado." rows={6} {...register("message")} />
              {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;