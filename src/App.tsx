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

// New service pages
import BrandStyling from "./pages/services/BrandStyling";
import ClientShoot from "./pages/services/ClientShoot";
import WardrobeAudit from "./pages/services/WardrobeAudit";
import PersonalShopping from "./pages/services/PersonalShopping";
import CapsuleWardrobe from "./pages/services/CapsuleWardrobe";
import EventLook from "./pages/services/EventLook";
import PhotoVideo from "./pages/services/PhotoVideo";
import AIContent from "./pages/services/AIContent";

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
            {/* New service routes */}
            <Route path="/services/brand-styling" element={<BrandStyling />} />
            <Route path="/services/client-shoot" element={<ClientShoot />} />
            <Route path="/services/wardrobe-audit" element={<WardrobeAudit />} />
            <Route path="/services/personal-shopping" element={<PersonalShopping />} />
            <Route path="/services/capsule-wardrobe" element={<CapsuleWardrobe />} />
            <Route path="/services/event-look" element={<EventLook />} />
            <Route path="/services/photo-video" element={<PhotoVideo />} />
            <Route path="/services/ai-content" element={<AIContent />} />
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
