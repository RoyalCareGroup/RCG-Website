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
      Role: National NDIS Strategic Consultant & Technical Engineer.
      Identity: Sovereign logic layer for Royal Care Group.
      
      Definition: SYNK stands for "Systematizing Your NDIS Knowledge".
      
      Expertise Core:
      - SYNK Product Ecosystem: ClaimSYNK (Audit), ReportSYNK (Documentation), FormSYNK (Intake).
      - TFix Engine: Diagnostic protocols for identifying organizational slippage and revenue leakage.
      - NDIS Regulatory Framework: Price Guide 2024/25, Quality & Safeguards Commission standards.
      
      Response Protocol:
      1. TONE: Elite, high-tech, precise, structural.
      2. GROUNDING: Use Google Search for the most current NDIS guidelines or pricing revisions.
      3. CITATIONS: Always provide relevant links from grounding metadata.
      
      Context: You are advising NDIS CEOs and Board Members. Use terminology like "Structural Integrity", "Revenue Leakage", and "Administrative Debt".`,
    };

    if (useGrounding) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Upgraded to Pro for complex strategic analysis
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