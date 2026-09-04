import { DeploymentPath } from '../components/product/DeploymentPath';
import { OperatingLayer } from '../components/product/OperatingLayer';
import { OperatingLoop } from '../components/product/OperatingLoop';
import { TheDisconnect } from '../components/sections/BusinessProblem';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Hero } from '../components/sections/Hero';
import { Seo } from '../components/Seo';
import { routeMetadata } from '../config/routeMetadata';

export const Home = () => (
  <>
    <Seo {...routeMetadata.home} />
    <Hero />
    <TheDisconnect />
    <DeploymentPath />
    <OperatingLoop />
    <OperatingLayer />
    <FinalCTA />
  </>
);
