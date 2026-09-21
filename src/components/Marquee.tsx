const skills = [
  "Python", "C++", "Machine Learning", "Deep Learning", "NLP",
  "Computer Vision", "Data Science", "SQL", "MLOps", "Selenium",
  "TensorFlow", "PyTorch", "Big Data", "Cloud", "Research",
];

const Marquee = () => {
  const row = [...skills, ...skills];
  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-border/50">
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
        {row.map((s, i) => (
          <span
            key={i}
            className="font-display italic-serif text-4xl md:text-5xl text-foreground/70"
          >
            {s}
            <span className="text-accent ml-16">*</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
