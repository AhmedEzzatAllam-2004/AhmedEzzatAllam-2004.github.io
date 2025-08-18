import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Strategic Digital Transformation",
      description: "Led comprehensive digital transformation initiative across organization, implementing new technologies and processes to improve efficiency and customer experience.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      technologies: ["Strategy", "Process Design", "Change Management", "Technology Integration"],
      date: "2023",
      results: ["40% efficiency improvement", "25% cost reduction", "$3M annual savings"],
      link: "#",
      github: "#"
    },
    {
      title: "Cross-Functional Team Optimization",
      description: "Restructured and optimized cross-functional teams to enhance collaboration and productivity. Implemented new workflows and communication protocols.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      technologies: ["Team Leadership", "Process Optimization", "Communication", "Performance Management"],
      date: "2022",
      results: ["50% faster delivery", "Improved team satisfaction", "Higher quality outputs"],
      link: "#",
      github: "#"
    },
    {
      title: "Customer Experience Enhancement",
      description: "Designed and implemented customer experience improvement program resulting in higher satisfaction scores and increased retention rates.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["Customer Research", "Data Analysis", "UX Design", "Implementation"],
      date: "2022",
      results: ["35% satisfaction increase", "20% retention improvement", "Reduced complaints by 60%"],
      link: "#",
      github: "#"
    },
    {
      title: "Innovation Lab Initiative",
      description: "Established and managed innovation lab to foster creativity and develop new solutions. Led ideation sessions and prototype development.",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
      technologies: ["Innovation Management", "Research", "Prototyping", "Project Coordination"],
      date: "2021",
      results: ["10 new concepts developed", "3 successful implementations", "Patent applications filed"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-muted/20 to-accent/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing impactful initiatives and successful outcomes from my professional journey
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-professional transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Results */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs px-2 py-1 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary-hover text-primary-foreground flex-1"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;