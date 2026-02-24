export default class GeminiHandler {
  constructor(answerUseCase) {
    this.answerUseCase = answerUseCase;
  }

  async handle(question) {
    return await this.answerUseCase.execute(question);
  }
}