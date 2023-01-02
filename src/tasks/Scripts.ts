import { Mode, Tasks } from '@enums'
import { compileScripts } from '@compilers/esbuild'
import { watchFiles } from '@lib/glob'
import { clogDefault, clogWorking } from '@lib/clog'
import { useMode } from '@hooks'

export default async function Scripts(): Promise<void> {
	const { mode } = useMode()
	const watchesFiles: string[] = ['./src/application/**/*.js', './data/*.json']

	clogWorking(Tasks.scripts)
	await compileScripts()

	if (mode === Mode.dev) {
		watchFiles(watchesFiles, async (done: Function) => {
			await compileScripts()	
			clogDefault(Tasks.scripts)
			done()
		})
	}
}
