export type obj_config = {
	tmpDir: string,
	rootDir: string,
	buildPath: string,
	outDir: string,
	bustcacheEnabled: boolean,
	port: number,
}

export type obj_input_config = {
	bustcacheEnabled?: boolean,
	port?: number,
	buildPath?: string,
}

export type object_hook_config = {
	config: obj_config,
	setInputConfig: (_config: obj_input_config) => void
}

export type obj_error = {
	status: boolean,
	message: string
}

// export type obj_hook_error = {
// 	error: obj_error,
// 	setError: (message: string) => void,
// 	clearError: () => void
// }

export type obj_ctx_error = {
	views: obj_error,
	scripts: obj_error,
	styles: obj_error,
}

export type obj_data_json = {
	file: string,
	data: object
}

export type obj_json_hook = {
	getDataJson: () => Promise<obj_data_json[]>
}
