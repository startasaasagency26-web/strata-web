import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { Process } from '../components/sections/Process';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Technology } from '../components/sections/Technology';
import { Benefits } from '../components/sections/Benefits';
import { Pricing } from '../components/sections/Pricing';
import { FAQ } from '../components/sections/FAQ';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Industries } from '../components/sections/Industries';
import LiquidGlassDemo from '../components/sections/LiquidGlassDemo';

export const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <Benefits />
      <Process />
      <SelectedWork />
      <Technology />
      <LiquidGlassDemo />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
};
