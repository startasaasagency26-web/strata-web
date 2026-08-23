import { DeploymentPath } from '../components/product/DeploymentPath';
import { GovernedAI } from '../components/product/GovernedAI';
import { OperatingLayer } from '../components/product/OperatingLayer';
import { OperatingLoop } from '../components/product/OperatingLoop';
import { OperatingMemory } from '../components/product/OperatingMemory';
import { TheDisconnect } from '../components/sections/BusinessProblem';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Hero } from '../components/sections/Hero';

export const Home = () => (
  <>
    <Hero />
    <TheDisconnect />
    <OperatingLayer />
    <OperatingMemory />
    <OperatingLoop />
    <GovernedAI />
    <DeploymentPath />
    <FinalCTA />
  </>
);
