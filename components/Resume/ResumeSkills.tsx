// components/resume/ResumeSkills.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Server, Database, Code2, Cpu } from "lucide-react";

interface ResumeSkillsProps {
  skills: any[];
}

const ProficiencyBar: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-2 w-5 rounded-full ${i <= level ? 'bg-primary' : 'bg-muted'}`}
        />
      ))}
    </div>
  );
};

const SkillCategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  switch (category) {
    case "Frontend":
      return <Palette className="h-4 w-4" />;
    case "Backend":
      return <Server className="h-4 w-4" />;
    case "Database":
      return <Database className="h-4 w-4" />;
    case "Language":
      return <Code2 className="h-4 w-4" />;
    default:
      return <Cpu className="h-4 w-4" />;
  }
};

const ResumeSkills: React.FC<ResumeSkillsProps> = ({ skills }) => {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <Card key={category}>
          <CardHeader className="p-2 md:p-6">
            <CardTitle className="flex items-center gap-2 ">
              <SkillCategoryIcon category={category} />
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <div className="space-y-4">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div key={skill.name} className="flex justify-between items-center">
                    <span>{skill.name}</span>
                    <ProficiencyBar level={skill.proficiency} />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeSkills;