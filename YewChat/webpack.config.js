const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// We're running wasm-pack manually instead of using the plugin
// const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'production',
    devServer: {
        port: 8000,
    },
    performance: {
        // Increase size limit to avoid warnings about WebAssembly size
        maxAssetSize: 500000, // 500 KiB
        maxEntrypointSize: 500000,
    },
    entry: './bootstrap.js',
    output: {
        path: distPath,
        filename: 'yewchat.js',
        webassemblyModuleFilename: 'yewchat_bg.wasm',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: './static', to: distPath }],
        }),
        // We're running wasm-pack manually, so we don't need the plugin
        // new WasmPackPlugin({
        //     crateDirectory: '.',
        //     extraArgs: '-- --features wee_alloc',
        //     outName: 'yewchat',
        // }),
    ],
    experiments: {
        asyncWebAssembly: true,
    },
};
