import path from 'path'
import browserSync from 'browser-sync'
import { Tasks } from '@enums'
import { clogDefault, clogWorking } from '@lib/clog'
import { useConfig } from '@hooks'

export default function Server(): void {
	const { config } = useConfig()
	const bs = browserSync.create()

	clogWorking(Tasks.server)
	
	bs.init({
		server: [path.join(config.rootDir, './static'), config.tmpDir],
		logLevel: 'silent',
		notify: false,
		watch: true,
		open: false,
		port: config.port
	})

	clogDefault(Tasks.server)
}
