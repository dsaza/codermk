import { Mode, Tasks } from '@enums'
import { clogWorking } from '@lib/clog'
import { compressScripts } from '@compilers/terser'
import { useMode } from '@hooks'

export default async function ScriptsMinify(): Promise<void> { 
	const { mode } = useMode()

	clogWorking(Tasks.scriptsMinify)

	if (mode === Mode.build) {
		await compressScripts()
	}
}
