
import Navigation from "@/components/Navigation";
import ProfileSection from "@/components/ProfileSection";
import { Skill } from "@/components/Skill";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import CertificateSection from "@/components/CertificateSection";
import Information from "@/components/Information";
import FloatingMenu from "@/components/FloatingMenu";
import { content } from "@/data/content";
import { Product } from "@/types/Product";

interface IndexProps {
  addToCart?: (product: Product, size: string) => void;
}

const Index = ({ addToCart }: IndexProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <ProfileSection />
        
        <section id="skills" className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.skills.map((skill, index) => (
              <Skill key={index} {...skill} />
            ))}
          </div>
        </section>

        <Education />
        <Experience />
        <CertificateSection />
        <Information />
      </div>
      <FloatingMenu />
    </div>
  );
};

export default Index;
