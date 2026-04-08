import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PublicValidation from "./pages/PublicValidation";
import Dashboard from "./pages/Dashboard";
import Procesos from "./pages/Procesos";
import GenerarEnlace from "./pages/GenerarEnlace";
import Usuarios from "./pages/Usuarios";
import Reportes from "./pages/Reportes";
import Auditoria from "./pages/Auditoria";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/validacion" element={<PublicValidation />} />
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/procesos" element={<Procesos />} />
            <Route path="/dashboard/generar-enlace" element={<ProtectedRoute roles={['principal', 'operativo']}><GenerarEnlace /></ProtectedRoute>} />
            <Route path="/dashboard/usuarios" element={<ProtectedRoute roles={['principal']}><Usuarios /></ProtectedRoute>} />
            <Route path="/dashboard/reportes" element={<ProtectedRoute roles={['auditor']}><Reportes /></ProtectedRoute>} />
            <Route path="/dashboard/auditoria" element={<ProtectedRoute roles={['auditor']}><Auditoria /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
