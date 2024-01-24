import type { InflatableOrder } from '../types/inflatable'

const PLAN_NAME: { [key: string]: string } = {
	basico: 'BÁSICO',
	'super-hop': 'SUPER HOP',
	custom: 'CUSTOM'
}

export const openWhatsapp = (order: InflatableOrder, plan: string) => {
	const planName = encodeURIComponent(`*PAQUETE - ${PLAN_NAME[plan || 'basico']}*\n`)
	let message = `https://wa.me/7731718702?text=${planName}`

	const URL_DATA = {
		'Inflable:': order.inflatable || 'sin especificar',
		'Snack:':
			order.snack === 'Otro'
				? order.customSnack || 'sin especificar'
				: order.snack || 'sin especificar',
		'Invitación:':
			order.inviteType === 'Otro'
				? `tematica - ${order.theme || 'sin especificar'}`
				: order.inviteType || 'sin especificar',
		'Tipo de evento:':
			order.eventType === 'Cumpleaños'
				? `cumpleaños ${order.birthdayNumber || ''}`
				: order.eventType || 'sin especificar',
		[`${order.eventType === 'Cumpleaños' ? 'Festejad@' : 'Nombre del evento'}:`]:
			order.eventName || 'sin especificar',
		'Whatsapp de contacto:': order.whatsapp || 'sin especificar',
		'Fecha y hora:': order.dateTime || 'sin especificar',
		'Dirección en maps:': order.address || 'sin especificar'
	}

	const textParam = Object.entries(URL_DATA)
		.map(
			([key, value]) =>
				`%0A*${encodeURIComponent(key)}*%0A${encodeURIComponent(
					key.includes('PAQUETE') ? value : value.toLowerCase()
				)}`
		)
		.join('%0A')

	window.open(`${message}${textParam}`, '_blank')
}
