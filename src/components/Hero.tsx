import { Button } from "@/components/ui/button";
import { Mail, Download, Linkedin, Github } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          <div className="relative mb-8 inline-block">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-professional border-4 border-primary/10">
              <img
                src={profilePhoto}
                alt="Professional Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background"></div>
          </div>

          {/* Hero Content */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Your Name Here
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            Professional Title | Industry Expert
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Passionate professional with expertise in delivering innovative solutions 
            and driving business growth through strategic thinking and technical excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-professional hover:shadow-lg hover:scale-105">
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-3 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-12">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;