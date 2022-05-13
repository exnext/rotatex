# rotatex

Library to make circular menu, list, etc. (...and everything what you want)

## Live demo

Before reading the text below, first take a look at the live demo and see if it is interesting for you.

## NPM

```bash
npm install @exnext/rotatex
```

## Initialization

To use rotatex library you must include required `rotatex.css` to your project and optional `rotatex.js` if you would like to use some additional features.

```html
<link href="rotatex.css" rel="stylesheet">
<script type='text/javascript' src='rotatex.js'></script>
```

or

```js
import '@exnext/rotatex/dist/rotatex.css';
import { Rotatex } from '@exnext/rotatex';
```

## Usage based only on `rotatex.css`

To set your circular menu you may use css classes and css variables

### Main element

Main element should have set `rotatex` class to enable the library.

### Children

Every child element should have set classes from `r-0` to `r-360` or `--angle` variable.

* classes from `r-0` to `r-360` describe an angle of rotation
* `r-off` class is for setting exceptions

* by `--angle` variable you can set angle
* using `--offset-angle` you can set offset for an angle. Great for menu rotation by routing on any SPA framework or other situation. To rotate all menu you can use also `--main-offset-angle` variable with main element instead `--offset-angle` on all children. But be careful, `--main-offset-angle` is set by Rotatex javascript class and they shouldn't be used togather.

## Examples

Rotating by class name from `r-0` to `r-360` or by `--angle` css variable

```html
<ul class="rotatex">
    <li class="r-0"><span>Test 1</span></li>
    <li class="r-60"><span>Test 2</span></li>
    <li class="r-120"><span>Test 3</span></li>

    <li style="--angle: 180deg;"><span>Test 4</span></li>
    <li style="--angle: 240deg;"><span>Test 5</span></li>
    <li style="--angle: 300deg;"><span>Test 6</span></li>
</ul>
```

## Exceptions

If you want to set any item in the list other than the rest, e.g. by always placing it in the middle position, you can use the `r-off` class.

```html
<ul class="rotatex">
    <li class="r-off your-class"><span>Menu</span></li>

    <li class="r-0"><span>Test 1</span></li>
    <li class="r-120"><span>Test 3</span></li>
    <li class="r-240"><span>Test 5</span></li>
</ul>
```

## Animation

To animate rotation use `rotatex-rotate` class and one of classes to set direction of rotation: `rotatex-rotate__left` or `rotatex-rotate__right`.

```html
<ul class="rotatex rotatex-rotate rotatex-rotate__left">
    <li class="r-0"><span>Test 1</span></li>
    <!-- ...and more items -->
</ul>
```

To change time of animation or other you should use css parameters.

## Usage based also on `rotatex.js`

This is simple usage of `Rotatex` javascript class. You haven't to set css `rotatex` class. It will be set by constructor. You can use `Rotatex` javascript class with static menu if you would like to use actions and events.

```html
<ul id="dynamic"></ul>

<script>
    let ul = document.getElementById('dynamic');
    let rotatex = new Rotatex(ul);

    /* It is my example for list, you may create more difficult */
    for (i = 1; i <= 10; i++) {
      let li = document.createElement('li');
      let span = document.createElement('span');

      span.innerText = 'Test ' + i;
      li.appendChild(span);
      ul.appendChild(li);
    }    
</script>
```

## Rotating by the mouse wheel or finger on the touch screen actions

To rotate the list with the mouse wheel or finger on the touch screen, set the `rotateByAngle` option. The list will rotate clockwise.

```js
let rotatex = new Rotatex(ul, { rotateByAngle: 10 });
```
Set a negative value for counterclockwise `rotateByAngle`.

```js
let rotatex = new Rotatex(ul, { rotateByAngle: -10 });
```

Infinity rotation is forbidden. To set limit angle rotation you may set `rotateLimit` option. Default value is 360000 deg.

```js
let rotatex = new Rotatex(ul, { rotateByAngle: 10, rotateLimit: 360 });
```

## Events

The mouse wheel or finger on the touch screen triggers rotate event.

```js
let rotatex = new Rotatex(ul, { rotateByAngle: 10 });

rotatex.on('rotate', (event) => {
    console.log(event);
});
```

Parameter of callback is `RotateDataEvent` type and include information:

```typescript
interface RotateChild {
    element: HTMLElement,
    angle?: number;
}

interface RotateDataEvent {
    mainOffsetAngle: number;
    children: RotateChild[]
}
```