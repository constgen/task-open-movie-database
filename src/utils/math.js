import { curry } from './fp';

export let sum = curry(function sum (valueA, valueB) {
	return valueA + valueB;
});