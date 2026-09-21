import { HeroGlobe } from '../components/HeroGlobe'
import { WhatWeOffer } from '../components/WhatWeOffer'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { OurCourses } from '../components/OurCourses'
import { Stats } from '../components/Stats'
import { CallToAction } from '../components/CallToAction'

export function Home() {
  return (
    <>
      <HeroGlobe />
      <WhatWeOffer />
      <WhyChooseUs />
      <div id="courses"><OurCourses /></div>
      <Stats />
      <div id="enroll"><CallToAction /></div>
    </>
  );
}
