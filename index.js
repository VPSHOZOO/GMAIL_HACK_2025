#!/usr/bin/env node
const { Command } = require('commander');
const axios = require('axios');
const packageJson = require('./package.json');
const BANNER = `
	██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗       ███████╗███╗   ███╗ █████╗ ██╗██╗     ███████╗
	██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗      ██╔════╝████╗ ████║██╔══██╗██║██║     ██╔════╝
	███████║███████║██║     █████╔╝ █████╗  ██║  ██║█████╗█████╗  ██╔████╔██║███████║██║██║     ███████╗
	██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██║  ██║╚════╝██╔══╝  ██║╚██╔╝██║██╔══██║██║██║     ╚════██║
	██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██████╔╝      ███████╗██║ ╚═╝ ██║██║  ██║██║███████╗███████║
	╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝       ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
	 
Hacked Emails Command Line Tool
Version: ${packageJson.version}
`;

async function checkEmail(email) {
    try {
        const response = await axios.get(`https://hacked-emails.com/api?q=${encodeURIComponent(email)}`);
        return response.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
    }
}
function formatResponse(response) {
    let result = `${response.query} email ${response.status} in ${response.results} results\n`;
    
    if (response.data && response.data.length > 0) {
        response.data.forEach(entry => {
            result += `\n${entry.title} : Leaked Date (${entry.date_leaked})\n <${entry.details}>\n`;
        });
    }
    
    return result;
}
function usageAndExit(message, exitCode) {
    if (message) {
        console.error(message);
        console.error('\n');
    }
    console.log(BANNER);
    process.exit(exitCode);
}
async function main() {
    const program = new Command();
    program
        .name('hacked-emails')
        .version(packageJson.version)
        .arguments('<email>')
        .description('Check if an email has been compromised in data breaches', {
            email: 'Email address to check'
        })
        .action(async (email) => {
            try {
                const response = await checkEmail(email);
                console.log(formatResponse(response));
            } catch (error) {
                console.error(`Error: ${error.message}`);
                process.exit(1);
            }
        })
        .addHelpText('before', BANNER);    
    program.parse(process.argv);
    
    if (!process.argv.slice(2).length) {
        usageAndExit('Pass an email address: email@domain.com', 1);
    }
}
main().catch(console.error);
