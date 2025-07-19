module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // A linha MAIS IMPORTANTE: Diz ao ESLint para usar o parser de TypeScript.
    parserOptions: {
      project: './tsconfig.json', // Ajuda o parser a encontrar a configuração do seu projeto.
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      '@react-native',
      'plugin:@typescript-eslint/recommended', // Regras recomendadas para TypeScript.
      'prettier', // Desativa regras do ESLint que conflitam com o Prettier.
    ],
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // Opcional, mas útil para novas versões do React.
    },
    ignorePatterns: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '.eslintrc.js', // Ignora o próprio arquivo de config para evitar avisos.
    ],
  };