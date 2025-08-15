import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import initAnimations from "./lib/animation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminAppointments from "./pages/admin/Appointments";
import AdminTraffic from "./pages/admin/Traffic";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Usamos un enfoque más sofisticado para la inicialización
    // Primero cargamos y preparamos el DOM
    const prepareDOM = () => {
      document.body.classList.add('animation-ready');
      document.body.style.overflow = 'hidden'; // Bloqueamos scroll durante la intro
    };
    
    // Luego ejecutamos las animaciones
    const startAnimations = () => {
      console.log('Iniciando animaciones avanzadas');
      initAnimations();
      
      // Revelamos el contenido gradualmente
      setTimeout(() => {
        document.body.style.overflow = ''; // Restauramos scroll
        
        // Agregamos clase para efectos visuales adicionales
        document.body.classList.add('animations-completed');
      }, 2500);
    };
    
    // Secuencia de inicialización optimizada
    prepareDOM();
    const timer = setTimeout(startAnimations, 300);
    
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('animation-ready', 'animations-completed');
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div data-barba="wrapper">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="appointments" element={<AdminAppointments />} />
                <Route path="traffic" element={<AdminTraffic />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
