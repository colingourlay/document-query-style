var documentQueryStyle = require('../../');

console.group('property+value ==> all results');
console.log('Black text:', documentQueryStyle('color', 'rgb(0, 0, 0)'));
console.log('White text:', documentQueryStyle('color', 'rgb(255, 255, 255)'));
console.log('Blue background:', documentQueryStyle('background-color', 'rgb(0, 0, 255)'));
console.log('Red background:', documentQueryStyle('background-color', 'rgb(255, 0, 0)'));
console.groupEnd();

console.group('property+value ==> first result');
console.log('Blue background:', documentQueryStyle('background-color', 'rgb(0, 0, 255)', true));
console.log('Red background:', documentQueryStyle('background-color', 'rgb(255, 0, 0)', true));
console.groupEnd();

console.group('properties ==> all results');
console.log('White text & blue background:', documentQueryStyle({
    'color': 'rgb(255, 255, 255)',
    'background-color': 'rgb(0, 0, 255)'
}));
console.log('Red background:', documentQueryStyle({
    'background-color': 'rgb(255, 0, 0)'
}));
console.groupEnd();

console.group('properties ==> first result');
console.log('Black text:', documentQueryStyle({
    'color': 'rgb(0, 0, 0)',
}, true));
console.log('Red background:', documentQueryStyle({
    'background-color': 'rgb(255, 0, 0)'
}, true));
console.groupEnd();
