
import { Award } from "lucide-react";

const CertificateSection = () => {
  const certificates = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023",
      description: "Professional certification for cloud development"
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
      description: "Advanced React development skills certification"
    }
  ];

  return (
    <section id="certificates" className="scroll-mt-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{cert.name}</h3>
                <p className="text-gray-600 mb-1">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mb-3">{cert.date}</p>
                <p className="text-gray-700 text-sm">{cert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificateSection;
