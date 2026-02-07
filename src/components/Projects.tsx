import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Restaurant Management System",
      description: "A comprehensive management system built with C# and SQL. Designed to handle restaurant operations including order processing, menu management, and staff authentication with a robust database backend.",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop", 
      technologies: ["C#", "SQL Server", "Database Design", "HTML"],
      date: "2025", 
      results: [
        "Designed normalized Database Schema & ERD", 
        "Implemented Secure Login & Authentication", 
        "Developed C# Backend for order logic"      
      ],
      link: "https://github.com/AhmedEzzatAllam-2004/RestaurantSystem/blob/master/README.md", 
      github: "https://github.com/AhmedEzzatAllam-2004/RestaurantSystem"
    },
    {
      title: "Recruiting Data Analysis Dashboard",
      description: "A comprehensive HR analytics dashboard designed to track hiring KPIs, visualize candidate pipelines, and improve recruitment efficiency using advanced Excel and Power BI techniques.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", 
      technologies: ["Excel", "Power BI", "Data Analysis", "Pivot Tables"],
      date: "2024",
      results: [
        "Visualized hiring KPIs & candidate pipelines",
        "Reduced time-to-hire through data insights",
        "Created interactive dashboards for HR decision making"
      ],
      link: "https://github.com/AhmedEzzatAllam-2004/Recruiting-Dashboard/blob/main/README.md", 
      github: "https://github.com/AhmedEzzatAllam-2004/Recruiting-Dashboard"
    },
    {
      title: "Enterprise Data Governance Framework",
      description: "A strategic security framework establishing data protection policies, role-based access controls (RBAC), and compliance standards (GDPR/CCPA) to ensure organizational data integrity.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", // صورة قفل/أمان
      technologies: ["Data Security", "Compliance", "Risk Management", "Documentation"],
      date: "2024",
      results: [
        "Defined comprehensive data security policies",
        "Implemented Role-Based Access Control (RBAC) models",
        "Ensured compliance with data protection regulations"
      ],
      link: "https://github.com/AhmedEzzatAllam-2004/Egyptian-Real-Estate-Data-Governance/blob/main/README.md",
      github: "https://github.com/AhmedEzzatAllam-2004/Egyptian-Real-Estate-Data-Governance"
    },
    {
      title: "eBay Advanced Market Analyzer",
      description: "A full-stack market intelligence tool using Streamlit and Selenium. Features live browser automation to scrape 'Frequently Bought Together' data, combined with eBay API for real-time pricing analysis and 3D visualizations.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", 
      technologies: ["Streamlit", "Selenium", "Python", "Plotly", "eBay API"],
      date: "2025",
      results: [
        "Developed a hybrid data pipeline using eBay API & Selenium",
        "Built an interactive Dashboard with live browser automation",
        "Implemented 3D visualizations & Network Graphs for market analysis"
      ],
      link: "https://github.com/AhmedEzzatAllam-2004/eBay-Advanced-Market-Analyzer",
      github: "https://github.com/AhmedEzzatAllam-2004/eBay-Advanced-Market-Analyzer"
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
                    {/* View Details Button */}
                    <Button
                      asChild 
                      size="sm"
                      className="bg-primary hover:bg-primary-hover text-primary-foreground flex-1 cursor-pointer"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </a>
                    </Button>

                    {/* GitHub Button */}
                    <Button
                      asChild 
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
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