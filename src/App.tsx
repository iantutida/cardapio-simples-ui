import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Cliente
import Vitrine from "./pages/cliente/Vitrine";
import ProdutoDetalhes from "./pages/cliente/ProdutoDetalhes";
import Carrinho from "./pages/cliente/Carrinho";
import Checkout from "./pages/cliente/Checkout";
import Confirmacao from "./pages/cliente/Confirmacao";

// Admin
import AdminLogin from "./pages/admin/Login";
import AdminPedidos from "./pages/admin/Pedidos";
import AdminCatalogo from "./pages/admin/Catalogo";
import AdminCupons from "./pages/admin/Cupons";
import AdminMetricas from "./pages/admin/Metricas";

// Desktop
import DesktopFilaPedidos from "./pages/desktop/FilaPedidos";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/cliente" replace />} />
          
          {/* Cliente routes */}
          <Route path="/cliente" element={<Vitrine />} />
          <Route path="/cliente/produto/:id" element={<ProdutoDetalhes />} />
          <Route path="/cliente/carrinho" element={<Carrinho />} />
          <Route path="/cliente/checkout" element={<Checkout />} />
          <Route path="/cliente/confirmacao/:orderId" element={<Confirmacao />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/pedidos" element={<AdminPedidos />} />
          <Route path="/admin/catalogo" element={<AdminCatalogo />} />
          <Route path="/admin/cupons" element={<AdminCupons />} />
          <Route path="/admin/metricas" element={<AdminMetricas />} />
          
          {/* Desktop routes */}
          <Route path="/desktop/fila" element={<DesktopFilaPedidos />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
