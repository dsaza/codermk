import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import { useConfig } from '@hooks'
import { getFiles } from '@lib/glob'

export async function applyPostcss(): Promise<void> {
	const { config } = useConfig()
	const files: string[] = await getFiles(`./${config.buildPath}/__compiled/*.css`)
	const plugins = [
		autoprefixer({
			overrideBrowserslist: [
				'>0.2%',
				'not dead',
				'not op_mini all'
			]
		}),
		cssnano
	]

	for (const file of files) {
		let filename = path.basename(file).replace('.css', '')
		let content = fs.readFileSync(file, 'utf8')
		let resolve = await postcss(plugins).process(content, {
			from: file,
			to: path.join(config.outDir, `./assets/css/${filename}-codermk.min.css`)
		})

		fs.writeFileSync(path.join(config.outDir, `./assets/css/${filename}-codermk.min.css`), `${resolve.css}`)
	}
}