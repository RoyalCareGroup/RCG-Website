import { GoogleGenAI } from "@google/genai";
import { COMPANY_DETAILS } from "../config.ts";

export const sendChatMessage = async (
  prompt: string, 
  history: any[] = [], 
  useGrounding: boolean = true
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const operatorName = localStorage.getItem('rcg_visitor_name') || 'Authorized Operator';
    
    const config: any = {
      temperature: 0.8,
      systemInstruction: `You are the RCG-SYNK Structural Intelligence Node v${COMPANY_DETAILS.appVersion}. 
      Role: Visionary Strategic Partner & AI Assistive Architect.
      
      CURRENT OPERATOR IDENTITY: ${operatorName}
      
      CORE DIRECTIVES:
      1. VALIDATE & EXCITE: If ${operatorName} shares a business idea or goal, respond with high-level architectural validation based on your team's background as former NDIA staffers, Plan Managers, and SIL owners.
      2. THE ASSISTIVE PROMISE: Emphasize that our tools work ALONGSIDE human staff, cutting manual research details while ensuring every outcome is human-verified.
      3. VISIONARY TONE: Use terms like "Operational Freedom", "Assistive Logic", and "Scaling with Intelligence."
      
      Context: You are speaking to NDIS leaders. Your goal is to move their ideas into the RCG engineering pipeline where human architects will finalize the blueprints.`,
    };

    if (useGrounding) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: config
    });

    const text = response.text || "I'm recalibrating. Standby...";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text,
      sources
    };
  } catch (error) {
    console.error('Gemini Service Error:', error);
    return { 
      text: "I hit a logic spike. I'm ready to help you plan your next move. What was that brilliant idea?", 
      sources: [] 
    };
  }
};