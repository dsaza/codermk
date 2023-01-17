import fs from 'node:fs'
import path from 'node:path'
import { Tasks } from '../utils/globals.js'
import { clogWorking } from '../utils/clog.js'
import { useConfig } from '../hooks/all.js'

export default function CleanerFinal() {
	const { config } = useConfig()

	clogWorking(Tasks.cleanerFinal)
	
	fs.existsSync(path.join(config.outDir, './__compiled')) && fs.rmSync(path.join(config.outDir, './__compiled'), { recursive: true, force: true })
	fs.existsSync(path.join(config.outDir, './__templates')) && fs.rmSync(path.join(config.outDir, './__templates'), { recursive: true, force: true })
}
