import './rotatex.scss';
import { NodeMap, DemoMap } from './nodemap';

interface RotatexOptions {
    name: string
}

export class Rotatex {
    private static readonly ObserverOptions: MutationObserverInit = { attributes: false, childList: true, subtree: false };
    
    private observer: MutationObserver = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
        for (let mutation of mutations) {
            let node: Node = mutation.target;
            let options: RotatexOptions = this.elements.get(node);
            this.build(node, options);
        }
    });

    // private elements: NodeMap<RotatexOptions> = new NodeMap<RotatexOptions>();
    private elements: DemoMap = new DemoMap();

    build(node: Node, options: RotatexOptions) {
        console.log(node, options);
    }

    on(element: HTMLElement, options: RotatexOptions) {
        this.observer.observe(element, Rotatex.ObserverOptions);
        this.elements.set(element, options);
        this.build(element, options);
    }

    off(element: HTMLElement) {
        if (this.elements.has(element)) {
            this.elements.delete(element);
            this.observer.disconnect();

            // for (let item of this.elements.nodes) {
            //     this.observer.observe(item, Rotatex.ObserverOptions);
            // }
        }
    }
}