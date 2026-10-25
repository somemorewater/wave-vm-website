import Hero from "@/components/Hero";
import {
  DocsPreview,
  FeaturePreview,
  RoadmapPreview,
  StatusSnapshot,
} from "@/components/HomeSections";
import { Closing, OpenSource } from "@/components/Sections";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <StatusSnapshot />
      <FeaturePreview />
      <RoadmapPreview />
      <DocsPreview />
      <OpenSource />
      <Closing />
    </main>
  );
}
