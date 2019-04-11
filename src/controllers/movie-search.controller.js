import movies from '../services/movies.service';
import { on, insertHtmlTo, preventEvent } from '../utils/dom';
import { map, reduce } from '../utils/fp';
import { sum } from '../utils/math';
import movieItemHtml from '../templates/movie-item-html.template';

let searchBoxForm = document.querySelector('.movies-search .search-box');
let searchInputField = searchBoxForm.querySelector('input');
let searchResultElem = document.querySelector('.movies-search .search-results');
let errorMessageElem = document.querySelector('.movies-search .search-error');
let insertToResults = insertHtmlTo(searchResultElem);
let insertToErrors = insertHtmlTo(errorMessageElem);
let concat = reduce(sum);

function showSearchError (err) {
	insertToResults('');
	insertToErrors(err.message);
	return err.message;
}

function clearErrors (data) {
	insertToErrors('');
	return data;
}

function searchMovies (filterText) {
	movies
		.search(filterText)
		.then(map(movieItemHtml))
		.then(concat)
		.then(insertToResults)
		.then(clearErrors)
		.catch(showSearchError);
}

function handleSearch () {
	let value = searchInputField.value;

	searchMovies(value);
}

on('submit', searchBoxForm, preventEvent);
on('submit', searchBoxForm, handleSearch);