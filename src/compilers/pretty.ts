import fs from 'fs'
import path from 'path'
import pretty from 'pretty'
import { getFiles } from '@lib/glob'
import { useConfig } from '@hooks'

export async function prettyHTML(): Promise<void> {
	const { config } = useConfig()
	const files: string[] = await getFiles(`./${config.buildPath}/__templates/*.html`)
	
	files.forEach(file => {
		let content = fs.readFileSync(file, 'utf8')
		let resolve = pretty(content, { ocd: true })
		let filename = path.basename(file)

		fs.writeFileSync(path.join(config.outDir, `./${filename}`), resolve)
	})
}
