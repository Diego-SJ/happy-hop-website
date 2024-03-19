import { atcb_action } from 'add-to-calendar-button'

interface CountdownTimerProps {
	targetDate?: Date
}

const locationUrl = 'https://maps.app.goo.gl/MAZg7Y7rESPKBWfr5'
const phonNumer = '7717024937'
const date = {
	startDate: '2024-03-23',
	startTime: '16:00',
	endTime: '22:00'
}
const inviteTitle = 'Cumpleaños no. 3 - Alexys'

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
			<div className="text-center flex flex-col w-[90%] my-8 mb-[7rem] z-10 animate-fade-up animate-once animate-duration-700 animate-delay-[1000ms]">
				<button
					onClick={saveCalendarEvent}
					className="scoob-font py-[0.2rem] w-full font-[Handlee] hover:bg-[#3b8c89] border-solid border-4 bg-[#01aca7] text-white border-[#edd14d] rounded-xl mx-auto xs:w-full xs:text-[1.3rem]  ms:text-[1.6rem] sm:w-20rem text-center mb-6"
				>
					Agregar al calendario
				</button>

				<a href={locationUrl} target="_blank" className="mb-6">
					<button className="scoob-font py-[0.2rem] w-full font-[Handlee] hover:bg-[#3b8c89] border-3 bg-[#01aca7] text-white border-solid border-4 border-[#edd14d] rounded-xl mx-auto xs:w-full xs:text-[1.3rem]  ms:text-[1.6rem] sm:w-20rem text-center">
						Ver ubicación
					</button>
				</a>

				<a
					href={`https://api.whatsapp.com/send?phone=++52${phonNumer}&text=%C2%A1Confirmo%20mi%20asistencia%20a%20la%20fiesta!%20🥳🎉`}
					target="_blank"
				>
					<button className="scoob-font py-[0.2rem] w-full font-[Handlee] hover:bg-[#3b8c89] border-3 bg-[#01aca7] text-white border-solid border-4 border-[#edd14d] rounded-xl mx-auto xs:w-full xs:text-[1.3rem]  ms:text-[1.6rem] sm:w-20rem text-center">
						Confirmar asistencia
					</button>
				</a>
			</div>
		</>
	)
}

export default CountdownTimer
