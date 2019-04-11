module.exports = {
	use: [
		// '@atomspace/stylelint',
		['@atomspace/eslint', {
			eslint: {
				envs: ['browser']
			}
		}],
		['neutrino-preset-umd'],
		'@neutrinojs/jest'
	]
}