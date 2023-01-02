import { Mode } from '@enums'
import { obj_input_config } from '@types'
import { parallel, series } from '@lib/runner'
import { clogHead } from '@lib/clog'
import { useMode, useConfig } from '@hooks'

import Cleaner from '@tasks/Cleaner'
import Views from '@tasks/Views'
import Scripts from '@tasks/Scripts'
import Styles from '@tasks/Styles'
import Server from '@tasks/Server'
import ViewsPretty from '@tasks/ViewsPretty'
import ScriptsMinify from '@tasks/ScriptsMinify'
import StylesFull from '@tasks/StylesFull'
import Assets from '@tasks/Assets'
import CleanerFinal from '@tasks/CleanerFinal'

export async function bootstrap(mode: Mode, config: obj_input_config) {
	const { setMode } = useMode()
	const { setInputConfig } = useConfig()
	
	setMode(mode)
	setInputConfig(config)

	clogHead()

	if (mode === Mode.dev) {
		series(Cleaner)
		await parallel(Views, Scripts, Styles)
		series(Server)
	}

	if (mode === Mode.build) {
		series(Cleaner)
		await parallel(Views)
		await parallel(Scripts)
		await parallel(Styles)
		await parallel(ViewsPretty)
		await parallel(ScriptsMinify)
		await parallel(StylesFull)
		await parallel(Assets)
		series(CleanerFinal)
	}
}
