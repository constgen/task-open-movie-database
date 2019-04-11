const IMDB_URL = 'https://www.imdb.com/title';

export default function movieItemHtml ({
	Title, Year, imdbID, Poster, Type
}) {
	return `<li class="movie-item">
		<a title="${Title} (${Year})" href="${IMDB_URL}/${imdbID}" class="link" target="_blank">
			<img src="${Poster}" alt="${Type} ${Title}" class="image">
			<h3 class="title">${Title}</h3>
		</a>
	</li>`;
}