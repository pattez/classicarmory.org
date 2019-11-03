/* eslint-disable no-undef */
// svelte.config.js
const preprocess = require('svelte-preprocess')

module.exports = {
    preprocess: preprocess({
        stylus: {
            paths: ['src/style'],
            test: /\.styl(us)?$/,
        },
    })
    // preprocess: preprocess()
    // ...other svelte options
}
