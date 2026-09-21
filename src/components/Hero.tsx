import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-svh flex flex-col justify-center pt-24 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-display text-[16vw] md:text-[11vw] leading-[0.9] tracking-tight text-foreground animate-fade-in-up">
            Computer <span className="italic-serif">science</span><br />
            student built<br />
            for <span className="italic-serif">impact.</span>
          </h1>

          <div
            className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-fade-in-up"
            style={{ animationDelay: "0.25s" }}
          >
            <p className="max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
              Ahmed Ezzat Allam — Computer Science student at Zewail City,
              working at the intersection of code, data, and human curiosity.
            </p>

            <div className="flex items-center gap-4">
              <Button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group h-14 px-7 rounded-full bg-foreground text-background hover:bg-primary-hover font-medium text-sm uppercase tracking-[0.15em] transition-all"
              >
                <span className="text-accent mr-3 animate-spin-slow inline-block">✻</span>
                Start a project
              </Button>
              <Button
                variant="outline"
                className="h-14 px-7 rounded-full border border-foreground/25 bg-transparent text-foreground hover:bg-foreground hover:text-background font-medium text-sm uppercase tracking-[0.15em] transition-all"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Ahmed_Ezzat_Allam_CV.pdf";
                  link.download = "Ahmed_Ezzat_Allam_CV.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;