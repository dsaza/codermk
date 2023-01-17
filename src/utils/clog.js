import pc from 'picocolors'
import emoji from 'node-emoji'
import { Mode, Tasks } from '../utils/globals.js'
import { useConfig, useError, useMode } from '../hooks/all.js'
import { getTime } from './helpers.js'

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

export function clogHead() {
	const { mode } = useMode()

	let message = Mode.dev === mode ? 'Starting up your environment' : 'Building the web layout'
	resetConsole()

	const iconRobot = emoji.get('robot_face')
	console.log(pc.bold(pc.blue('[C/] CODERMK')) + `      ${iconRobot} ` + pc.gray(message) + '\n')
}

export function clogWorking(task) {
	console.log(pc.gray(getTime()) + ' Working on... ' + getWorkingMessage(task))
}

export function clogDefault(task) {
	const { config } = useConfig()
	const error = getError()
	
	resetConsole()

	if (!error.status) {
		let message = task === Tasks.server ? 'We are ready' : 'Everything is going great'
		let icon = task === Tasks.server ? emoji.get('star') : emoji.get('white_check_mark')

		console.log(pc.bold(pc.blue('[C/] CODERMK')) + `      ${icon} ` + pc.gray(message))
		console.log(pc.bold(pc.white('\nYour development server: ')) + pc.cyan(`http://localhost:${config.port}`))

		task === Tasks.server 
			? console.log('\n' + pc.gray(getTime()) + ' The development server is ready to listen to your changes')
			: console.log('\n' + pc.gray(getTime()) + ' The last changes were from... ' + getWorkingMessage(task))
		
	} else {
		const iconError = emoji.get('x')

		console.log(pc.bold(pc.blue('[C/] CODERMK')) + `      ${iconError} ` + pc.gray('Have something to correct'))
		console.log(pc.bold(pc.red('\nAn error has occurred\n')))
		console.log(pc.red(error.message))
	}

	console.log('')
}

function resetConsole() {
	process.stdout.write('\x1Bc')
	console.log('')
}

function getWorkingMessage(task) {
	let messages = {
		[Tasks.cleaner]: pc.white('Clean environment space'),
		[Tasks.cleanerFinal]: pc.white('Clean final'),
		[Tasks.views]: pc.green('Twig templates'),
		[Tasks.viewsPretty]: pc.green('Twig to HTML beautiful'),
		[Tasks.scripts]: pc.yellow('Javascript files'),
		[Tasks.scriptsMinify]: pc.yellow('Minify javascript files'),
		[Tasks.styles]: pc.magenta('Sass (scss) files'),
		[Tasks.stylesFull]: pc.magenta('Post processing css'),
		[Tasks.server]: pc.blue('Setting up development server'),
		[Tasks.assets]: pc.blue('Copy assets'),
	}

	return messages.hasOwnProperty(task) ? messages[task] : ''
}
