import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
	targetDate?: Date
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
	targetDate = new Date(2024, 5, 22, 17, 45)
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
		<div className="py-10 flex flex-col justify-center items-center bg-white ">
			<img
				src="/invites/xv/staci/decoration1.svg"
				alt="decoration"
				className="w-[50%] mb-8 delay-[0ms] duration-[1000ms] taos:translate-y-[200px] taos:opacity-0"
				data-taos-offset="-10"
			/>
			<div className="animate-fade-up delay-100 w-full">
				<p
					style={{ fontFamily: 'Cinzel Decorative' }}
					className="mb-4 font-[Handlee] xs:text-[1.3rem] ms:text-[1.5rem] text-zinc-500 text-center"
				>
					Cuenta regresiva
				</p>
				<div className="text-center w-full">
					<div className="grid grid-cols-4 w-full">
						<Square title="días" value={formatTime(timeLeft.days)} />
						<Square title="hrs" value={formatTime(timeLeft.hours)} />
						<Square title="min" value={formatTime(timeLeft.minutes)} />
						<Square title="seg" value={formatTime(timeLeft.seconds)} />
					</div>
				</div>
			</div>
			<img
				src="/invites/xv/staci/decoration1.svg"
				alt="decoration"
				className="w-[50%] mt-8 rotate-180 delay-[0ms] duration-[1000ms] taos:translate-y-[200px] taos:opacity-0"
				data-taos-offset="-100"
			/>
		</div>
	)
}

const Square = ({ title = '', value = '' }) => {
	return (
		<div className="text-center ">
			<h5 className="font-[Lora] date-day-number xs:text-[2.2rem] ms:text-[2.5rem]  m-0 leading-[0.7] pt-[1rem] text-[#ce9f95] ">
				{value || '00'}
			</h5>
			<p className="font-[Handlee] date-text text-zinc-500 xs:text-[1rem] ms:text-[1.2rem] mt-4">
				{title}
			</p>
		</div>
	)
}

export default CountdownTimer
