import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Diagnostic } from "./pages/Diagnostic";
import { DiagnosticReceived } from "./pages/DiagnosticReceived";
import { BuildWithUs } from "./pages/BuildWithUs";
import { Footer } from "./components/Footer";

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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-primary relative overflow-hidden font-sans p-2 md:p-6 lg:p-8">
        {/* Massive rounded page shell */}
        <div className="bg-surface w-full h-full min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-3rem)] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-border/30 relative flex flex-col">
          <Navbar />
          <main className="relative z-10 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/request-demo" element={<Diagnostic />} />
              <Route path="/request-demo/received" element={<DiagnosticReceived />} />
              <Route path="/build-with-us" element={<BuildWithUs />} />
            </Routes>
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
