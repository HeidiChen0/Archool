import { GoogleGenAI } from "@google/genai";

/**
 * Uses Gemini AI to analyze a review draft and provide feedback based on
 * "Describe-Evaluate-Suggest" guidelines.
 */
export const analyzeReviewDraft = async (draftText: string, targetType: string): Promise<string> => {
  // Always use direct process.env.API_KEY and initialize inside the function
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are an expert editor for "Archool", a school review platform.
      A student has written a draft review for a ${targetType}.
      
      Review Guidelines: "Describe-Evaluate-Suggest".
      1. Describe the experience concretely.
      2. Evaluate the quality (fairness, difficulty, support).
      3. Suggest improvements or advice for future students.

      Draft: "${draftText}"

      Task: Provide a short, actionable critique of this draft. 
      If it is good, say "Great draft!". 
      If it's too vague, suggest what specific details to add. 
      Keep the response under 50 words.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};

/**
 * Summarizes multiple reviews into a concise bullet-point summary for a specific entity.
 */
export const generateTrendSummary = async (reviews: string[], entityName: string): Promise<string> => {
    // Always use direct process.env.API_KEY and initialize inside the function
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    try {
        const model = 'gemini-3-flash-preview';
        const prompt = `
            Summarize the following reviews for ${entityName} into a 3-bullet point executive summary highlighting key strengths and weaknesses.
            
            Reviews:
            ${JSON.stringify(reviews)}
        `;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        
        return response.text || "No summary available.";
    } catch (e) {
        console.error(e);
        return "Failed to generate summary.";
    }
}