import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, TrendingUp } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led cross-functional teams of 10+ professionals"
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Developed and executed strategic initiatives"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Recognized for excellence and innovation"
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Delivered 30% revenue growth year-over-year"
    }
  ];

  const skills = [
    // Foundations
    "Calculus", "Linear Algebra", "Probability & Statistics", "Discrete Mathematics",
    "Digital Logic & Computer Architecture", "Technical English", "Sustainability & Ethics",
    
    // Core Computing & AI
    "Programming (Python, C++, OOP)", "Data Structures & Algorithms", "Database Systems (SQL)",
    "Software Engineering Principles", "Computer Networks & Security", "Artificial Intelligence",
    "Project Management & Team Collaboration",
    
    // Advanced Data Science & AI
    "Machine Learning", "Deep Learning (CNNs, RNNs, Transformers)", "Natural Language Processing",
    "Computer Vision & Speech Recognition", "Data Mining & Big Data Analytics", "ETL & Data Governance",
    "Explainable AI (XAI)", "MLOps", "Nature-Inspired Computation", "Cloud Computing & GIS",
    
    // Professional Experience
    "Internship Experience", "Senior Project Development"
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A dedicated and ambitious student with a strong foundation in programming, data science, and AI. 
              I enjoy building projects, learning new technologies, and collaborating with others to create impactful solutions.

            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Story */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">My Journey</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    With over 5 years of experience in [programming], I've had the privilege 
                    of working with diverse teams and organizations to solve complex challenges 
                    and drive meaningful change.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    My approach combines strategic thinking with hands-on execution, ensuring 
                    that vision translates into tangible results. I believe in the power of 
                    collaboration and continuous learning.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When I'm not working, you can find me exploring new technologies, 
                    mentoring young professionals, or contributing to community initiatives.
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Core Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 text-sm font-medium bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Highlights */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Key Highlights</h3>
              {highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-professional transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <highlight.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;