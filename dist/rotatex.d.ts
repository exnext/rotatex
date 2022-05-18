import './rotatex.scss';
import { Eventex } from '@exnext/eventex';
export interface RotatexOptions {
    rotateByAngle: number;
    rotateLimit?: number;
}
export interface RotateChild {
    element: HTMLElement;
    angle?: number;
}
export interface RotateDataEvent {
    mainOffsetAngle: number;
    children: RotateChild[];
}
export declare class Rotatex extends Eventex {
    private options?;
    private static readonly ObserverOptions;
    private mainOffsetAngle;
    private element;
    private observer;
    constructor(element: HTMLElement | string, options?: RotatexOptions | undefined);
    private build;
    get Element(): HTMLElement;
    get MainOffsetAngle(): number;
    rotate(delta: number): void;
    setRotation(delta: number): void;
    private fixRotateLimit;
    getChildrenDetails(): RotateChild[];
    private dispatchEvent;
}
