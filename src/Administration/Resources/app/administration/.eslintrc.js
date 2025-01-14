const path = require('path');

module.exports = {
    extends: [
        '@shopware-ag/eslint-config-base'
    ],
    env: {
        browser: true,
        'jest/globals': true
    },

    globals: {
        Shopware: true,
        VueJS: true,
        Cypress: true,
        cy: true,
        autoStub: true
    },

    plugins: [
        'jest',
        'twig-vue'
    ],

    settings: {
        'import/resolver': {
            node: {},
            webpack: {
                config: {
                    // Sync with webpack.config.js
                    resolve: {
                        extensions: ['.js', '.vue', '.json', '.less', '.twig'],
                        alias: {
                            vue$: 'vue/dist/vue.esm.js',
                            src: path.join(__dirname, 'src'),
                            module: path.join(__dirname, 'src/module'),
                            scss: path.join(__dirname, 'src/app/assets/scss'),
                            assets: path.join(__dirname, 'static')
                        }
                    }
                }
            }
        }
    },

    rules: {
        // Match the max line length with the phpstorm default settings
        'max-len': ['warn', 125, { ignoreRegExpLiterals: true }],
        // Warn about useless path segment in import statements
        'import/no-useless-path-segments': 0,
        // don't require .vue and .js extensions
        'import/extensions': ['error', 'always', {
            js: 'never',
            vue: 'never'
        }]
    },

    overrides: [
        {
            extends: [
                'plugin:vue/recommended',
                '@shopware-ag/eslint-config-base'
            ],
            files: ['**/*.js'],
            excludedFiles: '*.spec.js',
            rules: {
                'vue/require-prop-types': 'error',
                'vue/require-default-prop': 'error',
                'vue/no-mutating-props': ['off'],
                'vue/component-definition-name-casing': ['error', 'kebab-case'],
                'vue/order-in-components': ['error', {
                    order: [
                        'el',
                        'name',
                        'parent',
                        'functional',
                        ['template', 'render'],
                        'inheritAttrs',
                        ['provide', 'inject'],
                        'extends',
                        'mixins',
                        'model',
                        ['components', 'directives', 'filters'],
                        ['props', 'propsData'],
                        'data',
                        'metaInfo',
                        'computed',
                        'watch',
                        'LIFECYCLE_HOOKS',
                        'methods',
                        ['delimiters', 'comments'],
                        'renderError'
                    ]
                }]
            }
        }, {
            extends: [
                'plugin:vue/essential',
                'plugin:vue/recommended',
                'eslint:recommended'
            ],
            processor: 'twig-vue/twig-vue',
            files: ['**/*.html.twig'],
            rules: {
                'vue/component-name-in-template-casing': ['error', 'kebab-case', {
                    registeredComponentsOnly: true,
                    ignores: []
                }],
                'vue/html-indent': ['error', 4, {
                    baseIndent: 0
                }],
                'no-multiple-empty-lines': ['error', { max: 1 }],
                'eol-last': 'off', // no newline required at the end of file
                'max-len': 'off',
                'vue/multiline-html-element-content-newline': 'off', // allow more spacy templates
                'vue/html-self-closing': 'warn',
                'vue/no-multiple-template-root': 'warn',
                'vue/no-unused-vars': 'warn',
                'vue/no-parsing-error': ['error', {
                    'nested-comment': false
                }],
                'vue/valid-template-root': 'warn',
                'vue/valid-v-slot': ['error', {
                    allowModifiers: true
                }]
            }
        }
    ]
};
