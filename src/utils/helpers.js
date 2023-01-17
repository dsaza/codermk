import path from 'node:path'

export function rdir(dir = '') {
	return dir.replaceAll(path.sep, '/')
}

export function arrayJsonFilesToObject(collection = []) {
	const result = {}

	collection.forEach(item => {
		result[item.file] = item.data
	})

	return result
}

export function getTime() {
	let currentTime = new Date()
	let hour = currentTime.getHours()
	let minutes = currentTime.getMinutes()
	let seconds = currentTime.getSeconds()
	
	let ampm
	let hourPrint
	let minutesPrint
	let secondsPrint

	ampm = hour > 11 ? 'p.m.' : 'a.m.'

	hour = hour > 12 ? hour - 12 : hour

	hourPrint = hour > 9 ? `${hour}` : `0${hour}` 
	minutesPrint = minutes > 9 ? `${minutes}` : `0${minutes}` 
	secondsPrint = seconds > 9 ? `${seconds}` : `0${seconds}` 

	return `[${hourPrint}:${minutesPrint}:${secondsPrint} ${ampm}]`
}
