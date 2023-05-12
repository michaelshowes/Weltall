import { toCamelCase, toPascalCase } from '../utils/index.js';
import { component, scss } from '../templates/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import chalk from 'chalk';
export function generateComponent(type, input) {
    // const [input] = process.argv.slice(2); // get the component name from the command line
    const name = toPascalCase(input);
    const COMPONENTS_DIR = './src/components';
    const componentDirectory = `${COMPONENTS_DIR}/${name}/`;
    // throw an error if no component name is specified
    if (!name) {
        console.error(chalk.yellow('Please specify a component name.'));
        process.exit(1);
        // create the components directory if it doesn't exist
    }
    else if (!existsSync(COMPONENTS_DIR)) {
        console.log(chalk.yellow('Components directory does not exist! Creating components directory...'));
        mkdir(COMPONENTS_DIR).catch(writeFileErrorHandler);
        console.log('Components directory was created.');
        createComponent();
    }
    else {
        createComponent();
    }
    // create the component
    function createComponent() {
        // throw an error if the file already exists
        if (existsSync(componentDirectory)) {
            console.error(chalk.yellow(`WARNING: ${name} already exists.`));
            process.exit(1);
        }
        // create the folder
        mkdir(componentDirectory);
        // create component.tsx
        console.log(`Creating ${name}.tsx...`);
        writeFile(`${componentDirectory}/${name}.tsx`, component(name)).catch(writeFileErrorHandler);
        console.log(`${chalk.green(`${name}.tsx`)} was created in src/components/`);
        // create component.module.scss
        console.log(`Creating ${toCamelCase(name)}.module.scss...`);
        writeFile(`${componentDirectory}/${toCamelCase(name)}.module.scss`, scss(name)).catch(writeFileErrorHandler);
        console.log(`${chalk.green(`${toCamelCase(name)}.module.scss`)} was created in src/components/`);
    }
    // handle errors
    function writeFileErrorHandler(err) {
        if (err)
            throw err;
    }
}
generateComponent('component', 'test');
