import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import imports from 'eslint-plugin-import'

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			import: imports,
		},
		rules: {
			'semi': ['error', 'never'],
			'quotes': ['error', 'single'],
			"import/order": ["error", {
				"alphabetize": { "order": "asc", "caseInsensitive": true },
				"distinctGroup": false,
				"newlines-between": "always",
				"groups": ["builtin", "external", "internal", ["parent", "sibling", "index"]],
				"pathGroupsExcludedImportTypes": [],
				"pathGroups": [
					{
						"pattern": "react",
						"group": "external",
						"position": "before",
					},
					{
						"pattern": "{@/ui,@/ui/**}",
						"group": "internal",
						"position": "after",
					},
					{
						"pattern": "@/**",
						"group": "internal",
					},
					{
						"pattern": "../**",
						"group": "parent",
						"position": "before",
					},
					{
						"pattern": "{./,.}",
						"group": "index",
						"position": "after",
					},
				],
			}],
		},
	},
])
