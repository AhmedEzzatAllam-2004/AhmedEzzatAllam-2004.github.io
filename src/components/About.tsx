import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Brain, BookOpen, Trophy } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Programming Skills",
      description: "Proficient in multiple programming languages and frameworks"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Experience with ML algorithms and deep learning frameworks"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Always exploring new technologies and staying updated with trends"
    },
    {
      icon: Trophy,
      title: "Academic Excellence",
      description: "Strong academic performance with focus on practical applications"
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
          <div className="mb-20 reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">✻ About</p>
            <h2 className="font-display text-6xl md:text-8xl text-foreground mb-8">
              A student <span className="italic-serif">obsessed</span><br />with building.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A dedicated and ambitious student with a strong foundation in programming, data science, and AI.
              I enjoy building projects, learning new technologies, and collaborating with others to create impactful solutions.
            </p>
          </div>


          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Story */}
            <div className="space-y-6 reveal-left">

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">My Journey</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    As a Computer Science student specializing in Data Science and AI, I'm passionate 
                    about exploring the intersection of technology and real-world problem solving. 
                    My academic journey has equipped me with strong programming skills and analytical thinking.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    I believe in learning by doing, which is why I actively work on projects that 
                    challenge me to apply theoretical knowledge to practical solutions. I'm always 
                    eager to collaborate and learn from others in the tech community.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When I'm not coding or studying, you can find me exploring new AI research papers, 
                    participating in hackathons, or contributing to open-source projects.
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
            <div className="space-y-6 reveal-right">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Key Highlights</h3>
              {highlights.map((highlight, index) => (
                <div key={index} className="reveal" data-delay={index * 120}>
                <Card
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
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;