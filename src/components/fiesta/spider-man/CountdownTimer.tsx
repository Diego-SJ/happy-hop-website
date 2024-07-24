import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
	targetDate?: Date
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
	targetDate = new Date(2024, 7, 4, 11, 0)
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
		return time < 10 ? `0${time}` : `${time || 0}`
	}

	return (
		<>
			<p className="custom-font text-white text-shadow text-5xl mt-20 mb-5 animate-fade-up animate-once animate-duration-700 animate-delay-[500ms]">
				Faltan
			</p>
			<div className="text-center w-full animate-fade-up animate-once animate-duration-700 animate-delay-[800ms]">
				<div className="custom-font text-white text-shadow grid grid-cols-4 mb-[2rem] w-full">
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
			<h5 className="date-day-number text-5xl  m-0 text-white leading-[0.7] mb-3 drop-shadow-[0.1rem_0.1rem_var(--tw-shadow-color)] shadow-black">
				{value}
			</h5>
			<p className="date-text text-xl">{title}</p>
		</div>
	)
}

export default CountdownTimer
