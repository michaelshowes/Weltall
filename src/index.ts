#!/usr/bin/env node

import { program } from 'commander';
import { initProject, generateComponent } from './commands/index.js';
import figlet from 'figlet';

program
	.name('weltall')
	.description(
		'A CLI for generating React components in Next.js 13 (App Router)'
	)
	.version('1.1')
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
	.action((name: string) => {
		generateComponent(name);
	})
	.showHelpAfterError();

program.parse(process.argv);
