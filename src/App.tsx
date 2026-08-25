import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { initPixel, trackPageView } from "./lib/analytics";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Pricing = lazy(() => import("./pages/Pricing").then((module) => ({ default: module.Pricing })));
const BuildWithUs = lazy(() => import("./pages/BuildWithUs").then((module) => ({ default: module.BuildWithUs })));

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

// Meta Pixel: init once, then fire PageView on every client-side route change.
// The base pixel code only ever sees the first load in an SPA.
function PixelTracker() {
  const { pathname } = useLocation();
  const initialised = useRef(false);

  useEffect(() => {
    if (!initialised.current) {
      initPixel();
      initialised.current = true;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}

function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text relative overflow-clip font-sans p-3 md:p-6 lg:p-8">
      {/* Massive rounded page shell */}
      <div className="bg-surface w-full h-full min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)] rounded-[32px] md:rounded-[48px] overflow-clip shadow-[0_20px_80px_rgb(var(--scrim)/0.05)] border border-border relative flex flex-col transition-all duration-700">
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
      <PixelTracker />
      <Suspense fallback={<div className="min-h-screen bg-void" aria-label="Loading" />}>
        <Routes>
          <Route path="/" element={<PublicShell><Home /></PublicShell>} />
          <Route path="/about" element={<PublicShell><About /></PublicShell>} />
          <Route path="/pricing" element={<PublicShell><Pricing /></PublicShell>} />
          <Route path="/build-with-us" element={<PublicShell><BuildWithUs /></PublicShell>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <SpeedInsights />
    </Router>
  );
}

export default App;
