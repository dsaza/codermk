import fs from 'fs'
import path from 'path'
import { obj_data_json, obj_json_hook } from '@types'
import { getFiles } from '@lib/glob'

async function getDataJson(): Promise<obj_data_json[]> {
	let data: obj_data_json[] = []
	let jsonFiles = await getFiles('./data/*.json')

	jsonFiles.forEach(file => {
		try {
			const json: string = fs.readFileSync(file, 'utf8')
			const filename: string = path.basename(file).replace('.json', '')

			data.push({
				file: filename,
				data: JSON.parse(json)
			})
		} catch (error) {
			data = []
		}
	})

	return data
}

export default function useJson (): obj_json_hook {
	return {
		getDataJson
	}
}
