import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Certification {
  name: string;
  institution: string;
  year: number;
}

interface ResumeCertificationsProps {
  certifications: Certification[];
}

const ResumeCertifications: React.FC<ResumeCertificationsProps> = ({ certifications }) => {
  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <Card key={index} className="">
          <CardHeader className="p-2 md:p-6">
            <CardTitle className="text-lg">{cert.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <p className="text-muted-foreground">{cert.institution}</p>
            <p className="text-sm text-muted-foreground">{cert.year}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface ResumeHobbiesProps {
  hobbies: string[];
}

const ResumeHobbies: React.FC<ResumeHobbiesProps> = ({ hobbies }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-2 md:p-6">
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span 
                key={index}
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                {hobby}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ResumeCertifications, ResumeHobbies };