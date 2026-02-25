type MessageHandler<T = any> = (message: T) => void;

export default class MessageBroker {
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
      handlers.filter(h => h !== handler)
    );
  }
}


