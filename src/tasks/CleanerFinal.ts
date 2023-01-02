import fs from 'fs'
import path from 'path'
import { Tasks } from '@enums'
import { clogWorking } from '@lib/clog'
import { useConfig } from '@hooks'

export default function CleanerFinal(): void {
	const { config } = useConfig()

	clogWorking(Tasks.cleanerFinal)
	
	fs.existsSync(path.join(config.outDir, './__compiled')) && fs.rmSync(path.join(config.outDir, './__compiled'), { recursive: true, force: true })
	fs.existsSync(path.join(config.outDir, './__templates')) && fs.rmSync(path.join(config.outDir, './__templates'), { recursive: true, force: true })
}
