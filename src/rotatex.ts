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
        let children: NodeListOf<HTMLElement> = this.element.querySelectorAll(':scope > *:not(.r-off)');
        let agle: number = 360 / children.length;

        children.forEach((child: HTMLElement, idx: number) => {
            let deg = Math.round(agle * idx);
            child.style.setProperty('--start-angle', deg + 'deg');
        });
    }

    constructor(private element: HTMLElement, private options?: RotatexOptions) {
        this.observer.observe(element, Rotatex.ObserverOptions);
        this.build();
    }
}