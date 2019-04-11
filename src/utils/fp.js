export function curry (func) {
	return function currify (...args) {
		return args.length >= func.length ?
			func.apply(null, args) :
			currify.bind(null, ...args);
	};
}

export let map = curry(function map (callback, array) {
	return array.map(callback);
});

export let reduce = curry(function reduce (callback, array) {
	return array.reduce(callback);
});


export let forEach = curry(function forEach (callback, array) {
	return array.forEach(callback);
});
