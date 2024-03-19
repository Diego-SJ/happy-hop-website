import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
	targetDate?: Date
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
	targetDate = new Date(2024, 2, 23, 16, 0)
}) => {
	const calculateTimeLeft = () => {
		const difference = targetDate.getTime() - new Date().getTime()
		let timeLeft = {}

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)) || 0,
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24) || 0,
				minutes: Math.floor((difference / 1000 / 60) % 60) || 0,
				seconds: Math.floor((difference / 1000) % 60) || 0
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

	return (
		<>
			<p className="scoob-font shadow-scoob xs:text-[1.3rem] ms:text-[1.5rem] text-zinc-500 animate-fade-up animate-once animate-duration-700 animate-delay-[500ms]">
				Faltan
			</p>
			<div className="text-center w-full animate-fade-up animate-once animate-duration-700 animate-delay-[800ms]">
				<div className="grid grid-cols-4 mb-[2rem] w-full">
					<Square title="días" value={formatTime(timeLeft.days)} />
					<Square title="hrs" value={formatTime(timeLeft.hours)} />
					<Square title="min" value={formatTime(timeLeft.minutes)} />
					<Square title="seg" value={formatTime(timeLeft.seconds)} />
				</div>
			</div>
		</>
	)
}

const Square = ({ title = '', value = '' }) => {
	return (
		<div className="text-center ">
			<h5 className="scoob-font shadow-scoob date-day-number xs:text-[2.2rem] ms:text-[2.5rem]  m-0 leading-[0.7] pt-[1rem]">
				{value}
			</h5>
			<p className="scoob-font shadow-scoob date-text xs:text-[1.1rem] ms:text-[1.3rem]">{title}</p>
		</div>
	)
}

export default CountdownTimer
