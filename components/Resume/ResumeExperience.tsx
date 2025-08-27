"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedDivider from "../comman/underline";
import { AnimatedButton } from "../ui/animated-button";
import { Sparkles } from "lucide-react";

interface ResumeExperienceProps {
  experiences: any[];
}

const ResumeExperience: React.FC<ResumeExperienceProps> = ({ experiences }) => {
  const [showAll, setShowAll] = useState(false);

  // Show first 4 if not expanded, otherwise show all
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <div className="space-y-6">
      {visibleExperiences.map((exp, index) => (
        <Card key={index}>
          <CardHeader className="p-0 pt-5 ">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{exp.role}</CardTitle>
                <p className="text-lg text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-4 ">
            <ul className="list-disc list-inside space-y-2 mb-4">
              {exp.description.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech: string) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <AnimatedDivider />
          </CardContent>
        </Card>
      ))}

      {/* Show button only if there are more than 4 experiences */}
      {experiences.length > 4 && (
        <div className="flex justify-center w-full">
          <AnimatedButton
            onClick={() => setShowAll(!showAll)}
            className="text-white cursor-pointer"
            variant="default"
            size="default"
            glow={true}
            textEffect="normal"
            uppercase={true}
            rounded="custom"
            asChild={false}
            hideAnimations={false}
            shimmerColor="#008080"
            shimmerSize="0.15em"
            shimmerDuration="3s"
            borderRadius="100px"
            background="rgba(0, 0, 0, 1)"
          >
            <Sparkles className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
            {showAll ? "Show Less" : "Know More"}
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};

export default ResumeExperience;
