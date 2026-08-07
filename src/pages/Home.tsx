import { Hero } from '../components/sections/Hero';
import { BusinessProblem } from '../components/sections/BusinessProblem';
import { SystemFlow } from '../components/sections/SystemFlow';
import { AiOperatingSystem } from '../components/sections/AiOperatingSystem';
import { Services } from '../components/sections/Services';
import { Benefits } from '../components/sections/Benefits';
import { Industries } from '../components/sections/Industries';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Process } from '../components/sections/Process';
import { Technology } from '../components/sections/Technology';
import { FAQ } from '../components/sections/FAQ';
import { FinalCTA } from '../components/sections/FinalCTA';

export const Home = () => {
  return (
    <>
      <Hero />
      <BusinessProblem />
      <SystemFlow />
      <AiOperatingSystem />
      <Services />
      <Benefits />
      <Industries />
      <SelectedWork />
      <Process />
      <Technology />
      <FAQ />
      <FinalCTA />
    </>
  );
};
