import path from 'node:path'
import glob from 'glob'
import watch from 'glob-watcher'
import { Dirp } from './globals.js'
import { rdir } from '../utils/helpers.js'
import { useConfig } from '../hooks/all.js'

export async function getFiles(pattern = '', initPath = Dirp.root) {
	const { config } = useConfig()
	let pathFiles = config.rootDir

	if (initPath === Dirp.tmp) pathFiles = config.tmpDir

	return new Promise(resolve => {
		glob(rdir(path.join(pathFiles, pattern)), (err, files) => {
			if (err) resolve([])
			resolve(files)
		})
	})
}

export function watchFiles(patterns = [], callback = () => {}) {
	const { config } = useConfig()
	let patternsJoin = patterns.map(pattern => rdir(path.join(config.rootDir, pattern)))

	watch(patternsJoin, done => {
		callback(done)
	})
}
