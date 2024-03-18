import React, { useState, useEffect } from 'react'
import { atcb_action } from 'add-to-calendar-button'

interface CountdownTimerProps {
	targetDate?: Date
}

const locationUrl = 'https://maps.google.com/?q=20.177752,-99.244377'

const CountdownTimer: React.FC<CountdownTimerProps> = ({
	targetDate = new Date(2024, 2, 10, 15, 30)
}) => {
	const calculateTimeLeft = () => {
		const difference = targetDate.getTime() - new Date().getTime()
		let timeLeft = {}

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			}
		}

		return timeLeft as { days: number; hours: number; minutes: number; seconds: number }
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearTimeout(timer)
	})

	const formatTime = (time: number) => {
		return time < 10 ? `0${time}` : `${time}`
	}

	const saveCalendarEvent = (e: any) => {
		let configuration: any = {
			name: 'Cumpleaños - Alexandro Gael',
			location: locationUrl,
			description: `¿Te gustaría una invitación como esta? Visita https://happy-hop.com para obtener más información.`,
			startDate: '2024-03-10',
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
		<div className="text-center my-10">
			<h4 className="join-party text-4xl font-[Minecraft] text-center text-white 0rem 0.3rem #343530 [text-shadow:_0_0.3rem_0_#2b2c2a,_0_0_2rem_rgb(0_0_0_/_80%)]">
				FALTAN
			</h4>
			<div className="grid grid-cols-4 mb-[2rem]">
				<Square title="días" value={formatTime(timeLeft.days || 0)} />
				<Square title="hrs" value={formatTime(timeLeft.hours || 0)} />
				<Square title="min" value={formatTime(timeLeft.minutes || 0)} />
				<Square title="seg" value={formatTime(timeLeft.seconds || 0)} />
			</div>

			<button
				onClick={saveCalendarEvent}
				className="minecraft-btn mx-auto xs:w-[100%] xs:text-[1.5rem]  ms:text-[1.8rem] sm:w-20rem sm:text-[2rem] text-center text-white truncate px-1 border-2 border-b-4 hover:text-yellow-200 mb-[1rem]"
			>
				Agregar a calendario
			</button>

			<a href="https://maps.google.com/?q=20.177752,-99.244377" target="_blank">
				<button className="minecraft-btn mx-auto xs:w-[100%] xs:text-[1.5rem]  ms:text-[1.8rem] sm:w-20rem sm:text-[2rem] text-center text-white truncate px-1 border-2 border-b-4 hover:text-yellow-200 mb-[1rem]">
					Ver ubicación
				</button>
			</a>

			<a
				href="https://api.whatsapp.com/send?phone=++527737365002&text=%C2%A1Confirmo%20mi%20asistencia%20a%20la%20fiesta!%20🎉🥳"
				target="_blank"
			>
				<button className="minecraft-btn mx-auto xs:w-[100%] xs:text-[1.5rem]  ms:text-[1.8rem] sm:w-20rem sm:text-[2rem] text-center text-white truncate px-1 border-2 border-b-4 hover:text-yellow-200 mb-[1rem]">
					Confirmar asistencia
				</button>
			</a>
		</div>
	)
}

const Square = ({ title = '', value = '' }) => {
	return (
		<div className="text-center">
			<h5 className="date-day-number xs:text-[2rem] ms:text-[3.5rem] font-[Minecraft] m-0 leading-[0.7] pt-[1rem] text-[#beff3d] [text-shadow:_0_0.3rem_0_#2b2c2a,_0_0_2rem_rgb(0_0_0_/_80%)]">
				{value || 0}
			</h5>
			<p className="date-text text-white xs:text-[1.5rem] ms:text-[2rem] font-[VT323] [text-shadow:_0.2rem_0.2rem_0_#393938,_0_0_2rem_rgb(0_0_0_/_80%)]">
				{title}
			</p>
		</div>
	)
}

export default CountdownTimer
