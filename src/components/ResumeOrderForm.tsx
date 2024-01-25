import { useStore } from '@nanostores/react'
import { $inflatableOrder } from '../store/inflatable-order'
import { formatDate, getParams } from '../utils/functions'
import { openWhatsapp } from '../utils/helpers'

type ItemListProps = {
	title?: string
	subtitle?: string
	caption?: string
	price?: string
}

const ItemList = ({ title, subtitle, caption }: ItemListProps) => {
	return (
		<div className="flex w-full flex-col border-b border-gray-200 py-3 hover:bg-[#ecf1f5]">
			<div className="flex-grow-[1]">
				<h5 className="text-[.8rem] font-medium text-indigo-500 tracking-wider m-0">{title}</h5>
				<p className="text-base font-medium text-slate-700 mb-0">{subtitle}</p>
			</div>
			{caption && (
				<span className="flex-grow text-sm font-normal text-slate-400 my-auto">{caption}</span>
			)}
			{/* <span className="flex-grow items-center text-end text-normal font-medium text-slate-700 my-auto">
				{`$${price}`}
			</span> */}
		</div>
	)
}

const OrderForm = () => {
	const order = useStore($inflatableOrder)
	const plan = getParams('plan')

	const goBack = () => {
		location.href = '/paquetes'
	}

	const onClick = () => {
		openWhatsapp(order, plan || 'custom')
	}

	return (
		<>
			<h2 className="w-full text-2xl font-bold">Resumen de tu pedido</h2>
			<div className="w-full flex flex-col mb-4">
				<ul className="flex flex-col">
					<li>
						<ItemList title="Inflable" subtitle={order.inflatable || 'Sin especificar'} />
					</li>
					<li>
						<ItemList
							title="Snack"
							subtitle={order.snack || 'Sin especificar'}
							caption={order.snack === 'Otro' ? order.customSnack : ''}
						/>
					</li>
					<li>
						<ItemList
							title="Invitación"
							subtitle={order.inviteType || 'Sin especificar'}
							caption={order.inviteType === 'Otro' ? `Tematica: ${order.theme}` : ''}
						/>
					</li>
					<li>
						<ItemList
							title="Tipo de evento"
							subtitle={order.eventType || 'Sin especificar'}
							caption={order.eventType === 'Cumpleaños' ? `Fiesta # ${order.birthdayNumber}` : ''}
						/>
					</li>
					<li>
						<ItemList
							title={order.eventType === 'Cumpleaños' ? 'Festejado(a)' : 'Nombre del evento'}
							subtitle={order.eventName || 'Sin especificar'}
						/>
					</li>
					<li>
						<ItemList title="Whatsapp de contacto" subtitle={order.whatsapp || 'Sin especificar'} />
					</li>
					<li>
						<ItemList
							title="Fecha y hora"
							subtitle={order.dateTime ? formatDate(order.dateTime) : 'Sin especificar'}
						/>
					</li>
					<li>
						<ItemList title="Dirección en maps" subtitle={order.address || 'Sin especificar'} />
					</li>
				</ul>
			</div>
			<div className="w-full flex gap-4">
				<button
					onClick={goBack}
					className="h-[3.2rem] w-full font-bold border-slate-700 border-2 rounded-full py-2 px-8 hover:bg-slate-700 hover:text-white "
				>
					Cancelar
				</button>
				<button
					onClick={onClick}
					className="h-[3.2rem] w-full font-bold border-slate-700 border-2 rounded-full py-2 px-8 bg-slate-700 text-white hover:bg-slate-800 hover:text-white "
				>
					Enviar
				</button>
			</div>
		</>
	)
}

export default OrderForm
