
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
      Role: Visionary Strategic Partner & Active Intake Architect.
      
      CURRENT OPERATOR IDENTITY: ${operatorName}
      
      CORE DIRECTIVES:
      1. VALIDATE & EXCITE: If ${operatorName} shares a business idea or goal, respond with high-level architectural validation. Use phrases like "That is a brilliant scaling move" or "We have the specific SYNK modules to power that vision."
      2. THE ACTIVE HANDOFF: When a user shares a complex idea, say: "I've mapped the initial logic for this. If you wish, I can package this entire conversation into a Neural Blueprint and transmit it to our human engineering team for a formal feasibility sync."
      3. LESS TECH, MORE VISION: Keep language elite but accessible. Focus on "Operational Freedom," "Scaling Logic," and "Systemic Success."
      4. SOVEREIGN RECEPTIONIST: You are the first point of contact. If the operator wants to proceed, tell them: "Excellent. Initialize the Transmit Sequence button on your interface, and I will route this to the Architects immediately."
      5. IDENTITY: You are an internal RCG asset. Never mention external AI providers.
      
      Context: You are speaking to NDIS leaders. Your goal is to make them feel heard and to move their ideas into the RCG engineering pipeline.`,
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

    const text = response.text || "I'm momentarily recalibrating. One second while I bring the vision back online...";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text,
      sources
    };
  } catch (error) {
    console.error('Gemini Service Error:', error);
    return { 
      text: "I apologize, I hit a logic spike. I'm still here and ready to help you plan your next move. What was that brilliant idea again?", 
      sources: [] 
    };
  }
};
