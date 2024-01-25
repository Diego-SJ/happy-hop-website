import { useState } from 'react'
import Radio from './Radio'
import Input from './Input'
import TextArea from './TextArea'
import type { InflatableOrder } from '../types/inflatable'
import { initialOrderData, updateOrder } from '../store/inflatable-order'
import { getParams } from '../utils/functions'

type Target = (EventTarget & HTMLInputElement) | (EventTarget & HTMLTextAreaElement)

const handleData = (prev: InflatableOrder, target: Target) => {
	const newData = { ...prev, [target.name]: target.value }
	updateOrder(newData)
	return newData
}

const OrderForm = () => {
	const [formData, setFormData] = useState(initialOrderData)
	const plan = getParams('plan')

	const handleChange = (target: Target) => {
		setFormData((prev) => handleData(prev, target))
	}

	return (
		<>
			<h2 className="text-2xl font-bold mb-2">Finaliza tu pedido</h2>
			<div className="mb-10">
				<h5 className="text-base font-medium text-slate-600 mb-4">Selecciona un inflable</h5>
				<ul className="grid w-full gap-3 md:grid-cols-2">
					<li>
						<Radio
							id="inflatable-party"
							name="inflatable"
							value="Party time"
							title="Party time"
							subtitle="Medidas: 6m x 4m"
							checked={formData.inflatable === 'Party time'}
							onChange={handleChange}
						/>
					</li>
					<li>
						<Radio
							id="inflatable-mickey"
							name="inflatable"
							value="Micky club"
							title="Micky club"
							subtitle="Medidas: 4m x 4m"
							checked={formData.inflatable === 'Micky club'}
							onChange={handleChange}
						/>
					</li>
				</ul>
			</div>
			<div className={`mb-10 ${plan === 'basico' ? 'hidden' : ''}`}>
				<h5 className="text-base font-medium text-slate-600 mb-4">Selecciona tu snack favorito</h5>
				<ul className="grid w-full gap-3 md:grid-cols-2">
					<li>
						<Radio
							id="snack-popsicle"
							name="snack"
							value="100 paletas de hielo"
							title="100 paletas de hielo"
							subtitle="Tú eliges los sabores"
							checked={formData.snack === '100 paletas de hielo'}
							onChange={handleChange}
						/>
					</li>
					<li>
						<Radio
							id="snack-ice-cream"
							name="snack"
							value="5 litros de helado"
							title="5 litros de helado"
							subtitle="Tú eliges el sabor (incluye 100 barquillos)"
							checked={formData.snack === '5 litros de helado'}
							onChange={handleChange}
						/>
					</li>
					<li className={`${plan !== 'custom' ? 'hidden' : ''}`}>
						<Radio
							id="snack-nothing"
							name="snack"
							value="Ninguno"
							title="Ninguno"
							subtitle="No incluir snack"
							checked={formData.snack === 'Ninguno'}
							onChange={handleChange}
						/>
					</li>
					<li className={`${plan !== 'custom' ? 'hidden' : ''}`}>
						<Radio
							id="snack-other"
							name="snack"
							value="Otro"
							title="Otro"
							subtitle="¡Describe la cantidad de helados y/o paletas que necesitas!"
							checked={formData.snack?.includes('Otro')}
							onChange={handleChange}
						/>
					</li>
				</ul>
				<TextArea
					name="customSnack"
					value={formData.customSnack}
					className={`mt-2 ${formData.snack !== 'Otro' ? 'hidden' : ''}`}
					placeholder="Dinos que necesitas y nosotros nos encargamos"
					onChange={handleChange}
				/>
			</div>
			<div className="mb-10">
				<h5 className="text-base font-medium text-slate-600 mb-4">Selecciona una invitacion</h5>
				<ul className="grid w-full gap-3 md:grid-cols-2">
					<li>
						<Radio
							id="invite-nothing"
							name="inviteType"
							value="Ninguna"
							title="Ninguna"
							subtitle="No incluir invitación"
							checked={formData.inviteType === 'Ninguna'}
							onChange={handleChange}
						/>
					</li>
					<li>
						<Radio
							id="invite-party-time"
							name="inviteType"
							value="Party time"
							title="Party time"
							subtitle="Ver demo"
							checked={formData.inviteType === 'Party time'}
							onChange={handleChange}
						/>
					</li>
					<li>
						<Radio
							id="invite-formal"
							name="inviteType"
							value="Golden blue"
							title="Golden blue"
							subtitle="Ver demo"
							checked={formData.inviteType === 'Golden blue'}
							onChange={handleChange}
						/>
					</li>
					<li>
						<Radio
							id="invite-astro"
							name="inviteType"
							value="Astro party"
							title="Astro party"
							subtitle="Ver demo"
							checked={formData.inviteType === 'Astro party'}
							onChange={handleChange}
						/>
					</li>
					<li className={`${plan !== 'custom' ? 'hidden' : ''}`}>
						<Radio
							id="invite-other"
							name="inviteType"
							value="Otro"
							title="Otro"
							subtitle="Personalizada"
							checked={formData.inviteType === 'Otro'}
							onChange={handleChange}
						/>
					</li>
				</ul>
			</div>
			<div className={`mb-10 ${formData.inviteType === 'Ninguna' ? 'hidden' : ''}`}>
				<h5 className="text-base font-medium text-slate-600 mb-4">Selecciona el tipo de evento</h5>
				<ul className="grid w-full gap-3 md:grid-cols-2">
					<li>
						<Radio
							id="birthday-party"
							name="eventType"
							value="Cumpleaños"
							title="Cumpleaños"
							subtitle="Fiesta de cumpleaños"
							checked={formData.eventType === 'Cumpleaños'}
							onChange={handleChange}
						/>
					</li>
					<li>
						<Radio
							id="general-party"
							name="eventType"
							value="Evento general"
							title="Evento general"
							subtitle="Ideal para cualquier tipo de evento"
							checked={formData.eventType === 'Evento general'}
							onChange={handleChange}
						/>
					</li>
				</ul>
			</div>
			<div className={`mb-10`}>
				<h5 className="text-base font-medium text-slate-600 mb-4">Agrega los datos de tu evento</h5>
				<div className="grid w-full gap-3 md:grid-cols-2">
					<Input
						name="eventName"
						value={formData.eventName}
						class={`${formData.inviteType === 'Ninguna' ? 'hidden' : ''}`}
						placeholder={
							formData.eventType === 'Evento general'
								? 'Nombre del evento'
								: 'Nombre de la/el festejada(o)'
						}
						onChange={handleChange}
					/>
					<Input
						name="whatsapp"
						value={formData.whatsapp}
						type="tel"
						class={`${formData.inviteType === 'Ninguna' ? 'hidden' : ''}`}
						placeholder="Whatsapp"
						onChange={handleChange}
					/>
					<Input
						name="dateTime"
						value={formData.dateTime}
						type="datetime-local"
						placeholder="Fecha y Hora"
						onChange={handleChange}
					/>
					<div className="grid grid-cols-[80%_auto] gap-2 place-items-end">
						<Input
							name="address"
							value={formData.address}
							type="text"
							class="peer"
							placeholder="Dirección google maps"
							onChange={handleChange}
						/>
						<OpenMapsBtn active={!!formData.address} />
					</div>
					{formData.eventType === 'Cumpleaños' && formData.inviteType !== 'Ninguna' && (
						<Input
							name="birthdayNumber"
							value={formData.birthdayNumber}
							type="tel"
							placeholder="Cumpleaños #"
							onChange={handleChange}
						/>
					)}
					{formData.inviteType === 'Otro' && (
						<Input
							name="theme"
							value={formData.theme}
							placeholder="Temática de la invitación"
							onChange={handleChange}
						/>
					)}
				</div>
			</div>
		</>
	)
}

const OpenMapsBtn = ({ active }: { active?: boolean }) => (
	<a
		href="https://www.google.com/maps"
		target="_blank"
		referrerPolicy="no-referrer"
		className={`grid place-content-center ${
			active ? 'border-indigo-600' : 'border-gray-200'
		} w-full h-[50px] text-slate-500 bg-transparent border rounded-2xl cursor-pointer hover:border-indigo-600 hover:text-indigo-600 hover:bg-gray-50 peer-hover:border-indigo-500 peer-hover:text-indigo-500`}
	>
		<svg viewBox="0 0 24 24" id="search" className="w-7 h-7">
			<g data-name="Layer 2">
				<path
					fill="currentColor"
					d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
					data-name="search"
				></path>
			</g>
		</svg>
	</a>
)

export default OrderForm
