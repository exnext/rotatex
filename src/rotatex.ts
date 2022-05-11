import './rotatex.scss';

interface RotatexOptions {
    name: string
}

export class Rotatex {
    private static readonly ObserverOptions: MutationObserverInit = { attributes: false, childList: true, subtree: false };
    
    private observer: MutationObserver = new MutationObserver(() => {
        this.build();
    });

    private build() {
        this.element.classList.add('rotatex');
        let agle: number = 360 / this.element.children.length;

        for (let idx: number = 0; idx < this.element.children.length; idx++) {
            let deg = Math.round(agle * idx);
            let child: HTMLElement = this.element.children[idx] as HTMLElement;
            child.style.setProperty('--start-angle', deg + "deg");
        }
    }

    constructor(private element: HTMLElement, private options?: RotatexOptions) {
        this.observer.observe(element, Rotatex.ObserverOptions);
        this.build();
    }
}