import { atom } from 'nanostores'
import type { InflatableOrder } from '../types/inflatable'

export const initialOrderData: InflatableOrder = {
	inflatable: '',
	inviteType: '',
	birthdayNumber: '',
	eventType: '',
	eventName: '',
	whatsapp: '',
	dateTime: '',
	address: '',
	theme: '',
	snack: '',
	customSnack: ''
}

export const $inflatableOrder = atom<InflatableOrder>(initialOrderData)

export function updateOrder(order: InflatableOrder) {
	$inflatableOrder.set(order)
}
