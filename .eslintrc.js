module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['@react-native-community', 'eslint-config-prettier'],
    plugins: ['prettier', 'react-native'],
    ignorePatterns: ['.eslintrc.js'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        jsx: true,
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
    },
    rules: {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
};
