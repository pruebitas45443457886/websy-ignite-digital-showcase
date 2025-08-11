import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log("Demo login:", values);
    toast({ title: "Demo: sesión iniciada", description: "Accediendo al panel de administración." });
    navigate("/admin");
  };

  return (
    <>
      <Helmet>
        <title>Login Admin | Websy</title>
        <meta name="description" content="Inicia sesión para acceder al panel de administración de Websy." />
        <link rel="canonical" href={`${window.location.origin}/login`} />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center px-6" id="login">
        <section className="w-full max-w-md glass-card rounded-2xl p-6 border">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
            <p className="text-sm text-muted-foreground">Acceso de administrador (vista demo, sin backend)</p>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@websy.dev" {...field} />
                    </FormControl>
                    <FormDescription>Usa cualquier email (solo demo)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>6+ caracteres</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </Form>
        </section>
      </main>
    </>
  );
}
