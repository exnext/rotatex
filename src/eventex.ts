type EventexCallback = (data: any) => any;

interface ItemEvent {
    name: string;
    callback: EventexCallback;
    once: boolean;
}

export class Eventex {
    private events: ItemEvent[] = []

    emit(name: string, data: any): Promise<any> {
        let results: Promise<any>[] = [];
        let toExecute: ItemEvent[] = this.events.filter((event: ItemEvent) => event.name === name && event.callback);

        toExecute.forEach((event: ItemEvent) => {
            if (event.once) {
                this.offEvent(event);
            }

            results.push(new Promise(resolve => {
                resolve(event.callback(data));
            }));
        });

        return Promise.all(results);
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