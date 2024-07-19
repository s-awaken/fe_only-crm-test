module.exports = {
	webpack: {
		configure: {
			entry: './src/index.tsx',
		},
	},
	eslint: {
		enable: true,
		mode: 'extends',
		configure: {
			extends: 'react-app',
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
};
