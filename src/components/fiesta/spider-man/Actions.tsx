import { atcb_action } from 'add-to-calendar-button'

interface CountdownTimerProps {
	targetDate?: Date
}

const locationUrl = 'https://maps.app.goo.gl/Q3BediMefXh962JA7?g_st=com.google.maps.preview.copy'
const phonNumer = '7731844572'
const confirmAssistanceUrl = `https://api.whatsapp.com/send?phone=++52${phonNumer}&text=%C2%A1Confirmo%20mi%20asistencia%20al%20cumplea%C3%B1os%20de%20Joseph!%20🥳🎉`
const date = {
	startDate: '2024-08-04',
	startTime: '11:00',
	endTime: '15:00'
}
const inviteTitle = 'Cumpleaños no. 1 - Joseph Olguín Reyes'

const CountdownTimer: React.FC<CountdownTimerProps> = () => {
	const saveCalendarEvent = (e: any) => {
		let configuration: any = {
			name: inviteTitle,
			location: locationUrl,
			description: `¿Te gustaría una invitación como esta? Visita https://happy-hop.com para obtener más información.`,
			...date,
			options: ['Apple', 'Google'],
			hideBackground: true,
			customLabels: { close: 'Cancelar' },
			timeZone: 'currentBrowser'
		}

		atcb_action(configuration, e.target)
	}

	return (
		<>
			<div className="flex flex-col w-full px-6 my-20">
				<button
					onClick={saveCalendarEvent}
					className="custom-font text-white/90 text-3xl shadow-md shadow-black rounded-md py-1 px-2 border border-black w-full mb-5"
				>
					Agregar al calendario
				</button>

				<a href={locationUrl} target="_blank" className="mb-5">
					<button className="custom-font text-white/90 text-3xl shadow-md shadow-black rounded-md py-1 px-2 border border-black w-full">
						Ver ubicación
					</button>
				</a>

				<a href={confirmAssistanceUrl} target="_blank" className="mb-5">
					<button className="custom-font text-white/90 text-3xl shadow-md shadow-black rounded-md py-1 px-2 border border-black w-full">
						Confirmar asistencia
					</button>
				</a>
			</div>
		</>
	)
}

export default CountdownTimer
