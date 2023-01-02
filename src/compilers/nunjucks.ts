import fs from 'fs'
import path from 'path'
import nunjucks from 'nunjucks'
import { getEnvGlobals } from './nunjucks-globals'

import { Dirp, Mode, Tasks } from '@enums'
import { obj_data_json } from '@types'
import { rdir } from '@lib/helpers'
import { getFiles } from '@lib/glob'
import { useConfig, useError, useJson, useMode } from '@hooks'

const envTemplate = nunjucks.configure({
	noCache: true,
	autoescape: true
})

async function removePrevTemplates(prevFiles: string[]): Promise<void> {
	const { config } = useConfig()
	
	let entryFiles: string[] = prevFiles.map(file => {
		let extname = path.basename(file).replace('.twig', '.html')
		return rdir(path.join(config.tmpDir, `./${extname}`))
	})

	let currentFiles: string[] = await getFiles('./*.html', Dirp.tmp)	
	currentFiles.forEach(file => !entryFiles.includes(file) && fs.rmSync(file, { recursive: true, force: true }))
}

function setGlobals(data: obj_data_json[]): void {
	let globals: any = getEnvGlobals(data)
	
	Object.keys(globals).forEach(key => {
		envTemplate.addGlobal(key, globals[key])
	})
}

function renderFile(file: string): Promise<boolean> {
	const { setError } = useError()
	const { config } = useConfig()
	const { mode } = useMode()

	return new Promise(resolve => {
		nunjucks.render(file, (error: Error, res: string) => {
			let filename: string
	
			if (error) {
				setError(error.message, Tasks.views)
				resolve(false)
				return
			}
	
			filename = path.basename(file).replace('.twig', '.html')

			if (Mode.dev === mode) fs.writeFileSync(path.join(config.tmpDir, `./${filename}`), res)
			if (Mode.build === mode) fs.writeFileSync(path.join(config.outDir, `./__templates/${filename}`), res)
			
			resolve(true)
		})
	})
}

async function runRender(files: string[]): Promise<boolean> {
	let errors: number = 0

	for (const file of files) {
		let isRenderFile: boolean = await renderFile(file)
		if (!isRenderFile) errors++
	}

	return errors < 1
}

export async function renderTemplate(): Promise<void> {
	const { clearError } = useError()
	const { getDataJson } = useJson()

	const files: string[] = await getFiles('./src/views/pages/**/*.twig')
	const data: obj_data_json[] = await getDataJson()

	let renderTemplateFiles: boolean
	
	await removePrevTemplates(files)
	setGlobals(data)
	
	renderTemplateFiles = await runRender(files)
	if (renderTemplateFiles) clearError(Tasks.views)
}
