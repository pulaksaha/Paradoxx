import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export interface Recommendation {
  title: string;
  detail: string;
  severity: "critical" | "high" | "medium";
  category: "beds" | "ot" | "ambulance" | "blood";
  impact: string;
}

const SYSTEM_PROMPT = `You are MedDispatch's AI orchestration agent for an Indian public hospital.
You analyze a real-time snapshot of beds, operation theatres, ambulances, and blood inventory.
Identify the 4 highest-impact, time-sensitive actions a resource coordinator should take in the next 30 minutes.
Be concrete, prescriptive, and concise. Each action should reference specific units / wards / vehicles.`;

export async function getGeminiRecommendations(
  snapshot: object
): Promise<Recommendation[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY is not set. Add it to your .env file."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          recommendations: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                title: {
                  type: SchemaType.STRING,
                  description: "Short action title (max 8 words)",
                },
                detail: {
                  type: SchemaType.STRING,
                  description:
                    "1-2 sentence explanation with specific resource references",
                },
                severity: {
                  type: SchemaType.STRING,
                  enum: ["critical", "high", "medium"],
                },
                category: {
                  type: SchemaType.STRING,
                  enum: ["beds", "ot", "ambulance", "blood"],
                },
                impact: {
                  type: SchemaType.STRING,
                  description:
                    "Quantified impact, e.g. 'Frees 3 ICU beds in 45 min'",
                },
              },
              required: ["title", "detail", "severity", "category", "impact"],
            },
          },
        },
        required: ["recommendations"],
      },
    },
  });

  const userPrompt = `Hospital snapshot (JSON):\n${JSON.stringify(snapshot, null, 2)}\n\nReturn 4 prioritized coordinator actions.`;

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();
  const parsed = JSON.parse(text);
  return parsed.recommendations ?? [];
}
