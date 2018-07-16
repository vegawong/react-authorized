import path from 'path'

import typescript from 'typescript'
import typescriptPlugin from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import packageJson from 'rollup-plugin-generate-package-json'
import { uglify } from 'rollup-plugin-uglify'

import pkg from './package.json'

const libraryName = 'react-authorized',
    globalLibs = {
        react: 'React',
    },
    externalLibs = [
        'react',
        'react-router',
        'react-router-dom',
        'react-dom',
        'lodash'
    ]

export default {
    input: 'src/index.ts',
    external: externalLibs,
    output: [
        {
            
            file: `dist/${pkg.main}`,
            format: 'umd',
            globals: globalLibs,
            name: libraryName
        },
        {
            file: `dist/${pkg.module}`,
            format: 'es',
            globals: globalLibs,
            name: libraryName
        }
    ],
    plugins: [
        typescriptPlugin({
            exclude: /test/,
            clean: true,
            typescript,
            verbosity: 0
        }),
        commonjs({
            // include: 'node_modules/**',
            namedExports: {
                'node_modules/lodash/lodash.js': [
                    'isEmpty',
                    'map',
                    'isNil',
                    'isArray',
                    'isString',
                    'isFunction',
                    'indexOf',
                    'omit'
                ]
            }
        }),
        nodeResolve({
            // pass custom options to the resolve plugin
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),
        packageJson({
            // By default, the plugin searches for package.json file.
            // Optionally, you can specify its path
            inputFile: path.resolve(__dirname, './package.json'),

            // // Set output folder, where generated package.json file will be saved
            outputFolder: path.resolve(__dirname, './dist'),

            // // Optionally, you can set base contents for your generated package.json file
            baseContents: {
                name: pkg.name || '',
                version: pkg.version,
                description: pkg.description || '',
                main: pkg.main || '',
                module: pkg.module || '',
                keywords: pkg.keywords || [],
                homepage: pkg.homepage,
                author: pkg.author || '',
                license: pkg.license || 'MIT',
                repository: pkg.repository || '',
                dependencies: pkg.dependencies || {},
                peerDependencies: {
                    "react": "^0.14.0 || ^15.0.0-0 || ^16.0.0-0"
                },
                private: false
            }
        })
    ]
}
