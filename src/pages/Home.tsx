import { DeploymentPath } from '../components/product/DeploymentPath';
import { GovernedAI } from '../components/product/GovernedAI';
import { OperatingLayer } from '../components/product/OperatingLayer';
import { OperatingLoop } from '../components/product/OperatingLoop';
import { OperatingMemory } from '../components/product/OperatingMemory';
import { TheDisconnect } from '../components/sections/BusinessProblem';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Hero } from '../components/sections/Hero';
import { Seo } from '../components/Seo';

export const Home = () => (
  <>
    <Seo
      title="Strata Core | One Controlled Business Flow"
      description="Strata Core is being designed to connect the facts, rules, owners and approvals behind everyday operations—so teams can move from customer conversation to revenue without losing context."
      path="/"
    />
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
