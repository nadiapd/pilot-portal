import withNuxt from './.nuxt/eslint.config.mjs'

const isProduction = process.env.NODE_ENV === 'production'

export default withNuxt({
  rules: {
    'no-console': isProduction ? 'error' : 'warn',
    'no-debugger': isProduction ? 'error' : 'warn',
    // 'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': ['error', 'never'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'sort-imports': [
      'warn',
      {
        ignoreDeclarationSort: true
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type'
        ],
        alphabetize: {
          order: 'asc'
        }
      }
    ],
    'indent': ['error', 2],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      'error',
      'never'
    ],
    'space-before-function-paren': 'off',
    '@stylistic/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'never'
      }
    ],
    'vue/html-indent': ['error', 2],
    'vue/multi-word-component-names': 'off',
    'vue/no-async-in-computed-properties': 'off',
    'vue/block-order': [
      'error',
      {
        order: [
          'script',
          'template',
          'style'
        ]
      }
    ]
  }
})
