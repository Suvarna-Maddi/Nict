import { SEO } from '../components/SEO'
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
      <SEO 
        title="Best Computer & Spoken English Institute"
        description="Join NICT, the premier Computer and Spoken English Institute. We offer practical courses in IT, management, and soft skills to accelerate your career."
        keywords="computer institute, spoken english, IT courses, management courses, coding, programming, web development, NICT"
        url="https://nict.edu.in/"
      />
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
