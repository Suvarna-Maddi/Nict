export const nictKnowledgeBase = {
  about: "NICT Computer Training Institute was established in 2010. Located in the heart of Girmajipet, Warangal, we bridge the gap between academic theory and real-world industry demands. We have over 15 years of excellence and have trained over 3,000 alumni.",
  courses: "We offer job-oriented practical courses including:\n1. DCA (Diploma in Computer Applications)\n2. Tally Prime & Accounting\n3. Programming (C, C++, Core Java, Python)\n4. Web Design (HTML, CSS)\n5. Basic Computer Skills\n6. Spoken English",
  timings: "Our institute is open:\nMonday to Saturday: 8:30 AM - 8:00 PM\nSunday: 10:00 AM - 5:30 PM",
  location: "We are located at Girmajipet, Warangal, Telangana, India.",
  contact: "You can reach us by phone/WhatsApp at +91 9441635615 or email us at info@nict.local.",
  certification: "We provide Skill-Based Certification (ISO 9001:2015 Standards) that is highly valued by local and regional employers as proof of practical competence.",
  enroll: "You can enroll by calling us or reaching out via WhatsApp at +91 9441635615.",
  howItWorks: "1. Master the Course with practical labs.\n2. Write the Exam to test your knowledge.\n3. Get Certified with our industry-recognized certificate."
};

// Intent keyword mapping
export const intents = [
  { keywords: ['course', 'learn', 'teach', 'subject', 'program', 'diploma', 'tally', 'python', 'java', 'c++'], key: 'courses' },
  { keywords: ['time', 'open', 'close', 'hour', 'schedule', 'timing'], key: 'timings' },
  { keywords: ['where', 'location', 'address', 'place', 'visit', 'city'], key: 'location' },
  { keywords: ['phone', 'contact', 'call', 'number', 'email', 'whatsapp', 'reach'], key: 'contact' },
  { keywords: ['certificate', 'certify', 'iso', 'proof', 'value'], key: 'certification' },
  { keywords: ['enroll', 'join', 'start', 'register', 'admission', 'fee', 'cost'], key: 'enroll' },
  { keywords: ['about', 'history', 'who', 'alumni', 'founded', 'established'], key: 'about' },
  { keywords: ['how', 'work', 'process', 'step', 'exam'], key: 'howItWorks' }
];

export function getChatbotResponse(userInput: string): string {
  const lowerInput = userInput.toLowerCase();
  
  // Greetings
  if (lowerInput.match(/^(hi|hello|hey|greetings|good morning|good afternoon)/)) {
    return "Hello! Welcome to NICT. How can I help you today? You can ask me about our courses, timings, location, or certifications.";
  }

  // Find best intent match
  for (const intent of intents) {
    if (intent.keywords.some(kw => lowerInput.includes(kw))) {
      return nictKnowledgeBase[intent.key as keyof typeof nictKnowledgeBase];
    }
  }

  // Default fallback
  return "I'm not quite sure I understand. Could you please rephrase? You can ask about our 'Courses', 'Timings', 'Location', or 'Contact number'.";
}
