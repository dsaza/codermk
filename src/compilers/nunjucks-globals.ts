import { Mode } from '@enums'
import { obj_data_json } from '@types'
import { arrayJsonFilesToObject } from '@lib/helpers'
import { useConfig, useMode } from '@hooks'

export function getEnvGlobals(data: obj_data_json[]): any {
	const { config } = useConfig()
	const { mode } = useMode()

	let hashNow: number = Date.now()
	let hrefCacheBust: Function = (path: string): string => config.bustcacheEnabled ? `${path}?t=${hashNow}` : path
	let dataJson: object = arrayJsonFilesToObject(data)

	return {
		/**
		 * Data JSON
		 */
		__mkdata: dataJson,

		/**
		 * Functions to get the mode run
		 * @returns Mode
		 */
		isDev: () => mode === Mode.dev,
		isBuild: () => mode === Mode.build,

		/**
		 * Function to set a static path
		 * @param dir string
		 * @returns	string 
		 */
		static: (dir: string): string => mode === Mode.build
			? hrefCacheBust(`./assets/${dir}`)
			: `/${dir}`,
		
		/**
		 * Function to set a scss compiled path
		 * @param file string: The filename scss to compile
		 * @returns string
		 */
		style: (file: string) => mode === Mode.build
			? hrefCacheBust(`./assets/css/${file.trim().replace('.scss', '-codermk.min.css')}`)
			: `/__compiled/${file.trim().replace('.scss', '.css')}`,
		
		/**
		 * Function to set a js compiled path
		 * @param file string: The filename js to compile
		 * @returns string
		 */
		module: (file: string) => mode === Mode.build
			? hrefCacheBust(`./assets/js/${file.trim().replace('.js', '-codermk.min.js')}`)
			: `/__compiled/${file.trim()}`,
		
		/**
		 * Function to set a page compiled
		 * @param page string: The page
		 * @param restURL string: Add parameters or hashes
		 * @returns string
		 */
		page: (page: string, restURL: string) => {
			if (page === '.') {
				return mode === Mode.build
					? `./${typeof restURL === 'string' ? restURL.trim() : ''}`
					: `/${typeof restURL === 'string' ? restURL.trim() : ''}`
			}

			return mode === Mode.build
				? `./${page}.html${typeof restURL === 'string' ? restURL.trim() : ''}`
				: `/${page}.html${typeof restURL === 'string' ? restURL.trim() : ''}`
		},
	}
}