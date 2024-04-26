import { atcb_action } from 'add-to-calendar-button'

interface AddToCalendarButton {
	eventName: string
	description?: string
	locationUrl: string
	date: {
		startDate: string
		startTime: string
		endTime: string
	}
}

const AddToCalendarButton: React.FC<AddToCalendarButton> = ({
	eventName,
	description,
	locationUrl,
	date
}) => {
	const saveCalendarEvent = (e: any) => {
		let configuration: any = {
			name: eventName,
			location: locationUrl,
			description:
				description ||
				`¿Te gustaría una invitación como esta? Visita https://happy-hop.com para obtener más información.`,
			...date,
			options: ['Apple', 'Google'],
			hideBackground: false,
			customLabels: { close: 'Cancelar' },
			timeZone: 'currentBrowser'
		}

		atcb_action(configuration, e.target)
	}

	return (
		<button
			onClick={saveCalendarEvent}
			className="bg-white text-[#ce9f95] py-2 px-3 font-medium text-xs w-fit text-center hover:shadow-lg transition duration-300 ease-in-out"
			style={{ fontFamily: 'Lora' }}
		>
			Agregar al calendario
		</button>
	)
}

export default AddToCalendarButton
