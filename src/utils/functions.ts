export function getParams(paramName: string) {
	const url = window.location.href

	// Create a URL object
	const urlObj = new URL(url)

	// Use URLSearchParams to get the desired query parameter
	return urlObj.searchParams.get(paramName)
}

export function formatDate(inputDate: string | Date) {
	// Create a Date object from the input string
	const date = new Date(inputDate)

	// Array of month names
	const months = [
		'Ene',
		'Feb',
		'Mar',
		'Abr',
		'May',
		'Jun',
		'Jul',
		'Ago',
		'Sep',
		'Oct',
		'Nov',
		'Dic'
	]

	// Extract the day, month, year, and time
	const day = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()
	const time = date.toTimeString().substring(0, 5)

	// Format the date
	return `${day} ${month} ${year} - ${time}`
}

export type DataItem = { [key: string]: any } // Define un tipo para los objetos del array

export function downloadCSV(arrayData: DataItem[], fileName: string = 'data.csv'): void {
	// Crear la primera fila con los nombres de las columnas
	let csvContent = 'data:text/csv;charset=utf-8,'
	const headers = Object.keys(arrayData[0])
	csvContent += headers.join(',') + '\n'

	// Agregar las filas de datos
	arrayData.forEach((item) => {
		const row = headers.map((header) => JSON.stringify(item[header], replacer)).join(',')
		csvContent += row + '\n'
	})

	function replacer(_: string, value: any): any {
		return value === null ? '' : value // Manejar los valores nulos
	}

	// Crear un elemento link para descargar el archivo
	const encodedUri = encodeURI(csvContent)
	const link = document.createElement('a')
	link.setAttribute('href', encodedUri)
	link.setAttribute('download', fileName)
	document.body.appendChild(link)
	link.click() // Simular click para descargar el archivo
	document.body.removeChild(link) // Limpiar después de la descarga
}
