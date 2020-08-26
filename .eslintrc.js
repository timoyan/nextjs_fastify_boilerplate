module.exports = {
    env: {
        es6: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'jsx-a11y'],
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:jsx-a11y/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: 'tsconfig.json',
        createDefaultProgram: true,
    },
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
