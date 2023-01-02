import { Tasks } from '@enums'
import { obj_ctx_error } from '@types'

let ctxErrors: obj_ctx_error = {
	views: {
		status: false,
		message: '',
	},
	scripts: {
		status: false,
		message: '',
	},
	styles: {
		status: false,
		message: '',
	},
}

export default function useError() {
	const setError = (message: string, type: Tasks) => {
		if (type === Tasks.views) {
			ctxErrors.views.status = true
			ctxErrors.views.message = message
		}

		if (type === Tasks.scripts) {
			ctxErrors.scripts.status = true
			ctxErrors.scripts.message = message
		}

		if (type === Tasks.styles) {
			ctxErrors.styles.status = true
			ctxErrors.styles.message = message
		}
	}

	const clearError = (type: Tasks): void => {
		if (type === Tasks.views) {
			ctxErrors.views.status = false
			ctxErrors.views.message = ''
		}

		if (type === Tasks.scripts) {
			ctxErrors.scripts.status = false
			ctxErrors.scripts.message = ''
		}

		if (type === Tasks.styles) {
			ctxErrors.styles.status = false
			ctxErrors.styles.message = ''
		}
	}

	return {
		ctxErrors,
		setError,
		clearError
	}
}
