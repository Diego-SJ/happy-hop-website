import { atcb_action } from 'add-to-calendar-button'

interface CountdownTimerProps {
	targetDate?: Date
}

const locationUrl = 'https://maps.app.goo.gl/eFSbAd9XwyaopRW9A'
const phonNumer = '7712137372'
const date = {
	startDate: '2024-03-30',
	startTime: '17:00',
	endTime: '20:00'
}

const CountdownTimer: React.FC<CountdownTimerProps> = () => {
	const saveCalendarEvent = (e: any) => {
		let configuration: any = {
			name: 'Revelación de género',
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
			<div className="text-center flex flex-col w-[90%] my-10 mb-[7rem] z-10">
				<button
					onClick={saveCalendarEvent}
					className="py-[0.2rem] w-full font-[Handlee] border-3 bg-[#e7be90] text-white border-[#e7be90] rounded-xl mx-auto xs:w-full xs:text-[1.5rem]  ms:text-[1.6rem] sm:w-20rem text-center mb-6"
				>
					Agregar al calendario
				</button>

				<a href={locationUrl} target="_blank" className="mb-6">
					<button className="py-[0.2rem] w-full font-[Handlee] border-3 bg-[#e7be90] text-white border-[#e7be90] rounded-xl mx-auto xs:w-full xs:text-[1.5rem]  ms:text-[1.6rem] sm:w-20rem text-center">
						Ver ubicación
					</button>
				</a>

				<a
					href={`https://api.whatsapp.com/send?phone=++52${phonNumer}&text=%C2%A1Confirmo%20mi%20asistencia%20al%20evento!%20☺️`}
					target="_blank"
				>
					<button className="py-[0.2rem] w-full font-[Handlee] border-3 bg-[#e7be90] text-white border-[#e7be90] rounded-xl mx-auto xs:w-full xs:text-[1.5rem]  ms:text-[1.6rem] sm:w-20rem text-center">
						Confirmar asistencia
					</button>
				</a>
			</div>
		</>
	)
}

export default CountdownTimer
