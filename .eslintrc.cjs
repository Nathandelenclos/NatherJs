module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: 'standard',
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        "no-unused-vars": 'off',
        "no-undef": "off",
        "no-return-assign": "off",
        "no-useless-return": "off"
    }
}
