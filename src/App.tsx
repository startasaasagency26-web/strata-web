import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { TrustStrip } from './components/sections/TrustStrip';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { SelectedWork } from './components/sections/SelectedWork';
import { Benefits } from './components/sections/Benefits';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 relative overflow-hidden">
      
      {/* Massive ambient bright glows for the reference image aesthetic */}
      <div className="absolute top-0 inset-x-0 h-screen pointer-events-none overflow-hidden flex justify-center z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/30 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[8000ms]" />
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/30 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] bg-pink-500/20 rounded-full blur-[150px] mix-blend-screen" />
      </div>
      
      {/* Secondary glow lower down the page */}
      <div className="absolute top-[40%] inset-x-0 h-screen pointer-events-none overflow-hidden flex justify-center z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[180px] mix-blend-screen" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <SelectedWork />
        <Benefits />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
