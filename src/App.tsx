import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { SelectedWork } from './components/sections/SelectedWork';
import { Technology } from './components/sections/Technology';
import { Benefits } from './components/sections/Benefits';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-primary relative overflow-hidden font-sans p-2 md:p-6 lg:p-8">
      {/* Massive rounded page shell */}
      <div className="bg-surface w-full h-full min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-3rem)] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-border/30 relative flex flex-col">
        <Navbar />
        <main className="relative z-10 flex-grow">
          <Hero />
          <Services />
          <Benefits />
          <Process />
          <SelectedWork />
          <Technology />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
