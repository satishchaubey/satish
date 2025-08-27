// components/resume/ResumeProjects.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResumeProjectsProps {
  projects: any[];
}

const ResumeProjects: React.FC<ResumeProjectsProps> = ({ projects }) => {

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <Card key={index}>
          <CardHeader className="p-2 md:p-6">
            <CardTitle >{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech : string) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeProjects;