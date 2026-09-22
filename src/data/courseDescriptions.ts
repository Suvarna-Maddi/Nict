export const courseDescriptions: Record<string, string> = {
  "Python": "Demonstrating proficiency in Python programming and its applications.",
  "C Language": "Demonstrating a strong understanding of procedural programming and logic.",
  "C++ Language": "Demonstrating proficiency in object-oriented programming concepts.",
  "Java": "Demonstrating competence in building robust object-oriented applications.",
  "SQL": "Demonstrating the ability to design, query, and manage relational databases.",
  "Tally Prime": "Demonstrating proficiency in financial accounting and inventory management.",
  "DCA": "Demonstrating essential skills in office productivity and basic computing.",
};

export const getDefaultDescription = (courseName: string) => {
  return courseDescriptions[courseName] || `Demonstrating dedication and competence in this course.`;
};
