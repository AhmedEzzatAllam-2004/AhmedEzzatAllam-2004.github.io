import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, Instagram, Send } from "lucide-react";
import React, { useCallback, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ahmedezzatallamshaker@gmail.com",
      link: "mailto:ahmedezzatallamshaker@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+201140674371",
      link: "tel:+201140674371"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "🌍 Giza, 6 October, Egypt",
      link: "#"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/ahmedezzatallam",
      link: "https://www.linkedin.com/in/ahmedezzatallam"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/AhmedEzzatAllam-2004",
      link: "https://github.com/AhmedEzzatAllam-2004"
    },
    {
      icon: Facebook,
      title: "Facebook",
      value: "facebook.com/share/1B2PNh6Uwq/",
      link: "https://www.facebook.com/share/1B2PNh6Uwq/"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@ahmed.ezzat_2004",
      link: "https://www.instagram.com/ahmed.ezzat_2004"
    }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    };

    try {
      setIsSubmitting(true);
      const res = await fetch("https://gwylvznrtdiazdamypdn.supabase.co/functions/v1/send-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // ✅ كده البيانات بتتبعت
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast({
          title: "Message Sent ✅",
          description: "Your message was delivered via WhatsApp successfully.",
        });
        form.reset();
      } else {
        console.error(result);
        toast({
          title: "Error ❌",
          description: "Failed to send the message via WhatsApp.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      toast({
        title: "Error",
        description: "Something went wrong while sending the message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

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
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Send a Message</h3>
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                        <Input name="firstName" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                        <Input name="lastName" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <Input type="email" name="email" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                      <Input name="subject" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                      <Textarea name="message" rows={6} required />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-3 font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
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

