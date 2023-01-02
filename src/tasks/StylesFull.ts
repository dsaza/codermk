import { Mode, Tasks } from '@enums'
import { clogWorking } from '@lib/clog'
import { applyPostcss } from '@compilers/postcss'
import { useMode } from '@hooks'

export default async function StylesFull(): Promise<void> { 
	const { mode } = useMode()

	clogWorking(Tasks.stylesFull)

	if (mode === Mode.build) {
		await applyPostcss()
	}
}
