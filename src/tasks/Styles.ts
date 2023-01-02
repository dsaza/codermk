import { Mode, Tasks } from '@enums'
import { compileStyles } from '@compilers/sass'
import { watchFiles } from '@lib/glob'
import { clogDefault, clogWorking } from '@lib/clog'
import { useMode } from '@hooks'

export default async function Styles(): Promise<void> {
	const { mode } = useMode()
	const watchesFiles: string[] = ['./src/theme/**/*.scss']
	
	clogWorking(Tasks.styles)
	await compileStyles()

	if (mode === Mode.dev) {
		watchFiles(watchesFiles, async (done: Function) => {
			await compileStyles()	
			clogDefault(Tasks.styles)
			done()
		})
	}
}
