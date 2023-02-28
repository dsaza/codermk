import fs from 'node:fs'
import path from 'node:path'
import postcss from 'postcss'
import cssnano from 'cssnano'
import atImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import { useConfig } from '../hooks/all.js'
import { getFiles } from '../utils/globs.js'

export async function applyPostcss() {
	const { config } = useConfig()
	const files = await getFiles(`./${config.buildPath}/assets/__compiled/*.css`)
	const plugins = [
		atImport(),
		autoprefixer({
			overrideBrowserslist: [
				'>0.2%',
				'not dead',
				'not op_mini all'
			]
		}),
		cssnano(),
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