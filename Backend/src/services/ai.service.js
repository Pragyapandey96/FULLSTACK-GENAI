const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an expert Senior Technical Interviewer, Hiring Manager, and Career Coach.

Your task is to analyze the candidate's resume, self description, and the job description, then generate a complete interview preparation report.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

INSTRUCTIONS:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT wrap the response inside an array.
4. Do NOT include explanations before or after the JSON.
5. Every field must contain meaningful data.
6. Never return null.
7. Never return empty strings ("").
8. Every array element must be a complete object.
9. Match the following JSON structure exactly.

{
  "title": "string",
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low | medium | high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": "string",
      "tasks": [
        "string",
        "string",
        "string"
      ]
    }
  ]
}

Generate:
- Exactly 5 technical questions.
- Exactly 3 behavioral questions.
- At least 3 skill gaps.
- Exactly 5 preparation days.

For every technical question:
- question must be meaningful.
- intention must explain why it is asked.
- answer must NEVER be empty.
- answer must contain at least 120 words.
- answer should include examples and best practices.

For every behavioral question:
- answer must NEVER be empty.
- answer must follow the STAR method.
- answer must contain at least 120 words.

For every preparation day:
- include at least 3 practical tasks.

Return ONLY one valid JSON object.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });

    console.log("========== RAW RESPONSE ==========");
    console.log(response.text);

    const raw = JSON.parse(response.text);

    console.log("========== PARSED ==========");
    console.log(JSON.stringify(raw, null, 2));

    const result = interviewReportSchema.parse(raw);

    return result;
}



async function generatePdfFromHtml(htmlContent) {
    console.log("========== PDF Generation Started ==========");
    console.log("Chrome Path:", "C:/Program Files/Google/Chrome/Application/chrome.exe");

    try {
        const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
    args: [
        "--no-sandbox",
        "--disable-setuid-sandbox"
    ]
});

        console.log("✅ Chrome launched successfully");

        const page = await browser.newPage();

        await page.setContent(htmlContent, {
    waitUntil: "domcontentloaded"
});

        console.log("✅ HTML loaded");

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        console.log("✅ PDF generated");

        await browser.close();

        console.log("✅ Browser closed");

        return pdfBuffer;
    } catch (err) {
        console.error("❌ PDF Generation Error:");
        console.error(err);
        throw err;
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

  const prompt = `
You are an expert ATS Resume Writer, HR Recruiter, and Senior Software Engineer.

Your task is to generate a professional ATS-friendly resume.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Instructions:

- Tailor the resume according to the job description.
- Highlight only relevant skills and projects.
- Improve the wording professionally.
- Do NOT invent fake experience.
- Keep the resume to one page.
- Make it ATS friendly.
- Use modern professional styling.
- The resume should look like it was written by a human.
- Use black text with blue section headings.
- Include:
  - Name
  - Contact Information
  - Professional Summary
  - Skills
  - Education
  - Projects
  - Experience (if available)
  - Achievements
- Return ONLY valid JSON.
- The JSON must contain ONLY one field:

{
  "html": "<!DOCTYPE html> ... complete HTML document ..."
}

The HTML must:
- Be a complete HTML document.
- Include CSS inside <style>.
- Be printable on A4 paper.
- Be ready for Puppeteer PDF generation.
- Do NOT wrap the JSON in markdown.
- Do NOT return explanations.
`;

   const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json"
    }
});

   const raw = JSON.parse(response.text);

   const jsonContent = resumePdfSchema.parse(raw);

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }