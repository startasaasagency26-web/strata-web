import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Diagnostic } from "./pages/Diagnostic";
import { DiagnosticReceived } from "./pages/DiagnosticReceived";
import { BuildWithUs } from "./pages/BuildWithUs";
import { Pricing } from "./pages/Pricing";
import { Footer } from "./components/Footer";
import { CONTACT } from "./config/contact";

// CRM Auth & Protection
import { CrmAuthProvider } from "./contexts/CrmAuthContext";
import { ProtectedCrmRoute } from "./components/crm/ProtectedCrmRoute";

const CrmLogin = lazy(() => import("./pages/crm/Login").then((module) => ({ default: module.Login })));
const CrmResetPassword = lazy(() => import("./pages/crm/ResetPassword").then((module) => ({ default: module.ResetPassword })));
const CrmDashboard = lazy(() => import("./pages/crm/Dashboard").then((module) => ({ default: module.Dashboard })));
const CrmDashboardPreview = lazy(() => import("./pages/crm/Dashboard").then((module) => ({ default: module.DashboardPreview })));
const CrmLeads = lazy(() => import("./pages/crm/Leads").then((module) => ({ default: module.Leads })));
const CrmLeadDetail = lazy(() => import("./pages/crm/LeadDetail").then((module) => ({ default: module.LeadDetail })));
const CrmPipeline = lazy(() => import("./pages/crm/Pipeline").then((module) => ({ default: module.Pipeline })));
const CrmFollowUps = lazy(() => import("./pages/crm/FollowUps").then((module) => ({ default: module.FollowUps })));
const CrmOutreach = lazy(() => import("./pages/crm/Outreach").then((module) => ({ default: module.Outreach })));
const CrmSettings = lazy(() => import("./pages/crm/Settings").then((module) => ({ default: module.Settings })));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

// SEO Helper for CRM
function NoIndex() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith('/crm')) {
      let meta = document.querySelector('meta[name="robots"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'robots');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'noindex, nofollow');
    }
  }, [location.pathname]);
  return null;
}

function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-primary relative overflow-clip font-sans p-3 md:p-6 lg:p-8">
      {/* Massive rounded page shell */}
      <div className="bg-surface w-full h-full min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)] rounded-[32px] md:rounded-[48px] overflow-clip shadow-[0_20px_80px_rgba(0,0,0,0.05)] border border-black/5 relative flex flex-col transition-all duration-700">
        <Navbar />
        <main className="relative z-10 flex-grow">
          {children}
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CrmAuthProvider>
      <Router>
        <ScrollToTop />
        <NoIndex />
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" aria-label="Loading" />}>
          <Routes>
          {/* CRM Routes - No Shell */}
          <Route path="/crm-preview" element={<CrmDashboardPreview />} />
          <Route path="/crm/login" element={<CrmLogin />} />
          <Route path="/crm/reset-password" element={<CrmResetPassword />} />
          
          <Route path="/crm" element={<ProtectedCrmRoute><CrmDashboard /></ProtectedCrmRoute>} />
          <Route path="/crm/leads" element={<ProtectedCrmRoute><CrmLeads /></ProtectedCrmRoute>} />
          <Route path="/crm/leads/:id" element={<ProtectedCrmRoute><CrmLeadDetail /></ProtectedCrmRoute>} />
          <Route path="/crm/pipeline" element={<ProtectedCrmRoute><CrmPipeline /></ProtectedCrmRoute>} />
          <Route path="/crm/follow-ups" element={<ProtectedCrmRoute><CrmFollowUps /></ProtectedCrmRoute>} />
          <Route path="/crm/outreach" element={<ProtectedCrmRoute><CrmOutreach /></ProtectedCrmRoute>} />
          <Route path="/crm/settings" element={<ProtectedCrmRoute><CrmSettings /></ProtectedCrmRoute>} />

          {/* Public Routes - With Shell */}
          <Route path="/" element={<PublicShell><Home /></PublicShell>} />
          <Route path="/about" element={<PublicShell><About /></PublicShell>} />
          <Route path="/pricing" element={<PublicShell><Pricing /></PublicShell>} />
          <Route path={CONTACT.requestDemoPath} element={<PublicShell><Diagnostic /></PublicShell>} />
          <Route path={`${CONTACT.requestDemoPath}/received`} element={<PublicShell><DiagnosticReceived /></PublicShell>} />
          <Route path="/build-with-us" element={<PublicShell><BuildWithUs /></PublicShell>} />
          </Routes>
        </Suspense>
        <SpeedInsights />
      </Router>
    </CrmAuthProvider>
  );
}

export default App;
