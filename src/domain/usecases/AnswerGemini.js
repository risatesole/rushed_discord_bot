import GeminiClient from "../../infrastructure/gemini/GeminiClient.js";

export default class AnswerGemini {
  constructor() {
    this.client = new GeminiClient();
  }

  async execute(question) {
    const ai = this.client.start();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      responseMode: "blocking",
    });
    return response.text;
  }
}