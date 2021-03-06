import movies from '../services/movies.service';
import { on, insertHtmlTo, appendHtmlTo, preventEvent } from '../utils/dom';
import { map, reduce } from '../utils/fp';
import { sum } from '../utils/math';
import movieItemHtml from '../templates/movie-item-html.template';
import getScrollParent from '../utils/get-scroll-parent';
import isVisibleInScrollParent from '../utils/is-visible-in-scroll-parent';

let searchBoxForm = document.querySelector('.movies-search .search-box');
let searchInputField = searchBoxForm.querySelector('input');
let searchResultElem = document.querySelector('.movies-search .search-results');
let errorMessageElem = document.querySelector('.movies-search .search-error');
let infinteLoaderElem = document.querySelector('.movies-search .infinite-loader');
let infinteScrollElem = getScrollParent(infinteLoaderElem);
let insertToResults = insertHtmlTo(searchResultElem);
let appendToResults = appendHtmlTo(searchResultElem);
let insertToErrors = insertHtmlTo(errorMessageElem);
let concat = reduce(sum);
let pageIndex = 1;
let infinteLoaderVisible;

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

function searchNextMovies (filterText) {
	pageIndex += 1;
	movies
		.search(filterText, pageIndex)
		.then(map(movieItemHtml))
		.then(concat)
		.then(appendToResults)
		.catch(showSearchError);
}


function handleSearch () {
	let value = searchInputField.value;

	searchMovies(value, pageIndex);
}

function handlePagination (data) {
	let value = searchInputField.value;
	let visible = isVisibleInScrollParent(infinteLoaderElem, infinteScrollElem);
	let visibilityChanged = visible !== infinteLoaderVisible;
	let becameVisible = visibilityChanged && visible;

	infinteLoaderVisible = visible;
	if (becameVisible && value) {
		searchNextMovies(value);
	}
	return data;
}

on('submit', searchBoxForm, preventEvent);
on('submit', searchBoxForm, handleSearch);
on('scroll', infinteScrollElem, handlePagination);
