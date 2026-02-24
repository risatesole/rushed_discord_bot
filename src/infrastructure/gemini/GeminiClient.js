import { GoogleGenAI } from "@google/genai";

export default class GeminiClient {
  constructor() {
    this.ai = new GoogleGenAI({});
  }

  start() {
    return this.ai;
  }
}
