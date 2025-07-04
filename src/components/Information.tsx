
import { Info } from "lucide-react";

const Information = () => {
  return (
    <section id="about" className="scroll-mt-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Me</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Info className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience in building 
              modern web applications. I specialize in React, Node.js, and cloud technologies. 
              I love solving complex problems and creating user-friendly solutions that make a 
              real impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
