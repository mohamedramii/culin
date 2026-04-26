import { CulinHero } from "../components/CulinHero";
import { CulinAbout } from "../components/CulinAbout";
import { CulinServices } from "../components/CulinServices";
import { CulinInteractiveShowcase } from "../components/CulinInteractiveShowcase";
import { CulinPortfolio } from "../components/CulinPortfolio";
import { CulinDetails3D } from "../components/CulinDetails3D";
import { CulinProcess } from "../components/CulinProcess";
import { CulinMaterials } from "../components/CulinMaterials";
import { CulinTestimonials } from "../components/CulinTestimonials";
import { CulinCta } from "../components/CulinCta";

export function Home() {
  return (
    <>
      <CulinHero />
      <CulinAbout />
      <CulinServices />
      <CulinInteractiveShowcase />
      <CulinPortfolio />
      <CulinDetails3D />
      <CulinProcess />
      <CulinMaterials />
      <CulinTestimonials />
      <CulinCta />
    </>
  );
}
