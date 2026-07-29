import { GoogleGenAI } from "@google/genai";

export const analyzeTestimonialAI = async (testimonialText) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log("ℹ️ GEMINI_API_KEY is not configured in .env. Falling back to default analysis.");
    return {
      sentiment: "Positive",
      summary: testimonialText.length > 80 ? testimonialText.slice(0, 80) + "..." : testimonialText,
      keywords: ["user-feedback"],
      category: "General",
      moderationSuggestion: "Approve",
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Analyze the following customer testimonial:
"${testimonialText}"

Return a valid JSON object with:
1. "sentiment": exactly one of ["Positive", "Neutral", "Negative"]
2. "summary": a single concise summary sentence (max 15 words)
3. "keywords": an array of 2-4 relevant lowercase keyword tags extracted from the text
4. "category": exactly one of ["Customer Support", "Product Quality", "Pricing", "Delivery", "General"]
5. "moderationSuggestion": exactly one of ["Approve", "Reject"]

Respond ONLY with valid JSON. Do not wrap in markdown syntax.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const outputText = response.text || "";
    const cleanJson = outputText.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanJson);

    return {
      sentiment: result.sentiment || "Positive",
      summary: result.summary || "",
      keywords: Array.isArray(result.keywords) ? result.keywords : [],
      category: result.category || "General",
      moderationSuggestion: result.moderationSuggestion || "Approve",
    };
  } catch (error) {
    console.error("AI Sentiment Analysis Error:", error.message);
    return {
      sentiment: "Positive",
      summary: testimonialText.length > 80 ? testimonialText.slice(0, 80) + "..." : testimonialText,
      keywords: ["feedback"],
      category: "General",
      moderationSuggestion: "Approve",
    };
  }
};
