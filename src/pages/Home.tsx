import { HeroGlobe } from '../components/HeroGlobe'
import { WhatWeOffer } from '../components/WhatWeOffer'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { YouTubeSection } from '../components/YouTubeSection'
import { OurCourses } from '../components/OurCourses'
import { Opportunities } from '../components/Opportunities'
import { Stats } from '../components/Stats'
import { CallToAction } from '../components/CallToAction'
import { LocationContact } from '../components/LocationContact'

export function Home() {
  return (
    <>
      <HeroGlobe />
      <WhatWeOffer />
      <WhyChooseUs />
      <YouTubeSection />
      <div id="courses"><OurCourses /></div>
      <Opportunities />
      <Stats />
      <div id="enroll"><CallToAction /></div>
      <LocationContact />
    </>
  );
}
