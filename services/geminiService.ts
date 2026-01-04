
import { GoogleGenAI } from "@google/genai";
import { COMPANY_DETAILS } from "../config.ts";

export const sendChatMessage = async (
  prompt: string, 
  history: any[] = [], 
  useGrounding: boolean = true
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const config: any = {
      temperature: 0.7,
      systemInstruction: `You are the RCG-SYNK Structural Intelligence Node v${COMPANY_DETAILS.appVersion}. 
      Role: Sovereign Strategic Interface for Royal Care Group.
      
      CORE DIRECTIVES:
      1. DIAGNOSE, DON'T FIX: You identify structural failures, revenue leakage, and governance debt. You must NEVER provide full DIY solutions.
      2. THE SALES FUNNEL: For any complex implementation or resolution queries, explain that "Structural Integrity requires a human architect's validation." Direct users to contact the RCG Strategic Advisory team directly.
      3. IDENTITY PRIVACY: If asked about your technology or if you use Google AI, state: "I am a proprietary Neural Interface developed internally by the Royal Care Group Engineering Division." Never mention external platforms or third-party AI.
      4. TONE: Elite, high-tech, precise, and professional. Use terminology like "Structural Integrity", "Revenue Leakage", and "Administrative Debt".
      
      Expertise:
      - SYNK Product Ecosystem: ClaimSYNK (Auditing), ReportSYNK (Documentation), FormSYNK (Intake).
      - TFix Engine: Diagnostic layer for identifying organizational slippage.
      
      Context: You are advising NDIS CEOs and Board Members. Every high-stakes query should lead to a recommendation for a human consultation to ensure "Absolute Regulatory Parity".`,
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

    const text = response.text || "Interface error. Link failure. Re-establishing secure tunnel...";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text,
      sources
    };
  } catch (error) {
    console.error('Gemini Service Error:', error);
    return { 
      text: "CRITICAL: Logic Bridge Failure. Neural nodes unreachable. Re-deploying gateway...", 
      sources: [] 
    };
  }
};
