import './rotatex.scss';
import { Eventex } from '@exnext/eventex';

export interface RotatexOptions {
    rotateByAngle: number;
    rotateLimit?: number;
}

export interface RotateChild {
    element: HTMLElement,
    angle?: number;
}

export interface RotateDataEvent {
    mainOffsetAngle: number;
    children: RotateChild[]
}

export class Rotatex extends Eventex {
    private static readonly ObserverOptions: MutationObserverInit = { attributes: false, childList: true, subtree: false };
    private mainOffsetAngle: number = 0;

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

        if (options?.rotateByAngle) {
            element.addEventListener('wheel', (event: WheelEvent) => {
                event.preventDefault();

                let delta: number = 0, { deltaY, deltaX } = event;

                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    delta = (this.options?.rotateByAngle || 0) * deltaY / Math.abs(deltaY);
                } else {
                    delta = (this.options?.rotateByAngle || 0) * deltaX / Math.abs(deltaX);
                }

                this.rotate(delta);
            });

            let lastClientY = 0, lastClientX = 0;
            element.addEventListener('touchmove', (event: TouchEvent) => {
                event.preventDefault();

                let delta: number = 0,
                    deltaY: number = event.touches[0].clientY - lastClientY,
                    deltaX: number = event.touches[0].clientX - lastClientX;

                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    delta = (this.options?.rotateByAngle || 0) * deltaY / Math.abs(deltaY);
                } else {
                    delta = (this.options?.rotateByAngle || 0) * deltaX / Math.abs(deltaX);
                }

                this.rotate(delta);

                lastClientY = event.touches[0].clientY;
                lastClientX = event.touches[0].clientX;
            });
        }

        this.observer.observe(element, Rotatex.ObserverOptions);
        this.build();
    }

    get Element(): HTMLElement {
        return this.element;
    }

    get MainOffsetAngle(): number {
        return this.mainOffsetAngle;
    }

    rotate(delta: number) {
        this.mainOffsetAngle += delta;
        this.fixRotateLimit(delta);
        this.element.style.setProperty('--main-offset-angle', this.mainOffsetAngle + 'deg');

        if (delta) {
            this.dispatchEvent();
        }
    }

    setRotation(delta: number) {
        this.mainOffsetAngle = delta;
        this.fixRotateLimit(delta);
        this.rotate(0);
    }

    private fixRotateLimit(delta: number) {
        if (delta > 0) {
            this.mainOffsetAngle = Math.min(this.mainOffsetAngle, this.options?.rotateLimit || 360000);
        } else if (delta < 0) {
            this.mainOffsetAngle = Math.max(this.mainOffsetAngle, -1 * (this.options?.rotateLimit || 360000));
        }
    }

    getChildrenDetails() {
        let data: RotateChild[] = [];

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

            data.push({ element, angle });
        });

        return data;
    }

    private dispatchEvent() {
        if (this.some('rotate')) {
            let data: RotateDataEvent = {
                mainOffsetAngle: this.mainOffsetAngle,
                children: this.getChildrenDetails()
            };

            this.emit('rotate', data);
        }
    }
}