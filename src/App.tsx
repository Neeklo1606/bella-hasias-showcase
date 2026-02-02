import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServiceStylist from "./pages/ServiceStylist";
import ServiceUgc from "./pages/ServiceUgc";
import ServicePhotographer from "./pages/ServicePhotographer";
import AdminDocumentation from "./pages/AdminDocumentation";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/stylist" element={<ServiceStylist />} />
            <Route path="/services/ugc" element={<ServiceUgc />} />
            <Route path="/services/photographer" element={<ServicePhotographer />} />
            <Route path="/admin/documentation" element={<AdminDocumentation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
