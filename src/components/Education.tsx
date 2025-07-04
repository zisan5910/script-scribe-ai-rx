
import { GraduationCap } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University of Technology",
      year: "2018-2022",
      description: "Focused on software engineering and web development"
    },
    {
      degree: "Master of Software Engineering",
      school: "Tech Institute",
      year: "2022-2024",
      description: "Advanced studies in system architecture and design"
    }
  ];

  return (
    <section id="education" className="scroll-mt-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{edu.degree}</h3>
                <p className="text-gray-600 mb-1">{edu.school}</p>
                <p className="text-sm text-gray-500 mb-3">{edu.year}</p>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
