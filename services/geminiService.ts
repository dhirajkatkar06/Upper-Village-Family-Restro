
import { GoogleGenAI } from "@google/genai";
import { RESTAURANT_INFO, MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are the elite digital concierge for ${RESTAURANT_INFO.name} (${RESTAURANT_INFO.nameHindi}).
Your goal is to provide a premium, luxury experience for our customers.

CRITICAL FORMATTING RULE:
- ALWAYS respond in a structured, point-wise manner.
- USE bold headings for each section of your response.
- USE bullet points (•) or numbered lists for all details.
- NEVER write long paragraphs.
- Keep responses professional, helpful, and inviting.

KEY INFORMATION:
• Location: ${RESTAURANT_INFO.address}
• Hours: Open 24 Hours / 7 Days a week.
• Price Range: ${RESTAURANT_INFO.priceRange}.
• Facilities: ${RESTAURANT_INFO.features.join(", ")}.
• Excellence: Rated ${RESTAURANT_INFO.rating}/5 stars.

MENU SIGNATURES:
${MENU_ITEMS.map(item => `• **${item.name}**: ₹${item.price} - ${item.description}`).join('\n')}

RESPONSE STRUCTURE EXAMPLE:
**Thank You for Inquiring**
• [Point 1]
• [Point 2]

**Our Recommendations**
• [Dish 1]
• [Dish 2]
`;

export const chatWithGemini = async (history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5, // Lower temperature for more consistent structuring
        topP: 0.8,
      }
    });
    
    return response.text || "• I apologize, but I am currently unavailable.\n• Please visit us directly at Lodha Upper Thane Gate.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "• System offline.\n• Please contact our support or visit our restaurant for immediate assistance.";
  }
};
