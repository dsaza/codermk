import path from 'path'
import { object_hook_config, obj_config, obj_input_config } from '@types'

let config: obj_config = {
	tmpDir: '',
	rootDir: path.resolve(process.cwd()),
	buildPath: './build',
	outDir: '',
	bustcacheEnabled: false,
	port: 5000,
}

function setInputConfig(inConfig: obj_input_config): void {
	config = {
		...config,
		...inConfig
	}

	config.outDir = path.join(process.cwd(), config.buildPath)
	config.tmpDir = path.join(config.rootDir, './.codermk')
}

export default function useConfig(): object_hook_config {
	return {
		config,
		setInputConfig
	}
}
