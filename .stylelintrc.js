let { Neutrino } = require('neutrino')

module.exports = Neutrino({ cwd: __dirname })
  .use('.neutrinorc.js')
	.call('stylelintrc')