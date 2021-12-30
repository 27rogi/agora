module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaFeatures: {
            modules: true,
            jsx: true
        }
    },
    extends: [
        'preact',
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        "react/jsx-no-bind": [2, { ignoreRefs: true }],
        "react/jsx-no-duplicate-props": 2,
        "react/self-closing-comp": 2,
        "react/prefer-es6-class": 2,
        "react/no-string-refs": 2,
        "react/require-render-return": 2,
        "react/no-find-dom-node": 2,
        "react/no-is-mounted": 2,
        "react/jsx-no-comment-textnodes": 2,
        "react/jsx-curly-spacing": 2,
        "react/jsx-no-undef": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
    },
    settings: {
        jest: {
            version: 26
        },
        react: {
            pragma: "h"
        }
    },
}
