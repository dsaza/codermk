let ctxErrors = {
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
	const setError = (message = '', type = '') => {
		ctxErrors[type].status = true
		ctxErrors[type].message = message
	}

	const clearError = (type = '') => {
		ctxErrors[type].status = false
		ctxErrors[type].message = ''
	}

	return {
		ctxErrors,
		setError,
		clearError
	}
}
