import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Contacts from "./pages/Contacts";
import ServiceStylist from "./pages/ServiceStylist";
import ServiceUgc from "./pages/ServiceUgc";
import ServicePhotographer from "./pages/ServicePhotographer";
import AdminDocumentation from "./pages/AdminDocumentation";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import VKLanding from "./pages/VKLanding";

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
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/services/stylist" element={<ServiceStylist />} />
            <Route path="/services/ugc" element={<ServiceUgc />} />
            <Route path="/services/photographer" element={<ServicePhotographer />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/documentation" element={<AdminDocumentation />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/vk" element={<VKLanding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
