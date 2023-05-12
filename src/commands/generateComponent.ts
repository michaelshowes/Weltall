import { toCamelCase, toPascalCase } from '../utils/index.js';
import { component, page, scss } from '../templates/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import chalk from 'chalk';

export function generateComponent(type: string, input: string) {
	const rootDir = process.cwd();
	const name = toPascalCase(input);
	const pageType = type === 'page';
	const BASE_DIR = pageType
		? `${rootDir}/src/app`
		: `${rootDir}/src/components`;
	const componentDirectory = pageType
		? `${BASE_DIR}/${toCamelCase(name)}`
		: `${BASE_DIR}/${name}`;

	// throw an error if no component name is specified
	if (!name) {
		console.error(chalk.yellow('Please specify a component name.'));
		process.exit(1);
	} else {
		createComponent();
	}

	// create the component
	function createComponent() {
		// create the components directory if it doesn't exist
		if (!existsSync(BASE_DIR)) {
			mkdir(BASE_DIR).catch(writeFileErrorHandler);
		}

		// throw an error if the file already exists
		if (existsSync(componentDirectory)) {
			console.error(chalk.yellow(`WARNING: ${name} already exists.`));
			process.exit(1);
		}

		// create the folder
		mkdir(componentDirectory);

		// create component.tsx
		console.log(`Creating ${name}.tsx...`);
		if (pageType) {
			writeFile(`${componentDirectory}/page.tsx`, page(name)).catch(
				writeFileErrorHandler
			);

			console.log(
				`${chalk.green('page.tsx')} was created in src/app/${toCamelCase(
					name
				)}/`
			);
		} else {
			writeFile(`${componentDirectory}/${name}.tsx`, component(name)).catch(
				writeFileErrorHandler
			);

			console.log(
				`${chalk.green(`${name}.tsx`)} was created in src/components/${name}/`
			);
		}

		// create component.module.scss
		if (type !== 'page') {
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
	}

	// handle errors
	function writeFileErrorHandler(err: NodeJS.ErrnoException | null): void {
		if (err) throw err;
	}
}
