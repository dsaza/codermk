import fs from 'fs'
import path from 'path'
import { compile as compileSass, SassString } from 'sass'
import { Mode, Tasks } from '@enums'
import { getFiles } from '@lib/glob'
import { useConfig, useError, useMode } from '@hooks'

function compileFiles(files: string[]): boolean {
	const { config } = useConfig()
	const { setError } = useError()
	const { mode } = useMode()

	try {
		files.forEach(file => {
			const result = compileSass(file, {
				style: 'expanded',
				sourceMap: true,
				sourceMapIncludeSources: true,
				functions: {
					'get_static_init()': function () {
						let url: string = mode === Mode.dev
							? `/`
							: `../`
						
						return new SassString(url)
					},
					'get_hex_decimal($number)': function (args) {
						let numberInput = args[0].assertNumber('number').assertNoUnits('number')
						let number: number = numberInput.value
						let hex: string = number.toString(16)
						
						return new SassString(hex)
					}
				}
			})

			let filename: string = path.basename(file).replace('.scss', '.css')
			let pathResult: string = `./__compiled/${filename}`
			let pathResultMapping: string = `./__compiled/${filename}.map`
			
			if (Mode.dev === mode) {
				fs.writeFileSync(path.join(config.tmpDir, pathResult), `${result.css}\n/*# sourceMappingURL=${filename}.map */`)
				fs.writeFileSync(path.join(config.tmpDir, pathResultMapping), JSON.stringify(result.sourceMap))
			}

			if (Mode.build === mode) {
				fs.writeFileSync(path.join(config.outDir, pathResult), result.css)
			}
		})
	
		return true
	} catch (error: any) {
		setError(error.message, Tasks.styles)
		return false
	}
}

export async function compileStyles(): Promise<void> {
	const { clearError } = useError()

	let files: string[] = await getFiles('./src/theme/styles/*.scss')
	let isCompileSass: boolean = compileFiles(files)

	if (isCompileSass) clearError(Tasks.styles)
}
