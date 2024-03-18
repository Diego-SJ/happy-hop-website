import { atcb_action } from 'add-to-calendar-button'

interface CountdownTimerProps {
	targetDate?: Date
}

const locationUrl = 'https://maps.google.com/?q=20.177752,-99.244377'
const phonNumer = '7712137372'

const CountdownTimer: React.FC<CountdownTimerProps> = () => {
	const saveCalendarEvent = (e: any) => {
		let configuration: any = {
			name: 'Revelación de género',
			location: locationUrl,
			description: `¿Te gustaría una invitación como esta? Visita https://happy-hop.com para obtener más información.`,
			startDate: '2024-03-30',
			startTime: '15:30',
			endTime: '23:00',
			options: ['Apple', 'Google'],
			hideBackground: true,
			customLabels: { close: 'Cancelar' },
			timeZone: 'currentBrowser'
		}

		atcb_action(configuration, e.target)
	}

	return (
		<>
			<div className="text-center flex flex-col gap-4 w-[90%] my-10 mb-[7rem] z-10">
				<button
					onClick={saveCalendarEvent}
					className="py-[0.2rem] w-full font-[Handlee] border-3 bg-[#e7be90] text-white border-[#e7be90] rounded-xl mx-auto xs:w-full xs:text-[1.5rem]  ms:text-[1.6rem] sm:w-20rem text-center"
				>
					Agregar al calendario
				</button>

				<a href={locationUrl} target="_blank">
					<button className="py-[0.2rem] w-full font-[Handlee] border-3 bg-[#e7be90] text-white border-[#e7be90] rounded-xl mx-auto xs:w-full xs:text-[1.5rem]  ms:text-[1.6rem] sm:w-20rem text-center">
						Ver ubicación
					</button>
				</a>

				<a
					href={`https://api.whatsapp.com/send?phone=++52${phonNumer}&text=%C2%A1Confirmo%20mi%20asistencia%20a%20la%20fiesta!%20🎉🥳`}
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
