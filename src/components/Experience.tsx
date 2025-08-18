import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior [Your Role]",
      company: "Company Name",
      location: "City, Country",
      period: "2020 - Present",
      description: "Leading strategic initiatives and driving digital transformation across multiple business units. Responsible for managing cross-functional teams and delivering high-impact projects.",
      achievements: [
        "Increased operational efficiency by 35%",
        "Led team of 15+ professionals",
        "Implemented new processes saving $2M annually"
      ],
      skills: ["Leadership", "Strategy", "Project Management", "Innovation"]
    },
    {
      title: "[Previous Role]",
      company: "Previous Company",
      location: "City, Country", 
      period: "2017 - 2020",
      description: "Managed key client relationships and developed comprehensive business solutions. Focused on process optimization and team development.",
      achievements: [
        "Grew client portfolio by 50%",
        "Reduced project delivery time by 25%",
        "Mentored 10+ junior team members"
      ],
      skills: ["Client Relations", "Business Development", "Process Optimization"]
    },
    {
      title: "[Earlier Role]",
      company: "Earlier Company",
      location: "City, Country",
      period: "2015 - 2017",
      description: "Started career focusing on [specific area]. Gained expertise in foundational skills while contributing to various projects and initiatives.",
      achievements: [
        "Completed certification in [relevant field]",
        "Contributed to 5+ major projects",
        "Received recognition for outstanding performance"
      ],
      skills: ["Technical Skills", "Analysis", "Communication"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
            <p className="text-xl text-muted-foreground">
              A journey of growth, learning, and meaningful contributions
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-professional"></div>

                {/* Content */}
                <div className="ml-20">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-professional transition-all duration-300">
                    <CardContent className="p-8">
                      {/* Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {exp.title}
                          </h3>
                          <div className="flex items-center text-primary font-semibold mb-2">
                            <Building className="w-4 h-4 mr-2" />
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-col lg:items-end space-y-2">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            {exp.period}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-foreground mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Skills Applied</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="px-3 py-1 text-sm bg-accent text-accent-foreground"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;