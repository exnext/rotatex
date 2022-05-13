import './rotatex.scss';
import { Eventex } from './eventex';

export interface RotatexOptions {
    scrollBy: number;
    scrollLimit?: number;
}

export interface RotateChild {
    element: HTMLElement,
    angle?: number;
}

export interface RotateDataEvent {
    offsetByScroll: number;
    children: RotateChild[]
}

export class Rotatex extends Eventex {
    private static readonly ObserverOptions: MutationObserverInit = { attributes: false, childList: true, subtree: false };
    private offsetByScroll: number = 0;

    private observer: MutationObserver = new MutationObserver(() => {
        this.build();
    });

    private build() {
        this.element.classList.add('rotatex');
        let children: NodeListOf<HTMLElement> = this.element.querySelectorAll(':scope > *:not(.r-off)');
        let angle: number = 360 / children.length;

        children.forEach((child: HTMLElement, idx: number) => {
            let deg = Math.round(angle * idx);
            child.style.setProperty('--angle', deg + 'deg');
        });
    }

    constructor(private element: HTMLElement, private options?: RotatexOptions) {
        super();

        if (options?.scrollBy) {
            element.addEventListener('wheel', (event: WheelEvent) => {
                this.rotate(event.deltaY);
            });
        }

        this.observer.observe(element, Rotatex.ObserverOptions);
        this.build();
    }

    private rotate(delta: number) {
        if (delta > 0) {
            this.offsetByScroll += this.options?.scrollBy || 0;
            this.offsetByScroll = Math.min(this.offsetByScroll, this.options?.scrollLimit || 36000);
        } else if (delta < 0) {
            this.offsetByScroll -= this.options?.scrollBy || 0;
            this.offsetByScroll = Math.max(this.offsetByScroll, -1 * (this.options?.scrollLimit || 36000));
        }

        this.element.style.setProperty('--offset-by-scroll', this.offsetByScroll + 'deg');

        if (delta) {
            this.dispatchEvent();
        }
    }

    private dispatchEvent() {
        if (this.some('rotate')) {
            let data: RotateDataEvent = {
                offsetByScroll: this.offsetByScroll,
                children: []
            };

            let children: NodeListOf<HTMLElement> = this.element.querySelectorAll(':scope > *:not(.r-off)');

            children.forEach((element: HTMLElement, idx: number) => {
                let compStyles = window.getComputedStyle(element);

                let angle: number | undefined = compStyles
                    .getPropertyValue('--calculated')
                    .match(/[-]{0,1}[\d+-]*[.]{0,1}[\d]+/g)
                    ?.reduce((acc: number, curr: string) => {
                        if (!isNaN(parseInt(curr))) {
                            acc += parseInt(curr);
                        }
                        
                        return acc;
                    }, 0);

                data.children.push({ element, angle });
            });

            this.emit('rotate', data);
        }
    }
}