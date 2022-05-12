type EventexCallback = any;

interface ItemEvent {
    name: string;
    callback: EventexCallback;
    once: boolean;
}

export class Eventex<T = {}> {
    private events: ItemEvent[] = []

    emit(name: string, data: T) {
        return new Promise(async (resolve, reject) => {
            try {
                let results: any = [];
                let toExecute: ItemEvent[] = this.events.filter((event: ItemEvent) => event.name === name);

                for (let event of toExecute) {
                    if (event.once) {
                        this.offEvent(event);
                    }

                    if (event.callback) {
                        let result = event.callback(data);

                        if (result instanceof Promise) {
                            result = await result;
                        }

                        results.push(result);
                    }
                }

                resolve(results);
            } catch (error) {
                reject(error);
            }
        });
    }

    once(name: string, callback: EventexCallback) {
        this.events.push({ name, callback, once: true });
    }

    on(name: string, callback: EventexCallback) {
        this.events.push({ name, callback, once: false });
    }

    off(name: string, callback: EventexCallback) {
        let toDelete = this.events.filter((event: ItemEvent) => event.name === name);

        if (callback) {
            toDelete = toDelete.filter((event: ItemEvent) => event.callback === callback);
        }

        toDelete.forEach((event: ItemEvent) => {
            this.offEvent(event);
        });
    }

    some(name: string): boolean {
        return this.events.some((event: ItemEvent) => event.name === name);
    }

    private offEvent(event: ItemEvent) {
        let index: number = this.events.indexOf(event);
        this.events.splice(index, 1);
    }
}