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
