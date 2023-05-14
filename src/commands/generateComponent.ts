import { toCamelCase, toPascalCase } from '../utils/index.js';
import { component, page, scss } from '../templates/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import chalk from 'chalk';

export function generateComponent(input: string) {
	const rootDir = process.cwd();
	const name = toPascalCase(input);
	const BASE_DIR = `${rootDir}/src/components`;
	const componentDirectory = `${BASE_DIR}/${name}`;

	// create the components directory if it doesn't exist
	if (!existsSync(BASE_DIR)) {
		mkdir(BASE_DIR).catch(writeFileErrorHandler);
		createComponent();
	} else {
		createComponent();
	}

	// create the component
	function createComponent() {
		// throw an error if the file already exists
		if (existsSync(componentDirectory)) {
			console.error(chalk.yellow(`WARNING: ${name} already exists.`));
			return;
		}

		// create the component folder
		mkdir(componentDirectory);

		// create component.tsx
		console.log(`Creating ${name}.tsx...`);
		writeFile(`${componentDirectory}/${name}.tsx`, component(name)).catch(
			writeFileErrorHandler
		);

		// success message
		console.log(
			`${chalk.green(`${name}.tsx`)} was created in src/components/${name}/`
		);

		// create component.module.scss
		console.log(`Creating ${toCamelCase(name)}.module.scss...`);
		writeFile(
			`${componentDirectory}/${toCamelCase(name)}.module.scss`,
			scss(name)
		).catch(writeFileErrorHandler);
		console.log(
			`${chalk.green(
				`${toCamelCase(name)}.module.scss`
			)} was created in src/components/${name}/`
		);
	}

	// handle errors
	function writeFileErrorHandler(err: NodeJS.ErrnoException | null): void {
		if (err) throw err;
	}
}
