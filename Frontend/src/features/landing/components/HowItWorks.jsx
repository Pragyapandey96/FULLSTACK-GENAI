import {
  Upload,
  Briefcase,
  Brain,
  Download,
} from "lucide-react";

const steps = [
  {
    icon: <Upload size={40} />,
    title: "Upload Resume",
    description:
      "Upload your existing resume in PDF format for AI analysis.",
  },
  {
    icon: <Briefcase size={40} />,
    title: "Paste Job Description",
    description:
      "Add the job description of the company you're applying for.",
  },
  {
    icon: <Brain size={40} />,
    title: "AI Analysis",
    description:
      "Gemini AI analyzes your resume, finds skill gaps, generates interview questions, and creates a preparation plan.",
  },
  {
    icon: <Download size={40} />,
    title: "Download Report",
    description:
      "Download your ATS-friendly resume and complete interview preparation report.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2>How It Works</h2>

        <p className="subtitle">
          Prepare for interviews in just four simple steps.
        </p>

        <div className="steps">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-number">{index + 1}</div>

              <div className="icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;