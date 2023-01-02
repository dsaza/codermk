import path from 'path'
import glob from 'glob'
import watch from 'glob-watcher'
import { Dirp } from '@enums'
import { rdir } from '@lib/helpers'
import { useConfig } from '@hooks'

export async function getFiles(pattern: string, initPath = Dirp.root): Promise<string[]> {
	const { config } = useConfig()
	let pathFiles: string = config.rootDir

	if (initPath === Dirp.tmp) pathFiles = config.tmpDir

	return new Promise(resolve => {
		glob(rdir(path.join(pathFiles, pattern)), (err, files) => {
			if (err) resolve([])
			resolve(files)
		})
	})
}

export function watchFiles(patterns: string[], callback: Function) {
	const { config } = useConfig()
	let patternsJoin: string[] = patterns.map(pattern => rdir(path.join(config.rootDir, pattern)))

	watch(patternsJoin, done => {
		callback(done)
	})
}
