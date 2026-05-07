import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Diagnostic } from "./pages/Diagnostic";
import { DiagnosticReceived } from "./pages/DiagnosticReceived";
import { BuildWithUs } from "./pages/BuildWithUs";
import { Footer } from "./components/Footer";
import { CONTACT } from "./config/contact";

// CRM Pages
import { Login as CrmLogin } from "./pages/crm/Login";
import { Dashboard as CrmDashboard } from "./pages/crm/Dashboard";
import { Leads as CrmLeads } from "./pages/crm/Leads";
import { LeadDetail as CrmLeadDetail } from "./pages/crm/LeadDetail";
import { Pipeline as CrmPipeline } from "./pages/crm/Pipeline";
import { FollowUps as CrmFollowUps } from "./pages/crm/FollowUps";
import { Settings as CrmSettings } from "./pages/crm/Settings";

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
    <div className="min-h-screen bg-background text-primary relative overflow-hidden font-sans p-2 md:p-6 lg:p-8">
      {/* Massive rounded page shell */}
      <div className="bg-surface w-full h-full min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-3rem)] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-border/30 relative flex flex-col">
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
    <Router>
      <ScrollToTop />
      <NoIndex />
      <Routes>
        {/* CRM Routes - No Shell */}
        <Route path="/crm/login" element={<CrmLogin />} />
        <Route path="/crm" element={<CrmDashboard />} />
        <Route path="/crm/leads" element={<CrmLeads />} />
        <Route path="/crm/leads/:id" element={<CrmLeadDetail />} />
        <Route path="/crm/pipeline" element={<CrmPipeline />} />
        <Route path="/crm/follow-ups" element={<CrmFollowUps />} />
        <Route path="/crm/settings" element={<CrmSettings />} />

        {/* Public Routes - With Shell */}
        <Route path="/" element={<PublicShell><Home /></PublicShell>} />
        <Route path="/about" element={<PublicShell><About /></PublicShell>} />
        <Route path={CONTACT.requestDemoPath} element={<PublicShell><Diagnostic /></PublicShell>} />
        <Route path={`${CONTACT.requestDemoPath}/received`} element={<PublicShell><DiagnosticReceived /></PublicShell>} />
        <Route path="/build-with-us" element={<PublicShell><BuildWithUs /></PublicShell>} />
      </Routes>
    </Router>
  );
}

export default App;
