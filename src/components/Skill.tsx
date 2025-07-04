
interface SkillProps {
  name: string;
  level: number;
  category: string;
}

export const Skill = ({ name, level, category }: SkillProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{name}</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{category}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${level}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{level}%</div>
    </div>
  );
};
