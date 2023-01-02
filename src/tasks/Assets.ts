import { Mode, Tasks } from '@enums'
import { clogWorking } from '@lib/clog'
import { copyDir } from '@compilers/fs-extra'
import { useMode } from '@hooks'

export default async function Assets(): Promise<void> { 
	const { mode } = useMode()

	clogWorking(Tasks.assets)

	if (mode === Mode.build) {
		await copyDir()
	}
}
