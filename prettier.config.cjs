const tailwindPlugin = require("prettier-plugin-tailwindcss");
const sortImportsPlugin = require("@trivago/prettier-plugin-sort-imports");

const plugins = [
	{
		parsers: {
			typescript: {
				...tailwindPlugin.parsers.typescript,
				preprocess: sortImportsPlugin.parsers.typescript.preprocess,
			},
		},
		options: {
			...sortImportsPlugin.options,
		},
	},
];

module.exports = {
	plugins,
	printWidth: 100,
	tabWidth: 4,
	trailingComma: "es5",
	singleQuote: false,
	semi: true,
	useTabs: true,

	importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
