import path from 'path'
import esbuild from 'esbuild'
import { obj_data_json } from '@types'
import { Mode, Tasks } from '@enums'
import { getFiles } from '@lib/glob'
import { arrayJsonFilesToObject } from '@lib/helpers'
import { useError, useConfig, useMode, useJson } from '@hooks'

function transfromScripts(files: string[], data: obj_data_json[]): boolean {
	const { config } = useConfig()
	const { setError } = useError()
	const { mode } = useMode()

	let dataJson: object = arrayJsonFilesToObject(data)
	let outDir = Mode.build === mode ? path.join(config.outDir, './__compiled') : path.join(config.tmpDir, './__compiled')

	try {
		esbuild.buildSync({
			bundle: true,
			entryPoints: files,
			minify: false,
			outdir: outDir,
			sourcemap: mode === Mode.dev,
			target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
			define: {
				__mkdata: JSON.stringify(dataJson)
			}
		})
	
		return true
	} catch (error: any) {
		setError(error.message, Tasks.scripts)
		return false
	}
}

export async function compileScripts(): Promise<void> {
	const { clearError } = useError()
	const { getDataJson } = useJson()
	
	let files: string[] = await getFiles('./src/application/modules/*.js')
	let data: obj_data_json[] = await getDataJson()
	
	let isTransformScript: boolean = transfromScripts(files, data)

	if (isTransformScript) clearError(Tasks.scripts)
}
