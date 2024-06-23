import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
	targetDate: Date
	color?: string
	decorationUrl?: string
	decorationClass?: string
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
	targetDate,
	color = '#ce9f95',
	decorationUrl = '/invites/xv/staci/decoration1.svg',
	decorationClass = ''
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
				src={decorationUrl}
				alt="decoration"
				className={`w-[50%] mb-8 delay-[0ms] duration-[1000ms] taos:translate-y-[200px] taos:opacity-0 drop-shadow-lg ${decorationClass}`}
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
						<Square color={color} title="días" value={formatTime(timeLeft.days)} />
						<Square color={color} title="hrs" value={formatTime(timeLeft.hours)} />
						<Square color={color} title="min" value={formatTime(timeLeft.minutes)} />
						<Square color={color} title="seg" value={formatTime(timeLeft.seconds)} />
					</div>
				</div>
			</div>
			<img
				src={decorationUrl}
				alt="decoration"
				className={`w-[50%] mt-8 rotate-180 delay-[0ms] duration-[1000ms] taos:translate-y-[200px] taos:opacity-0 ${decorationClass}`}
				data-taos-offset="-100"
			/>
		</div>
	)
}

const Square = ({ title = '', value = '', color = '#ce9f95' }) => {
	return (
		<div className="text-center ">
			<h5
				className="font-[Lora] date-day-number xs:text-[2.2rem] ms:text-[2.5rem]  m-0 leading-[0.7] pt-[1rem] drop-shadow-lg"
				style={{ color }}
			>
				{value || '00'}
			</h5>
			<p className="font-[Handlee] date-text text-zinc-500 xs:text-[1rem] ms:text-[1.2rem] mt-4">
				{title}
			</p>
		</div>
	)
}

export default CountdownTimer
