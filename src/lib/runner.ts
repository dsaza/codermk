export function series(...tasks: Function[]) {
	tasks.forEach(task => task())
}

export async function parallel(...tasks: Function[]): Promise<void> {
	await Promise.all(tasks.map((task): Promise<void> => task()))
}
