import chalk from 'chalk'
import { Mode, Tasks } from '@enums'
import { useConfig, useError, useMode } from '@hooks'
import { getTime } from './helpers'

function getError() {
	const { ctxErrors } = useError()
	
	let error = {
		status: false,
		message: ''
	}
	
	if (ctxErrors.scripts.status) {
		error.status = ctxErrors.scripts.status
		error.message = ctxErrors.scripts.message
		return error
	}

	if (ctxErrors.views.status) {
		error.status = ctxErrors.views.status
		error.message = ctxErrors.views.message
		return error
	}
	
	if (ctxErrors.styles.status) {
		error.status = ctxErrors.styles.status
		error.message = ctxErrors.styles.message
		return error
	}

	return error
}

export function clogHead(): void {
	const { mode } = useMode()

	let message = Mode.dev === mode ? 'Starting up your environment' : 'Building the web layout'
	resetConsole()
	console.log(chalk.bold.blueBright('[C/] CODERMK') + '      🤖 ' + chalk.gray(message) + '\n')
}

export function clogWorking(task: Tasks): void {
	console.log(chalk.gray(getTime()) + ' Working on... ' + getWorkingMessage(task))
}

export function clogDefault(task: Tasks): void {
	const { config } = useConfig()
	const error = getError()
	
	resetConsole()

	if (!error.status) {
		let message: string = task === Tasks.server ? 'We are ready' : 'Everything is going great'
		let icon: string = task === Tasks.server ? '⭐' : '✅'

		console.log(chalk.bold.blueBright('[C/] CODERMK') + `      ${icon} ` + chalk.gray(message))
		console.log(chalk.bold.white('\nYour development server: ') + chalk.cyan(`http://localhost:${config.port}`))

		task === Tasks.server 
			? console.log('\n' + chalk.gray(getTime()) + ' The development server is ready to listen to your changes')
			: console.log('\n' + chalk.gray(getTime()) + ' The last changes were from... ' + getWorkingMessage(task))
		
	} else {
		console.log(chalk.bold.blueBright('[C/] CODERMK') + '      ❌ ' + chalk.gray('Have something to correct'))
		console.log(chalk.bold.red('\nAn error has occurred\n'))
		console.log(chalk.red(error.message))
	}

	console.log('')
}

function resetConsole(): void {
	process.stdout.write('\x1Bc')
	console.log('')
}

function getWorkingMessage(task: Tasks): string {
	let messages: any = {
		[Tasks.cleaner]: chalk.white('Clean environment space'),
		[Tasks.cleanerFinal]: chalk.white('Clean final build'),
		[Tasks.views]: chalk.green('Twig templates'),
		[Tasks.viewsPretty]: chalk.green('Twig to HTML beautiful'),
		[Tasks.scripts]: chalk.yellow('Javascript files'),
		[Tasks.scriptsMinify]: chalk.yellow('Minify javascript files'),
		[Tasks.styles]: chalk.magenta('Sass (scss) files'),
		[Tasks.stylesFull]: chalk.magenta('Post processing css'),
		[Tasks.server]: chalk.blue('Setting up development server'),
		[Tasks.assets]: chalk.blue('Copy assets'),
	}

	return messages.hasOwnProperty(task) ? messages[task] : ''
}
