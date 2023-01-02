import { Mode, Tasks } from '@enums'
import { clogWorking } from '@lib/clog'
import { prettyHTML } from '@compilers/pretty'
import { useMode } from '@hooks'

export default async function ViewsPretty(): Promise<void> { 
	const { mode } = useMode()

	clogWorking(Tasks.viewsPretty)

	if (mode === Mode.build) {
		await prettyHTML()
	}
}
