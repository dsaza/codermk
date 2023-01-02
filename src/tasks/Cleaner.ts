import fs from 'fs'
import path from 'path'
import { Mode, Tasks } from '@enums'
import { clogWorking } from '@lib/clog'
import { useConfig, useMode } from '@hooks'

export default function Cleaner(): void {
	const { config } = useConfig()
	const { mode } = useMode()

	const resetFolder = (path: string) => {
		fs.existsSync(path) && fs.rmSync(path, { recursive: true, force: true })
		fs.mkdirSync(path)
	}

	clogWorking(Tasks.cleaner)
	
	if (mode === Mode.dev) {
		resetFolder(config.tmpDir)
		fs.mkdirSync(path.join(config.tmpDir, './__compiled'))
	}
	
	if (mode === Mode.build) {
		resetFolder(config.outDir)
		fs.existsSync(config.tmpDir) && fs.rmSync(config.tmpDir, { recursive: true, force: true })
		fs.mkdirSync(path.join(config.outDir, './assets'))
		fs.mkdirSync(path.join(config.outDir, './assets/css'))
		fs.mkdirSync(path.join(config.outDir, './assets/js'))
		fs.mkdirSync(path.join(config.outDir, './__compiled'))
		fs.mkdirSync(path.join(config.outDir, './__templates'))
	}
}
