import path from 'path'
import { obj_data_json } from '@types'

export function rdir(dir: string): string {
	return dir.replaceAll(path.sep, '/')
}

export function arrayJsonFilesToObject(collection: obj_data_json[]): object {
  const result: any = {}
	
	collection.forEach(item => {
		result[item.file] = item.data
	})

  return result
}

export function getTime(): string {
	let currentTime: Date = new Date()
	let hour: number = currentTime.getHours()
	let minutes: number = currentTime.getMinutes()
	let seconds: number = currentTime.getSeconds()
	
	let ampm: string
	let hourPrint: string
	let minutesPrint: string
	let secondsPrint: string

	ampm = hour > 11 ? 'p.m.' : 'a.m.'

	hour = hour > 12 ? hour - 12 : hour

	hourPrint = hour > 9 ? `${hour}` : `0${hour}` 
	minutesPrint = minutes > 9 ? `${minutes}` : `0${minutes}` 
	secondsPrint = seconds > 9 ? `${seconds}` : `0${seconds}` 

	return `[${hourPrint}:${minutesPrint}:${secondsPrint} ${ampm}]`
}
