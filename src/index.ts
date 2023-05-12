import { program } from 'commander';
import { initProject, generateComponent } from './commands/index.js';
import figlet from 'figlet';

program
	.name('weltall')
	.description(
		'A CLI for generating React components in Next.js 13 (App Router)'
	)
	.version('0.0.1')
	.action(() => {
		console.log(figlet.textSync('Weltall CLI'));
	});

// create a new project
program
	.command('new <projectName>')
	.alias('n')
	.description('Create a new project')
	.action((projectName: string) => {
		initProject(projectName);
		console.log(figlet.textSync(`${projectName}`));
	});

// generate a new component
program
	.command('generate <name>')
	.alias('g')
	.description('Generate a new component')
	.option('-c, --component', 'Generate a component (default)')
	.option('-p, --page', 'Generate a page component')
	.action((name: string, options) => {
		const type = options.page ? 'page' : 'component';
		generateComponent(type, name);
	})
	.showHelpAfterError();

program.parse(process.argv);
