import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "airbnb",
      "plugin:jsx-a11y/recommended",
      "prettier",
      "prettier/react",
      "@feature-sliced"
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // JavaScript rules
      // Запрещает пустые интерфейсы в TypeScript (например, интерфейс без свойств)
      '@typescript-eslint/no-empty-interface': 0,
      // Требует избегать использования типа "any" в TypeScript, чтобы обеспечить типизацию
      '@typescript-eslint/no-explicit-any': 'error',
      // Проверяет неиспользуемые переменные и параметры. Игнорирует переменные, начинающиеся с '_'
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_', // Игнорирует параметры, начинающиеся с '_'
          'caughtErrorsIgnorePattern': '^_', // Игнорирует пойманные ошибки, начинающиеся с '_'
          'varsIgnorePattern': '^_' // Игнорирует переменные, начинающиеся с '_'
        }
      ],
      // Ограничивает сложность функций (количество циклов и условий). 13 — максимальный порог сложности
      'complexity': ['error', 15],
      // Предупреждает о наличии оператора debugger в коде (оставлять в процессе разработки)
      'no-debugger': 'warn',
      // Отключает предупреждение о шаблонных строках с неправильным синтаксисом
      'no-template-curly-in-string': 'off',
      // Отключает правило для неиспользуемых переменных в JavaScript (используется версия для TypeScript)
      'no-unused-vars': 'off',
      // Требует использования одинарных кавычек для строк
      'quotes': ['error', 'single'],
      // Запрещает использование точек с запятой в конце строк
      'semi': ['error', 'never'],
      // Требует использования двух пробелов для отступов
      'indent': ['error', 2],
      // Пробелы внутри фигурных скобок
      'object-curly-spacing': ['error', 'always'],
      // Прекратить наличие пустых строк подряд
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1, // Максимум 1 пустая строка подряд
          maxEOF: 1, // Оставляем 1 пустую строку в конце файла
        },
      ],
      // Удаление лишних пробелов в конце строки
      'no-trailing-spaces': 'error',
      // Требуем пустую строку в конце файла
      'eol-last': ['error', 'always'],

      // React rules

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Требует использования значения в JSX для булевых атрибутов
      'react/jsx-boolean-value': 1,
      // Определяет, где должны быть фигурные скобки для JSX элементов (например, для детей всегда, для пропсов — только по необходимости)
      'react/jsx-curly-brace-presence': [
        'error',
        {
          'children': 'never', // Не требует скобок для текстовых узлов
          'propElementValues': 'always', // Всегда использовать скобки для значений пропсов
          'props': 'never', // Не требует скобок для простых пропсов
        },
      ],
      // Требует использования расширений .ts или .tsx для JSX в TypeScript проектах
      'react/jsx-filename-extension': [
        1,
        {
          'extensions': ['.ts', '.tsx']
        }
      ],
      // Запрещает использование индекса массива в качестве ключа для элементов списка в React
      'react/no-array-index-key': 2,
      // Рекомендует использовать функциональные компоненты вместо классовых в React
      'react/prefer-stateless-function': 2,
      // Ограничивает количество атрибутов до 3 в одной строке.
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: 3, // Не более 3 атрибутов в строке
          when: 'always', // Всегда переносить атрибуты на новую строку, если их больше 3
        },
      ],

      // FSD Rules
      // Ограничивает импорт из внутренних папок. Указывает, что компоненты, сущности и страницы должны импортироваться только через их публичный API
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/shared/*/*', // Не допускаются импорты из внутренних частей shared
            '**/entities/*/*', // Не допускаются импорты из внутренних частей entities
            '**/features/*/*', // Не допускаются импорты из внутренних частей features
            '**/pages/*/*', // Не допускаются импорты из внутренних частей pages
          ],
          paths: [
            {
              name: '@/features',
              message: 'Import features only from their public API.', // Оповещает, что нужно импортировать из публичного API features
            },
            {
              name: '@/entities',
              message: 'Import entities only from their public API.', // Оповещает, что нужно импортировать из публичного API entities
            },
            {
              name: '@/pages',
              message: 'Import pages only from their public API.', // Оповещает, что нужно импортировать из публичного API pages
            },
          ],
        },
      ],
      // Ограничивает импорты в определённых зонах, например, запрещает импорты из pages в features
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/features',
              from: './src/pages',
              message: 'Features should not depend on pages.', // Features не должны зависеть от pages
            },
            {
              target: './src/entities',
              from: './src/features',
              message: 'Entities should not depend on features.', // Entities не должны зависеть от features
            },
            {
              target: './src/shared',
              from: './src/features',
              message: 'Shared should be used sparingly in features.', // Shared должен использоваться умеренно в features
            },
          ],
        },
      ],
      // Правило для организации импортов: группирует импорты по типам и добавляет пустую строку между группами
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], // Группы импортов
          pathGroups: [
            {
              pattern: '@shared/**', // Группирует все импорты из shared как internal
              group: 'internal',
              position: 'before', // Позиционирует перед другими группами
            },
            {
              pattern: '@entities/**', // Группирует все импорты из entities как internal
              group: 'internal',
              position: 'before', // Позиционирует перед другими группами
            },
            {
              pattern: '@features/**', // Группирует все импорты из features как internal
              group: 'internal',
              position: 'before', // Позиционирует перед другими группами
            },
            {
              pattern: '@pages/**', // Группирует все импорты из pages как internal
              group: 'internal',
              position: 'before', // Позиционирует перед другими группами
            },
          ],
          'newlines-between': 'always', // Требует пустую строку между группами импортов
        },
      ],
      // Требует использования kebab-case для имён файлов
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true, // Требуется использовать kebab-case для файлов
          },
        },
      ],
      // Запрещает циклические импорты (когда два модуля импортируют друг друга)
      'import/no-cycle': [
        'error',
        {
          maxDepth: 1, // Разрешает максимум один уровень вложенных циклических зависимостей
        },
      ],
      // Отключает правило, требующее использовать default export для файлов с единственным экспортом
      'import/prefer-default-export': 'off',
      // Запрещает использование `export *` для публичного API
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration', // Запрещает экспорт всех элементов
          message: 'Avoid using `export *` in public API files.', // Предупреждает использовать `export *` в публичных API файлах
        },
      ],
    },
  },
)
