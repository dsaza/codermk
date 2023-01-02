import fs from 'fs'
import path from 'path'
import { minify } from 'terser'
import { useConfig } from '@hooks'
import { getFiles } from '@lib/glob'

export async function compressScripts(): Promise<void> {
	const { config } = useConfig()
	const files: string[] = await getFiles(`./${config.buildPath}/__compiled/*.js`)
	
	for (const file of files) {
		let content = fs.readFileSync(file, 'utf8')
		let resolve = await minify(content)
		let filename = path.basename(file).replace('.js', '')

		fs.writeFileSync(path.join(config.outDir, `./assets/js/${filename}-codermk.min.js`), `${resolve.code}`)
	}
}
