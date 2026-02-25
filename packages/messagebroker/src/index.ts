type MessageHandler<T = any> = (message: T) => void;

export interface MessageBrokerInterface {
  subscribe<T = any>(topic: string, handler: MessageHandler<T>): void;

  publish<T = any>(topic: string, message: T): void;

  unsubscribe<T = any>(topic: string, handler: MessageHandler<T>): void;
}

export default class MessageBroker implements MessageBrokerInterface {
  private topics: Map<string, MessageHandler[]> = new Map();

  subscribe(topic: string, handler: MessageHandler) {
    if (!this.topics.has(topic)) {
      this.topics.set(topic, []);
    }

    this.topics.get(topic)!.push(handler);
  }

  publish(topic: string, message: any) {
    const handlers = this.topics.get(topic);

    if (!handlers) return;

    for (const handler of handlers) {
      handler(message);
    }
  }

  unsubscribe(topic: string, handler: MessageHandler) {
    const handlers = this.topics.get(topic);

    if (!handlers) return;

    this.topics.set(
      topic,
      handlers.filter((h) => h !== handler),
    );
  }
}
