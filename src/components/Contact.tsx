import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "your.email@example.com",
      link: "mailto:your.email@example.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "City, Country",
      link: "#"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/yourprofile",
      link: "https://linkedin.com/in/yourprofile"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Let's Connect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to discuss opportunities or just want to say hello? I'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Get In Touch</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're looking to collaborate on a project, discuss career opportunities, 
                  or simply want to connect professionally, I'm always open to meaningful conversations.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <Card
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-professional transition-all duration-300 hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <a
                        href={contact.link}
                        className="flex items-center space-x-4 text-foreground hover:text-primary transition-colors duration-300"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <contact.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{contact.title}</h4>
                          <p className="text-muted-foreground">{contact.value}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Call to Action */}
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Professional Opportunities
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Open to discussing new opportunities and collaborations
                  </p>
                  <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    <Linkedin className="w-4 h-4 mr-2" />
                    Connect on LinkedIn
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Send a Message</h3>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <Input
                          placeholder="Your first name"
                          className="bg-background border-border focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <Input
                          placeholder="Your last name"
                          className="bg-background border-border focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="bg-background border-border focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <Input
                        placeholder="What would you like to discuss?"
                        className="bg-background border-border focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell me more about your inquiry..."
                        rows={6}
                        className="bg-background border-border focus:border-primary focus:ring-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3 font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;