// components/resume/ResumeEducation.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumeEducationProps {
  education: any[];
}

const ResumeEducation: React.FC<ResumeEducationProps> = ({ education }) => {
  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <Card key={index}>
          <CardHeader className="p-1 md:p-6">
            <CardTitle>{edu.degree}</CardTitle>
            <p className="text-lg text-muted-foreground">{edu.institution}</p>
            <p className="text-sm text-muted-foreground">{edu.period}</p>
          </CardHeader>
          <CardContent className="p-1 md:p-6">
            <p>{edu.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeEducation;