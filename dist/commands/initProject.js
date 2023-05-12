import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';
// Colors
const blue = chalk.blue, dim = chalk.dim, boldGreen = chalk.bold.green, boldCyan = chalk.bold.cyan;
export function initProject(projectName) {
    const projectDir = path.resolve(projectName);
    // Clones project from Github
    console.log('\n' +
        blue('[weltall] ') +
        dim('[1/3]') +
        ' \uD83C\uDFD7  Creating ' +
        projectName +
        ' project...\n');
    execSync(`git clone --branch main --depth 1 https://github.com/michaelshowes/nextjs-basic.git ${projectName}`);
    // Deletes existing git repository
    fs.removeSync(path.join(projectDir, '.git'));
    // Initializes a new git repository with a main branch
    execSync(`cd ${projectDir} && git init -b main`);
    // Edits package.json to include the project name
    const packageJson = fs.readJsonSync(path.join(projectDir, 'package.json'));
    packageJson.name = projectName;
    fs.writeJsonSync(path.join(projectDir, 'package.json'), packageJson, {
        spaces: 2
    });
    // Installs dependencies
    console.log('\n' +
        blue('[weltall] ') +
        dim('[2/3]') +
        ' \uD83D\uDCE6  Installing dependencies...\n');
    execSync(`cd ${projectDir} && yarn install`);
    // Creates initial commit and staging/development branches
    console.log('\n' +
        blue('[weltall] ') +
        dim('[3/3]') +
        ' \uD83D\uDCE6  Creating initial git commit and branches...\n');
    execSync(`cd ${projectDir} && git add . && git commit -m "initial commit" && git checkout -b staging && git checkout -b development`);
    // Success message
    console.log('\n' +
        blue('[weltall] ') +
        '\uD83D\uDCAF  ' +
        boldGreen('Success! ') +
        projectName +
        ' project created in ' +
        boldCyan(projectDir) +
        '!\n');
    console.log(blue('[weltall] ') + '\uD83E\uDD18  Done in ' + process.uptime() + 's.\n');
}
