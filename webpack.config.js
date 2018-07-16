const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        'index': path.join(__dirname, 'src/index.ts')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'react-authoried'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(tsx?|js)$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        react: 'react',
        'react-router': 'react-router',
    },
    optimization: {
        minimize: false
    }
}