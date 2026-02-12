import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/admin/hooks/useAuth";
import ProtectedRoute from "@/admin/components/ProtectedRoute";
import AdminLayout from "@/admin/layout/AdminLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const AdminLogin = lazy(() => import("@/admin/pages/Login"));
const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"));
const AdminMedia = lazy(() => import("@/admin/pages/Media"));
const AdminServices = lazy(() => import("@/admin/pages/Services"));
const AdminCases = lazy(() => import("@/admin/pages/Cases"));
const AdminPages = lazy(() => import("@/admin/pages/Pages"));
const AdminSEO = lazy(() => import("@/admin/pages/SEO"));
const AdminStats = lazy(() => import("@/admin/pages/Stats"));
const AdminSettings = lazy(() => import("@/admin/pages/Settings"));
const AdminAudit = lazy(() => import("@/admin/pages/Audit"));

const Portfolio = lazy(() => import("./pages/Portfolio"));
const CasePage = lazy(() => import("./pages/CasePage"));
const Services = lazy(() => import("./pages/Services"));
const Contacts = lazy(() => import("./pages/Contacts"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Consent = lazy(() => import("./pages/Consent"));
const Feedback = lazy(() => import("./pages/Feedback"));
const VKLanding = lazy(() => import("./pages/VKLanding"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navigation />}
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><span className="text-muted-foreground">Загрузка...</span></div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CasePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="cases" element={<AdminCases />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="seo" element={<AdminSEO />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="audit" element={<AdminAudit />} />
          </Route>
        </Route>
        {/* Legal pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/vk" element={<VKLanding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
