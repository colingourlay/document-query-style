require('../../').polyfill();

console.group('property+value ==> all results');
console.log('Black text:', document.queryStyleAll('color', 'rgb(0, 0, 0)'));
console.log('White text:', document.queryStyleAll('color', 'rgb(255, 255, 255)'));
console.log('Blue background:', document.queryStyleAll('background-color', 'rgb(0, 0, 255)'));
console.log('Red background:', document.queryStyleAll('background-color', 'rgb(255, 0, 0)'));
console.groupEnd();

console.group('property+value ==> first result');
console.log('Blue background:', document.queryStyle('background-color', 'rgb(0, 0, 255)'));
console.log('Red background:', document.queryStyle('background-color', 'rgb(255, 0, 0)'));
console.groupEnd();

console.group('properties ==> all results');
console.log('White text & blue background:', document.queryStyleAll({
    'color': 'rgb(255, 255, 255)',
    'background-color': 'rgb(0, 0, 255)'
}));
console.log('Red background:', document.queryStyleAll({
    'background-color': 'rgb(255, 0, 0)'
}));
console.groupEnd();

console.group('properties ==> first result');
console.log('Black text:', document.queryStyle({
    'color': 'rgb(0, 0, 0)',
}));
console.log('Red background:', document.queryStyle({
    'background-color': 'rgb(255, 0, 0)'
}));
console.groupEnd();
