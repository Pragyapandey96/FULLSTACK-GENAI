import {
  FileSearch,
  BrainCircuit,
  FileText,
  Target,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <FileSearch size={40} />,
    title: "Resume Analysis",
    description:
      "Upload your resume and get an AI-powered analysis of your strengths and weaknesses.",
  },
  {
    icon: <BrainCircuit size={40} />,
    title: "Interview Questions",
    description:
      "Generate technical and HR interview questions based on your resume and job description.",
  },
  {
    icon: <Target size={40} />,
    title: "Skill Gap Analysis",
    description:
      "Discover missing skills and improve your chances of getting shortlisted.",
  },
  {
    icon: <CalendarCheck size={40} />,
    title: "Preparation Plan",
    description:
      "Receive a personalized preparation roadmap to crack your interviews.",
  },
  {
    icon: <FileText size={40} />,
    title: "ATS Resume Builder",
    description:
      "Generate a clean, ATS-friendly resume tailored to your target role.",
  },
  {
    icon: <Sparkles size={40} />,
    title: "Powered by Gemini AI",
    description:
      "Leverage Google's Gemini AI for accurate analysis and personalized recommendations.",
  },
];

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Everything You Need to Prepare</h2>

        <p className="subtitle">
          HireReady AI helps you prepare smarter with AI-powered resume analysis,
          interview questions, ATS resume generation, and personalized learning
          plans.
        </p>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;