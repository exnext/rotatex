import './rotatex.scss';

import {WeakMapIndex} from './weakmapindex';

const OPT = { attributes: true, childList: true, subtree: true };

const observer = Symbol('observer');
const callback = Symbol('callback');
const elements = Symbol('elements');

class Rotatex {
    [callback](mutationsList, observer) {
        console.log(mutationsList, observer);
        for (let mutation of mutationsList) {
            let element = mutation.target;
            let {options} = this[elements].get(element);
            this.build(element, options);
        }
    }

    build(element, options = {}) {
        console.log(element, options);
    }

    on(element, options = {}, config = OPT) {
        this[elements] = this[elements] || new WeakMapIndex();
        this[elements].set(element, {
            options,
            config
        });
        
        this[observer] = this[observer] || new MutationObserver(this[callback].bind(this));
        this[observer].observe(element, config);

        this.build(element, options);
    }

    off(element) {
        if (this[elements] && this[elements].has(element)) {
            this[elements].delete(element);

            this[observer].disconnect();

            for (let item of this[elements].keys) {
                let {config} = this[elements].get(item);
                this[observer].observe(item, config);
            }
        }
    }
}

const rotatex = new Rotatex();

export {rotatex, Rotatex};