import { renderTemplate } from '@compilers/nunjucks'
import { Mode, Tasks } from '@enums'
import { watchFiles } from '@lib/glob'
import { clogDefault, clogWorking } from '@lib/clog'
import { useMode } from '@hooks'

export default async function Views(): Promise<void> { 
	const { mode } = useMode()
	const watchesFiles: string[] = ['./src/views/**/*.twig', './data/*.json']

	clogWorking(Tasks.views)
	await renderTemplate()

	if (mode === Mode.dev) {
		watchFiles(watchesFiles, async (done: Function) => {
			await renderTemplate()
			clogDefault(Tasks.views)
			done()
		})
	}
}