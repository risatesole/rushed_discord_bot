export default class HeyHandler {
  constructor(sayHeyUseCase) {
    this.sayHeyUseCase = sayHeyUseCase;
  }

  handle() {
    return this.sayHeyUseCase.execute();
  }
}
