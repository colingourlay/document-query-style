# documentQueryStyle

Select element(s) in a document with a computed style that matches the supplied query

## Usage

``` js
var documentQueryStyle = require('document-query-style');

var whiteElements = documentQueryStyle('background-color', 'rgb(255, 255, 255)');

var firstAbsoluteTopElement = documentQueryStyle({
    position: 'absolute',
    top: 0
}, true);
```

## API

### Query a single CSS property

``` js
documentQueryStyle( property, value [, shouldReturnFirstResult] )
```

* `property` is a CSS property such as 'background-color' or 'position'.
* `value` is the value you expect that property to hold.
* `shouldReturnFirstResult` (optional) should be `true` if you're only interested in the first matching element.

Returns an array of elements (which could be empty), or if asked for the first matching element, it will either return an element or `null` if there are no matches.

### Query multiple CSS properties

``` js
documentQueryStyle( properties [, shouldReturnFirstResult] )
```

* `properties` is an object where keys are CSS properties and values are the values you expect those properties to hold
* `shouldReturnFirstResult` (optional) [as above]

Returns [as above]

## Polyfill (well, [prollyfill](https://twitter.com/slexaxton/status/257543702124306432))

Assuming this would eventually become part of the `document` API, it would most likely expose the methods:

* `document.queryStyleAll` - which returns all matching elements
* `document.queryStyle` - which returns the first matching element

You can polyfill that API by calling:

``` js
documentQueryStyle.polyfill();
```

Then you'll be able to do this:

``` js
var whiteElements = document.queryStyleAll('background-color', 'rgb(255, 255, 255)');

var firstAbsoluteTopElement = document.queryStyle({
    position: 'absolute',
    top: 0
});
```

Note: rather than using a single funtion with the optional `shouldReturnFirstResult` argument, each method essentially sets that option for you.

### `.polyfill` API

``` js
documentQueryStyle.polyfill([api]);
```

* `api` (optional) the object you want to make `queryStyleAll` and `queryStyle` available on. This defaults to `document`, but you might not want to put it there.

## Demo

There are examples in the `examples` directory. Have a look at the `index.html` file in each example for some typical markup and styling, then look at the corresponding `index.js` file to see how you'd use `documentQueryStyle` to query the DOM.

To try out some examples in the browser, run:

    $ npm run example

...to get a list of examples, then run:

    $ npm run example <example_name>

...and open [http://127.0.0.1:9966](http://127.0.0.1:9966) in your browser, and chech the browser's console output.

## Building standalone version

This module is designed to be `require`d into your project with a tool such as browserify, but if you want to build a standalone module, run:

    $ npm install
    $ npm run dist

You'll find two new files in the root directory (one of which is minified). Either drop one of the scripts into a page and access `documentQueryStyle` globally in your project, or use your AMD loader of choice.

## Caveats

`window.getComputedStyle` is used to fetch the current style of each element in the DOM, which means that all units are standardised, i.e.:

* Every size is in px (including fractions based on unit conversions)
* Every colour is in rgb() or rgba()

This library will eventually perform conversions on the values you pass in, but for now, stick to the standard units.

Also, `window.getComputedStyle` will treat all vendor prefixed properties as separate properties, so you'll have to explicitly check them. `documentQueryStyle` knows nothing about which property will actually determine the style of an element, in cases where different values are applied.

If an element inherits style from a parent, rather than being defined explicitly, it _will_ be included in the results.

Most importantly, the speed of `documentQueryStyle` is inversely proportional to the number of elements in the DOM when you call it, so it's probably best not to use it on very complex pages, unless you want to take a performance hit.
