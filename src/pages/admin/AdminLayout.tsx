import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Helmet } from "react-helmet-async";

export default function AdminLayout() {
  return (
    <>
      <Helmet>
        <title>Panel de Administración | Websy</title>
        <meta name="description" content="Panel avanzado para gestionar proyectos y bots de WhatsApp (demo)." />
        <link rel="canonical" href={`${window.location.origin}/admin`} />
      </Helmet>
      <SidebarProvider>
        <header className="h-14 flex items-center border-b px-3">
          <SidebarTrigger className="mr-2" />
          <div className="font-medium">Panel de Administración (demo)</div>
        </header>
        <div className="flex min-h-[calc(100vh-56px)] w-full">
          <AdminSidebar />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
