import path from 'path'
import { Mode } from '@enums'
import { bootstrap } from './bootstrap'

async function main() {
	let config = await import(path.join(process.cwd(), './codermk.config'))
	let mode = process.argv[2]
	
	if (mode === Mode.dev) bootstrap(Mode.dev, config.default)
	if (mode === Mode.build) bootstrap(Mode.build, config.default)
}

main()
