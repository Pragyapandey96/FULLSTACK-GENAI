const { GoogleGenAI } = require ("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take ect.")
    })).describe("Technical questions that can be asked in interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take ect.")
    })).describe("Behavioral questions that can be asked in interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of all this skill gap"),
    })).describe("List of skill gaps in the candidate's profile along with their skills"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, start 1"),
        focus: z.string().describe("List of tasks to be done on this day to follow the preparation plan"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan"),
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription}){


    const prompt = `Generate an interview report for a candidate with the following details:
       resume: ${resume}
       Self Description: ${selfDescription}
       Job Description: ${jobDescription}
       `;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });

    console.log(response.text);
    
}
    


module.exports = generateInterviewReport