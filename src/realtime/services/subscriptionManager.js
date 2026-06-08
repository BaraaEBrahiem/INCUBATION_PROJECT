class SubscriptionManager {
  constructor() {
    this.subscriptions = new Set();
  }

  add(conversationId) {
    this.subscriptions.add(
      Number(conversationId)
    );
  }

  remove(conversationId) {
    this.subscriptions.delete(
      Number(conversationId)
    );
  }

  has(conversationId) {
    return this.subscriptions.has(
      Number(conversationId)
    );
  }

  getAll() {
    return [
      ...this.subscriptions,
    ];
  }

  clear() {
    this.subscriptions.clear();
  }
}

export const subscriptionManager =
  new SubscriptionManager();