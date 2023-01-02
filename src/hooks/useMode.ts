import { Mode } from '@enums'

let mode: Mode = Mode.dev

export default function useMode() {
	return {
		mode,
		setMode: (modeApp: Mode): void => {
			mode = modeApp
		}
	}
}
