import { useConfig } from '@hooks'
import fse from 'fs-extra'
import path from 'path'

export function copyDir(): Promise<void> {
	const { config } = useConfig()
	let source = path.join(config.rootDir, './static')
	let destination = path.join(config.outDir, './assets')

	return new Promise(resolve => {
		fse.copy(source, destination, function (err) {
			if (err){
				resolve()
				return
			}
			
			resolve()
	});
	})
}
