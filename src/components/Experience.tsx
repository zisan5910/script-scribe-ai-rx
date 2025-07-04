
import { Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Corp",
      period: "2022 - Present",
      description: "Leading development of web applications using React, Node.js, and cloud technologies."
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built responsive web interfaces and improved user experience across multiple products."
    }
  ];

  return (
    <section id="experience" className="scroll-mt-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{exp.title}</h3>
                <p className="text-gray-600 mb-1">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
