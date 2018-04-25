
class EventListener {

    static getAppEventListener() {
        if (!EventListener._appEventListener) {
            EventListener._appEventListener = new EventListener();
        }

        return EventListener._appEventListener;
    }

    constructor() {
        this.listeners = {};
    }

    addEventListener(type, listener) {
        let listeners = this.listeners[type] || [];
        listeners.push(listener);
        this.listeners[type] = listeners;

        return this;
    }

    removeEventListener(type, listener) {
        let listeners = this.listeners[type] || [];
        let index = listeners.indexOf(listener);
        if (index >= 0) {
            listeners.splice(index, 1);
        }

        return this;
    }

    dispatchEvent(event) {
        let listeners = this.listeners[event.type];
        if (listeners) {
            listeners.forEach(listener => listener(event));
        }

        return this;
    }

}



export default EventListener;