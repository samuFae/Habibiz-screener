const CracoAlias = require("craco-alias");
const { ChangeCssFilename, ChangeJsFilename } = require("@navikt/craco-plugins")

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                // baseUrl SHOULD be specified
                // plugin does not take it from tsconfig
                baseUrl: "./src",
                // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
                tsConfigPath: "./tsconfig.paths.json"
            }
        },
        {
            plugin: ChangeCssFilename,
            options: {
                filename: 'msc.css',
                chunkFilename: 'static/css/msc.[name].chunk.css'
            }
        },
        {
            plugin: ChangeJsFilename,
            options: {
                filename: 'msc.js',
                chunkFilename: 'static/js/msc.[name].chunk.js',
                runtimeChunk: true,
                splitChunk: 'VENDOR_CHUNKING'
            }
        }
    ]
}
