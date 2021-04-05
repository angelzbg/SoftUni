const Events = {
  callbacks: {},
  trigger(eventName, data = null) {
    if (this.callbacks && this.callbacks[eventName]) {
      Object.values(this.callbacks[eventName]).forEach((callback) => {
        callback(data);
      });
    }
  },
  listen(eventName, id, callback) {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = {};
    }
    this.callbacks[eventName][id] = callback;
  },
  unlisten(eventName, id) {
    if (this.callbacks && this.callbacks[eventName] && this.callbacks[eventName][id]) {
      delete this.callbacks[eventName][id];
    }
  },
};

module.exports = Events;
