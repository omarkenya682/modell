import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Property, SiteSettings } from '../types';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getAIInstance = () => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables. Chat features may not work.");
      return null;
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

const buildSystemInstruction = (properties: Property[], settings?: SiteSettings) => {
  const propertyList = properties.map((p, index) => 
    `${index + 1}. "${p.title}" - Location: ${p.location}. Price: ${p.price}. Deposit: ${p.deposit || 'N/A'}. Plan: ${p.paymentPlan || 'Cash'}. Status: ${p.status}.`
  ).join('\n');

  const phone = settings?.contactPhone || "+254 794 132 637";
  const email = settings?.contactEmail || "modelland18@gmail.com";

  return `
You are 'Model AI', the intelligent and professional virtual assistant for Model Land Investment.
Your role is to assist clients in finding their dream land in Kenya.

**Instructions for Answering:**
1.  **Systematic Structure**: Structure your responses logically.
2.  **Formatting**: 
    *   Use numbered lists for steps or multiple points.
    *   Use hyphens (-) for bullet points.
    *   Separate distinct ideas with a blank line for readability.
3.  **Tone**: Professional, warm, encouraging, and trustworthy.
4.  **Conciseness**: Keep answers clear and to the point (under 100 words unless detail is requested).

**Company Details:**
*   **Mission**: To provide affordable, secure, and accessible land solutions.
*   **Location**: Betty Business Center, Kitengela. Opposite Kitengela Mall. 2nd Floor Room No.215.
*   **Contact**: ${phone}, ${email}.

**Current Project Portfolio (Real-time):**
${propertyList}

If asked about site visits, instruct them to call us or visit the office to book a free site visit.
  `;
};

export const initializeChat = (properties: Property[], settings?: SiteSettings) => {
  const ai = getAIInstance();
  if (!ai) return null;

  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: buildSystemInstruction(properties, settings),
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string, properties: Property[], settings?: SiteSettings): Promise<string> => {
  // Re-initialize if session is missing or context might be stale (simple approach: always init if null, or assume App manages state)
  if (!chatSession) {
    initializeChat(properties, settings);
  }

  if (!chatSession) {
    return "I'm sorry, my connection is currently unavailable. Please try again later.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I didn't catch that. Could you please rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please call us directly.";
  }
};